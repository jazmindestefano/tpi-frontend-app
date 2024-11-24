import { renderHook, act } from '@testing-library/react'
import { useMutation } from '@tanstack/react-query'
import { vi, Mock } from 'vitest'
import { usePostUserRecording } from '@hooks'
import { PostUserRecordingData } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useMutation: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  postUserRecording: vi.fn()
}))

describe('usePostUserRecording', () => {
  const mockData: PostUserRecordingData = {
    userId: 1,
    gameId: 2,
    activityId: 3,
    userAudio: new Blob(['audio data'], { type: 'audio/wav' }),
    text: 'Sample text'
  }

  const mockMutation = (overrides: Partial<ReturnType<typeof useMutation<PostUserRecordingData, Error>>>) => {
    ;(useMutation as Mock).mockReturnValue({
      mutate: vi.fn(),
      reset: vi.fn(),
      error: null,
      isPending: false,
      isSuccess: false,
      ...overrides
    })
  }

  it('should call mutate with the correct arguments', async () => {
    const mockMutate = vi.fn()
    mockMutation({ mutate: mockMutate })

    const { result } = renderHook(() => usePostUserRecording())

    act(() => {
      result.current.mutate(mockData)
    })

    expectFromMutation(mockMutate, mockData)
  })

  it('should return error when mutation fails', async () => {
    const error = new Error('Error posting recording')
    mockMutation({ error })

    const { result } = renderHook(() => usePostUserRecording())

    expectMutationToFail(result, error)
  })

  it('should return isSuccess as true after a successful mutation', () => {
    mockMutation({ isSuccess: true })

    const { result } = renderHook(() => usePostUserRecording())

    expectMutationToBeSuccessful(result)
  })
})

function expectMutationToBeSuccessful(result: {
  current: {
    mutate: (args: PostUserRecordingData) => void
    reset: () => void
    error: Error | null
    isPending: boolean
    isSuccess: boolean
  }
}) {
  expect(result.current.isSuccess).toBe(true)
  expect(result.current.error).toBeNull()
  expect(result.current.isPending).toBe(false)
}

function expectMutationToFail(
  result: {
    current: {
      mutate: (args: PostUserRecordingData) => void
      reset: () => void
      error: Error | null
      isPending: boolean
      isSuccess: boolean
    }
  },
  error: Error
) {
  expect(result.current.error).toEqual(error)
  expect(result.current.isPending).toBe(false)
  expect(result.current.isSuccess).toBe(false)
}

function expectFromMutation(mockMutate: Mock, mockData: PostUserRecordingData) {
  expect(mockMutate).toHaveBeenCalledWith(mockData)
}
