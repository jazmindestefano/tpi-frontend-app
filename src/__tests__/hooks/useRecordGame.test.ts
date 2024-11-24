import { act, renderHook } from '@testing-library/react'
import { describe, it, vi, expect, MockedFunction } from 'vitest'
import { useGetGameLevels, usePostUserRecording } from '@hooks/queries'
import { useCurrentUser, useCurrentGame } from '@hooks/selectors'
import { useRecordGame } from '@hooks/games'
import { shuffleArray } from '@helpers'
import { GameLevel } from '@interfaces'
import { Providers } from '../setup/providers.tsx'

vi.mock('@hooks/queries', () => ({
  useGetGameLevels: vi.fn(),
  usePostUserRecording: vi.fn()
}))

vi.mock('@hooks/selectors', () => ({
  useCurrentUser: vi.fn(),
  useCurrentGame: vi.fn()
}))

vi.mock('@helpers', () => ({
  shuffleArray: vi.fn()
}))

const mockLevels: GameLevel[] = [
  {
    id: 1,
    description: 'description1',
    options: [
      { description: 'option1', id: 1, name: 'name1', correct: false, image: 'image1' },
      { description: 'option2', id: 2, name: 'name2', correct: true, image: 'image2' },
      { description: 'option3', id: 3, name: 'name3', correct: false, image: 'image3' }
    ]
  },
  {
    id: 2,
    description: 'description2',
    options: [
      { description: 'optionA', id: 4, name: 'nameA', correct: false, image: 'imageA' },
      { description: 'optionB', id: 5, name: 'nameB', correct: true, image: 'imageB' },
      { description: 'optionC', id: 6, name: 'nameC', correct: false, image: 'imageC' }
    ]
  }
]

describe('useRecordGame', () => {
  let shuffleArrayMock: MockedFunction<typeof shuffleArray>

  const mutateMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(usePostUserRecording).mockReturnValue({
      mutate: mutateMock,
      reset: vi.fn(),
      error: null,
      isPending: false,
      isSuccess: true
    })

    shuffleArrayMock = vi.mocked(shuffleArray).mockImplementation((arr) => arr.reverse())

    vi.mocked(useCurrentUser).mockReturnValue({
      id: 1,
      username: 'patient1',
      role: 'PATIENT'
    })

    vi.mocked(useCurrentGame).mockReturnValue({
      selectedGame: {
        id: 1,
        name: 'game1',
        image: 'image1'
      },
      selectedTheme: {
        id: 1,
        name: 'theme1',
        image: 'image1'
      }
    })
  })

  it('should return the correct initial state', () => {
    vi.mocked(useGetGameLevels).mockReturnValue({
      levels: undefined,
      isLoading: true,
      error: null
    })

    const { result } = renderHook(() => useRecordGame(null), { wrapper: Providers })

    expect(result.current.levels).toEqual(undefined)
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()
    expect(result.current.currentLevel).toBe(0)
    expect(result.current.levelOptions).toEqual([])
  })

  it('should update currentLevel when handleNextPage is called', () => {
    vi.mocked(useGetGameLevels).mockReturnValue({
      levels: mockLevels,
      isLoading: false,
      error: null
    })

    const { result } = renderHook(() => useRecordGame(null), { wrapper: Providers })

    act(() => {
      result.current.handleNextPage()
    })

    expect(result.current.currentLevel).toBe(1)
    expect(result.current.levelOptions).toEqual(mockLevels[1].options.reverse())
  })

  it('should call mutate when audio is provided', () => {
    vi.mocked(useGetGameLevels).mockReturnValue({
      levels: mockLevels,
      isLoading: false,
      error: null
    })
    const audioBlob = new Blob(['test-audio'], { type: 'audio/wav' })
    renderHook(() => useRecordGame(audioBlob), { wrapper: Providers })

    expect(mutateMock).toHaveBeenCalledWith({
      userId: 1,
      gameId: 1,
      activityId: 1,
      userAudio: audioBlob
    })
    expect(mutateMock).toHaveBeenCalled()
  })

  it('should not shuffle or set level options if levels are not loaded', () => {
    vi.mocked(useGetGameLevels).mockReturnValue({
      levels: null,
      isLoading: true,
      error: null
    })

    const { result } = renderHook(() => useRecordGame(null), { wrapper: Providers })

    expect(result.current.levelOptions).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()
    expect(shuffleArrayMock).not.toHaveBeenCalled()
  })

  it('should handle error states correctly', () => {
    const mockedError = new Error('Error loading levels')
    vi.mocked(useGetGameLevels).mockReturnValue({
      levels: undefined,
      isLoading: false,
      error: mockedError
    })

    const { result } = renderHook(() => useRecordGame(null), { wrapper: Providers })

    expect(result.current.error?.message).toBe(mockedError.message)
    expect(result.current.isLoading).toBe(false)
  })
})
