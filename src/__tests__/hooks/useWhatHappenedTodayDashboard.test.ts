import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useWhatHappenedTodayDashboard } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { WhatHappenedTodayDashboard } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getWhatHappenedTodayDashboard: vi.fn()
}))

describe('useWhatHappenedTodayDashboard', () => {
  const patientId = 1
  const error = new Error('Error fetching what happened today data')
  const mockDashboardData: WhatHappenedTodayDashboard[] = [
    { date: '2024-11-24', gameDescription: 'Game 1', playedTimes: 5 },
    { date: '2024-11-23', gameDescription: 'Game 2', playedTimes: 3 }
  ]

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return dashboard data when the query is successful', async () => {
    ;(ApiService.getWhatHappenedTodayDashboard as Mock).mockResolvedValueOnce(mockDashboardData)
    mockQuery({ data: mockDashboardData })

    const { result } = renderHook(() => useWhatHappenedTodayDashboard(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectWhatHappenedTodayData(result, mockDashboardData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useWhatHappenedTodayDashboard(patientId))

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { data: WhatHappenedTodayDashboard[]; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectWhatHappenedTodayData(
  result: { current: { data: WhatHappenedTodayDashboard[]; error: Error | null; isLoading: boolean } },
  mockDashboardData: WhatHappenedTodayDashboard[]
) {
  expect(result.current.data).toEqual(mockDashboardData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
