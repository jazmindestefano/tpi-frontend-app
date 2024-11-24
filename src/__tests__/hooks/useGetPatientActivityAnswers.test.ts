import { renderHook } from '@testing-library/react'
import { useGetPatientActivityAnswers } from '@hooks'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { MockedFunction, vi } from 'vitest'
import { PatientActivityAnswers } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn()
  }
})

vi.mock('@http', () => ({
  getPatientActivityAnswers: vi.fn()
}))

describe('useGetPatientActivityAnswers', () => {
  const patientId = 1
  const mockAnswers: PatientActivityAnswers[] = [
    {
      gameName: 'Memory Game',
      gameId: 123,
      answersDto: [
        {
          id: 1,
          answerType: 'Multiple Choice',
          answerDate: '2024-11-24',
          optionValue: 'A',
          userAnswer: 'Yes'
        }
      ]
    }
  ]
  const error = new Error('Error fetching patient activity answers')

  let mockUseQuery: MockedFunction<typeof useQuery>

  const mockQuery = (response: Partial<UseQueryResult<PatientActivityAnswers[], Error>>) => {
    mockUseQuery.mockReturnValue(response as UseQueryResult<PatientActivityAnswers[], Error>)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseQuery = vi.mocked(useQuery)
  })

  it('should return data when the query is successful', async () => {
    mockQuery({
      data: mockAnswers
    })

    const { result } = renderHook(() => useGetPatientActivityAnswers(patientId))

    ExpectPatientAnswers(result, mockAnswers)
  })

  it('should return an error if the query fails', async () => {
    mockQuery({
      error
    })

    const { result } = renderHook(() => useGetPatientActivityAnswers(patientId))

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { data: PatientActivityAnswers[]; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeUndefined()
  expect(result.current.error).toEqual(error)
}

function ExpectPatientAnswers(
  result: { current: { data: PatientActivityAnswers[]; error: Error | null; isLoading: boolean } },
  mockAnswers: {
    gameName: string
    gameId: number
    answersDto: { id: number; answerType: string; answerDate: string; optionValue: string; userAnswer: string }[]
  }[]
) {
  expect(result.current.data).toEqual(mockAnswers)
  expect(result.current.error).toBeUndefined()
}
