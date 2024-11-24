import { renderHook, act } from '@testing-library/react'
import { useMutation } from '@tanstack/react-query'
import { usePostPatient } from '@hooks'
import { Mock, vi } from 'vitest'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useMutation: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  createPatient: vi.fn()
}))

describe('usePostPatient', () => {
  const mockPatient = {
    name: 'John',
    surname: 'Doe',
    email: 'johndoe@example.com',
    birthDate: '2000-01-01',
    professionalId: 123
  }

  const error = new Error('Error creating patient')

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

  it('should call the mutation function with the correct arguments', () => {
    const mutateMock = vi.fn()
    mockMutation({ mutate: mutateMock })

    const { result } = renderHook(() => usePostPatient())

    WhenSendPatientArgs(result, mockPatient)

    ExpectMutationToBeCalledWithCorrectArgs(mutateMock, mockPatient)
  })

  it('should return isSuccess as true after a successful mutation', () => {
    mockMutation({ isSuccess: true })

    const { result } = renderHook(() => usePostPatient())

    ExpectSuccessAfterMutationCall(result)
  })

  it('should return an error if the mutation fails', () => {
    mockMutation({ error })

    const { result } = renderHook(() => usePostPatient())

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: {
    current: {
      mutate: (args: {
        name: string
        surname: string
        email: string
        birthDate: string
        professionalId: number
      }) => void
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

function ExpectSuccessAfterMutationCall(result: {
  current: {
    mutate: (args: { name: string; surname: string; email: string; birthDate: string; professionalId: number }) => void
    reset: () => void
    error: Error | null
    isPending: boolean
    isSuccess: boolean
  }
}) {
  expect(result.current.isSuccess).toBe(true)
}

function ExpectMutationToBeCalledWithCorrectArgs(
  mutateMock: ReturnType<typeof vi.fn>,
  mockPatient: { name: string; surname: string; email: string; birthDate: string; professionalId: number }
) {
  expect(mutateMock).toHaveBeenCalledWith(mockPatient)
}

function WhenSendPatientArgs(
  result: {
    current: {
      mutate: (args: {
        name: string
        surname: string
        email: string
        birthDate: string
        professionalId: number
      }) => void
      reset: () => void
      error: Error | null
      isPending: boolean
      isSuccess: boolean
    }
  },
  mockPatient: { name: string; surname: string; email: string; birthDate: string; professionalId: number }
) {
  act(() => {
    result.current.mutate(mockPatient)
  })
}
