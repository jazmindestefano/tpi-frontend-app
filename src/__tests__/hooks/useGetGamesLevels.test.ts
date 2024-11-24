import { renderHook, waitFor } from '@testing-library/react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Mock, MockedFunction, vi } from 'vitest'
import { useGetGameLevels } from '../../hooks/queries'
import * as ApiService from '@http'
import { GameLevel, LevelOption } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getGameLevels: vi.fn()
}))

describe('useGetGameLevels', () => {
  const themeId = 1

  const mockLevelOptions: LevelOption[] = [
    { id: 1, name: 'Option 1', description: 'Option 1', image: 'Option 1', correct: true },
    { id: 2, name: 'Option 2', description: 'Option 2', image: 'Option 2', correct: false }
  ]

  const mockLevels: GameLevel[] = [
    { id: 1, description: 'Level 1', options: mockLevelOptions },
    { id: 2, description: 'Level 2', options: mockLevelOptions }
  ]
  const error = new Error('Error fetching levels')

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<GameLevel[], Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<GameLevel[], Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

  it('should return levels data when the query is successful', async () => {
    ;(ApiService.getGameLevels as Mock).mockResolvedValueOnce(mockLevels)
    mockQuery({ data: mockLevels })

    const { result } = renderHook(() => useGetGameLevels(themeId))

    await waitFor(() => !result.current.isLoading)

    ExpectLevels(result, mockLevels)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useGetGameLevels(themeId))

    ExpectError(result, error)
  })
})

function ExpectError(
  result: { current: { levels: GameLevel[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.levels).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectLevels(
  result: { current: { levels: GameLevel[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockLevels: GameLevel[]
) {
  expect(result.current.levels).toEqual(mockLevels)
  expect(result.current.error).toBeUndefined()
}
