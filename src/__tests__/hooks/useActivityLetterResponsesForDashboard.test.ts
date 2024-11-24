import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useActivityLetterResponsesForDashboard } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { LetterActityResponseDashboard } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getActivityLetterResponsesForDashboard: vi.fn()
}))

describe('useActivityLetterResponsesForDashboard', () => {
  const patientId = 1
  const mockData: LetterActityResponseDashboard[] = [
    { activityId: 1, activityName: 'Activity 1', totalAttempts: 5, correctAttempts: 4, accuracyRate: 80 },
    { activityId: 2, activityName: 'Activity 2', totalAttempts: 10, correctAttempts: 8, accuracyRate: 80 }
  ]
  const error = new Error('Error fetching activity data')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return activity data when the query is successful', async () => {
    ;(ApiService.getActivityLetterResponsesForDashboard as Mock).mockResolvedValueOnce(mockData)
    mockQuery({ data: mockData })

    const { result } = renderHook(() => useActivityLetterResponsesForDashboard(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectActivityData(result, mockData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useActivityLetterResponsesForDashboard(patientId))

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { data: LetterActityResponseDashboard[]; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectActivityData(
  result: { current: { data: LetterActityResponseDashboard[]; error: Error | null; isLoading: boolean } },
  mockData: LetterActityResponseDashboard[]
) {
  expect(result.current.data).toEqual(mockData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
