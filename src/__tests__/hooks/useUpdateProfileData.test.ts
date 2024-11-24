import { renderHook, act } from '@testing-library/react'
import { useMutation } from '@tanstack/react-query'
import { useUpdateProfileData } from '@hooks'
import { Mock, vi } from 'vitest'
import { ProfileData, Role } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useMutation: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  updateProfileData: vi.fn()
}))

describe('useUpdateProfileData', () => {
  const mockData: ProfileData = {
    email: 'user@example.com',
    name: 'John',
    surname: 'Doe',
    image: 'profile.jpg'
  }
  const mockArgs = { id: 1, role: 'admin' as Role, data: mockData }
  const error = new Error('Error updating profile data')

  const mockMutation = (overrides: Partial<ReturnType<typeof useMutation>>) => {
    ;(useMutation as Mock).mockReturnValue({
      mutate: vi.fn(),
      reset: vi.fn(),
      error: null,
      isPending: false,
      isSuccess: false,
      ...overrides
    })
  }

  it('should call the mutation function with correct arguments', () => {
    const mutateMock = vi.fn()
    mockMutation({ mutate: mutateMock })

    const { result } = renderHook(() => useUpdateProfileData())

    WhenPerfomUpdateProfile(result, mockArgs)

    ExpectArgsToBeCorrect(mutateMock, mockArgs)
  })

  it('should return isSuccess as true after a successful mutation', () => {
    mockMutation({ isSuccess: true })

    const { result } = renderHook(() => useUpdateProfileData())

    ExpectSuccessfullyMutation(result)
  })

  it('should return an error if the mutation fails', () => {
    mockMutation({ error })

    const { result } = renderHook(() => useUpdateProfileData())

    ExpectError(result, error)
  })
})

function ExpectError(
  result: {
    current: {
      mutate: (args: { id: number; role: Role; data: ProfileData }) => void
      reset: () => void
      error: Error | null
      isPending: boolean
      isSuccess: boolean
    }
  },
  error: Error
) {
  expect(result.current.error).toEqual(error)
}

function ExpectSuccessfullyMutation(result: {
  current: {
    mutate: (args: { id: number; role: Role; data: ProfileData }) => void
    reset: () => void
    error: Error | null
    isPending: boolean
    isSuccess: boolean
  }
}) {
  expect(result.current.isSuccess).toBe(true)
}

function ExpectArgsToBeCorrect(
  mutateMock: ReturnType<typeof vi.fn>,
  mockArgs: { id: number; role: Role; data: ProfileData }
) {
  expect(mutateMock).toHaveBeenCalledWith(mockArgs)
}

function WhenPerfomUpdateProfile(
  result: {
    current: {
      mutate: (args: { id: number; role: Role; data: ProfileData }) => void
      reset: () => void
      error: Error | null
      isPending: boolean
      isSuccess: boolean
    }
  },
  mockArgs: { id: number; role: Role; data: ProfileData }
) {
  act(() => {
    result.current.mutate(mockArgs)
  })
}
