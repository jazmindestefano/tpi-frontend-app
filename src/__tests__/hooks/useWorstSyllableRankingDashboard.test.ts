import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useWorstSyllableRankingDashboard } from '@hooks'
import * as ApiService from '@http'
import { Mock, vi } from 'vitest'
import { SyllableRankingDashboard } from '@interfaces'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn() as Mock
  }
})

vi.mock('@http', () => ({
  getWorstSyllableRankingDashboard: vi.fn()
}))

describe('useWorstSyllableRankingDashboard', () => {
  const patientId = 1
  const error = new Error('Error fetching syllable ranking data')
  const mockRankingData: SyllableRankingDashboard[] = [
    { syllableId: 1, syllableName: 'syllable1', average: 75 },
    { syllableId: 2, syllableName: 'syllable2', average: 55 }
  ]

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return ranking data when the query is successful', async () => {
    ;(ApiService.getWorstSyllableRankingDashboard as Mock).mockResolvedValueOnce(mockRankingData)
    mockQuery({ data: mockRankingData })

    const { result } = renderHook(() => useWorstSyllableRankingDashboard(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectWorstSyllableRankingData(result, mockRankingData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useWorstSyllableRankingDashboard(patientId))

    ExpectErrors(result, error)
  })
})

function ExpectErrors(
  result: { current: { data: SyllableRankingDashboard[]; error: Error | null; isLoading: boolean } },
  error: Error
) {
  expect(result.current.data).toBeNull()
  expect(result.current.error).toEqual(error)
  expect(result.current.isLoading).toBe(false)
}

function ExpectWorstSyllableRankingData(
  result: { current: { data: SyllableRankingDashboard[]; error: Error | null; isLoading: boolean } },
  mockRankingData: SyllableRankingDashboard[]
) {
  expect(result.current.data).toEqual(mockRankingData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
