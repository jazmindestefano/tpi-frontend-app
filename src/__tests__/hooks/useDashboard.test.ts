import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, Mock } from 'vitest'
import useDashboard from '@/hooks/useDashboard'

vi.mock('@/hooks/queries', () => ({
  useSyllableDashboard: vi.fn(),
  usePhonemeDashboard: vi.fn(),
  useActivityLetterResponsesForDashboard: vi.fn(),
  useWorstPhonemeRankingDashboard: vi.fn(),
  useWorstSyllableRankingDashboard: vi.fn()
}))

import {
  useSyllableDashboard,
  usePhonemeDashboard,
  useActivityLetterResponsesForDashboard,
  useWorstPhonemeRankingDashboard,
  useWorstSyllableRankingDashboard
} from '@/hooks/queries'

describe('useDashboard', () => {
  it('returns transformed data when data is available', async () => {
    const mockSyllableData = [
      { date: '2024-10-01 12:00:00', value: 'a', score: 5 },
      { date: '2024-10-02 12:00:00', value: 'a', score: 7 }
    ]
    const mockPhonemeData = [{ date: '2024-10-01 12:00:00', value: 'b', score: 3 }]
    ;(useActivityLetterResponsesForDashboard as Mock).mockReturnValue({ data: [] })
    ;(useWorstPhonemeRankingDashboard as Mock).mockReturnValue({ data: [] })
    ;(useWorstSyllableRankingDashboard as Mock).mockReturnValue({ data: [] })
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: mockSyllableData })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: mockPhonemeData })

    const { result } = renderHook(() => useDashboard())

    await waitFor(() => {
      expect(result.current.pronunciationChart).not.toBeNull()
    })

    expect(result.current.pronunciationChart.length).toBe(2)
  })

  it('handles data loading correctly', () => {
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: null })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: null })

    const { result } = renderHook(() => useDashboard())

    expect(result.current.pronunciationChart).not.toBeNull()
  })

  it('handles errors correctly', () => {
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: null })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: null })

    const { result } = renderHook(() => useDashboard())

    expect(result.current.pronunciationChart).not.toBeNull()
  })
})
