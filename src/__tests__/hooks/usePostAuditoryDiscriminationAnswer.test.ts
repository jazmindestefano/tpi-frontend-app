import { renderHook } from '@testing-library/react'
import { useMutation } from '@tanstack/react-query'
import { vi, Mock } from 'vitest'
import { usePostAuditoryDiscriminationAnswer } from '@hooks'
import { PostAuditoryDiscriminationRequest } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useMutation: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  postAuditoryDiscriminationAnswer: vi.fn()
}))

describe('usePostAuditoryDiscriminationAnswer', () => {
  const mockMutateFn = vi.fn()
  const mockResetFn = vi.fn()
  const error = new Error('Error posting auditory discrimination answer')

  const mockMutation = (overrides: Partial<ReturnType<typeof useMutation>>) => {
    ;(useMutation as Mock).mockReturnValue({
      mutate: mockMutateFn,
      reset: mockResetFn,
      error: null,
      isPending: false,
      isSuccess: false,
      ...overrides
    })
  }

  it('should call mutate function with the correct arguments', () => {
    mockMutation({})
    const { result } = renderHook(() => usePostAuditoryDiscriminationAnswer())

    const requestData: PostAuditoryDiscriminationRequest = {
      patientId: 1,
      activities: [{ activityId: 101, selectedOption: 1 }]
    }

    callMutation(result, requestData)

    expectMutateCalledWith(mockMutateFn, requestData)
  })

  it('should return error when the mutation fails', () => {
    mockMutation({ error })
    const { result } = renderHook(() => usePostAuditoryDiscriminationAnswer())

    expectErrorState(result, error)
  })

  it('should return isPending as true while the mutation is in progress', () => {
    mockMutation({ isPending: true })
    const { result } = renderHook(() => usePostAuditoryDiscriminationAnswer())

    expectIsPendingState(result)
  })
})

function expectIsPendingState(result: {
  current: {
    mutate: (args: PostAuditoryDiscriminationRequest) => void
    reset: () => void
    error: Error | null
    isPending: boolean
    isSuccess: boolean
  }
}) {
  expect(result.current.isPending).toBe(true)
  expect(result.current.isSuccess).toBe(false)
  expect(result.current.error).toBeNull()
}

function expectErrorState(
  result: {
    current: {
      mutate: (args: PostAuditoryDiscriminationRequest) => void
      reset: () => void
      error: Error | null
      isPending: boolean
      isSuccess: boolean
    }
  },
  error: Error
) {
  expect(result.current.error).toEqual(error)
  expect(result.current.isSuccess).toBe(false)
  expect(result.current.isPending).toBe(false)
}

function expectMutateCalledWith(
  mockMutateFn: Mock<(requestData: PostAuditoryDiscriminationRequest) => void>,
  requestData: PostAuditoryDiscriminationRequest
) {
  expect(mockMutateFn).toHaveBeenCalledWith(requestData)
}

function callMutation(
  result: {
    current: {
      mutate: (args: PostAuditoryDiscriminationRequest) => void
      reset: () => void
      error: Error | null
      isPending: boolean
      isSuccess: boolean
    }
  },
  requestData: PostAuditoryDiscriminationRequest
) {
  result.current.mutate(requestData)
}
