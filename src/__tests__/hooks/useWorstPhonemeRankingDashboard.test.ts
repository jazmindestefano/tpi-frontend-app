import { renderHook, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import { useWorstPhonemeRankingDashboard } from '@hooks'
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
  getWorstPhonemeRankingDashboard: vi.fn()
}))

describe('useWorstPhonemeRankingDashboard', () => {
  const patientId = 1
  const error = new Error('Error fetching phoneme ranking data')
  const mockRankingData: SyllableRankingDashboard[] = [
    { syllableId: 1, syllableName: 'phoneme1', average: 80 },
    { syllableId: 2, syllableName: 'phoneme2', average: 60 }
  ]

  const mockQuery = (overrides: Partial<ReturnType<typeof useQuery>>) => {
    ;(useQuery as Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      ...overrides
    })
  }

  it('should return phoneme ranking data when the query is successful', async () => {
    ;(ApiService.getWorstPhonemeRankingDashboard as Mock).mockResolvedValueOnce(mockRankingData)
    mockQuery({ data: mockRankingData })

    const { result } = renderHook(() => useWorstPhonemeRankingDashboard(patientId))

    await waitFor(() => !result.current.isLoading)

    ExpectPhonemeRankingData(result, mockRankingData)
  })

  it('should return an error when the query fails', async () => {
    mockQuery({ error })

    const { result } = renderHook(() => useWorstPhonemeRankingDashboard(patientId))

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

function ExpectPhonemeRankingData(
  result: { current: { data: SyllableRankingDashboard[]; error: Error | null; isLoading: boolean } },
  mockRankingData: SyllableRankingDashboard[]
) {
  expect(result.current.data).toEqual(mockRankingData)
  expect(result.current.error).toBeNull()
  expect(result.current.isLoading).toBe(false)
}
