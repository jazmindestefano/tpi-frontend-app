import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useTimelineData } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { TimelineData } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getTimelineData: vi.fn()
}))

describe('useTimelineData', () => {
  const patientId = 1
  const mockData: TimelineData[] = [
    { date: '2024-01-01', gameDescription: 'Game 1', playedTimes: 5 },
    { date: '2024-01-02', gameDescription: 'Game 2', playedTimes: 3 }
  ]
  const error = new Error('Error fetching timeline data')

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null as TimelineData[] | null | undefined,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return timeline data when the query is successful', async () => {
    ;(ApiService.getTimelineData as Mock).mockResolvedValueOnce(mockData)
    mockQuery({ data: mockData })

    const { result } = renderHook(() => useTimelineData(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectTimelineData(result, mockData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useTimelineData(patientId))

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { data: TimelineData[] | null | undefined; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectTimelineData(
  result: { current: { data: TimelineData[] | null | undefined; error: Error | null; isLoading: boolean } },
  mockData: TimelineData[]
) {
  expect(result.current.data).toEqual(mockData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
