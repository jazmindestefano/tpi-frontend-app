import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useSurveyFeedbackForDashboard } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { SurveyFeedbackDashboard } from '@components'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getSurveyFeedbackForDashboard: vi.fn()
}))

describe('useSurveyFeedbackForDashboard', () => {
  const patientId = 1
  const mockData: SurveyFeedbackDashboard = {
    mostLikedActivity: { gameId: 1, ranking: '1', gameName: 'Game 1' },
    leastLikedActivity: { gameId: 2, ranking: '5', gameName: 'Game 2' }
  }
  const error = new Error('Error fetching survey feedback')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return survey feedback data when the query is successful', async () => {
    ;(ApiService.getSurveyFeedbackForDashboard as Mock).mockResolvedValueOnce(mockData)
    mockQuery({ data: mockData })

    const { result } = renderHook(() => useSurveyFeedbackForDashboard(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectSurveyFeedback(result, mockData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useSurveyFeedbackForDashboard(patientId))

    ExpectErrors(result, error)
  })

  it('should return isLoading as true while the query is loading', () => {
    mockQuery({ isLoading: true })

    const { result } = renderHook(() => useSurveyFeedbackForDashboard(patientId))

    ExpectIsLoading(result)
  })
})

function ExpectIsLoading(result: {
  current: { data: SurveyFeedbackDashboard; error: Error | null; isLoading: boolean }
}) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(true)
}

function ExpectErrors(
  result: { current: { data: SurveyFeedbackDashboard; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectSurveyFeedback(
  result: { current: { data: SurveyFeedbackDashboard; error: Error | null; isLoading: boolean } },
  mockData: SurveyFeedbackDashboard
) {
  expect(result.current.data).toEqual(mockData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
