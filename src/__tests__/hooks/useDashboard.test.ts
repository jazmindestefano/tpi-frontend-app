import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, Mock } from 'vitest' // Importa `Mock`
import useDashboard from '@/hooks/useDashboard'

vi.mock('@/hooks/queries', () => ({
  useSurveyFeedbackForDashboard: vi.fn(),
  useSyllableDashboard: vi.fn(),
  usePhonemeDashboard: vi.fn()
}))

import { useSurveyFeedbackForDashboard, useSyllableDashboard, usePhonemeDashboard } from '@/hooks/queries'
import { SurveyFeedbackDashboard } from '@/components'

describe('useDashboard', () => {
  it('returns transformed data when data is available', async () => {
    const mockSurveyFeedbackData: SurveyFeedbackDashboard[] = []
    const mockSyllableData = [
      { date: '2024-10-01 12:00:00', value: 'a', score: 5 },
      { date: '2024-10-02 12:00:00', value: 'a', score: 7 }
    ]
    const mockPhonemeData = [{ date: '2024-10-01 12:00:00', value: 'b', score: 3 }]

    ;(useSurveyFeedbackForDashboard as Mock).mockReturnValue({
      data: mockSurveyFeedbackData,
      error: null,
      isLoading: false
    })
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: mockSyllableData })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: mockPhonemeData })

    const { result } = renderHook(() => useDashboard(123))

    await waitFor(() => {
      expect(result.current.chartData).not.toBeNull()
    })

    expect(result.current.chartData?.length).toBe(2)
  })

  it('handles data loading correctly', () => {
    ;(useSurveyFeedbackForDashboard as Mock).mockReturnValue({ data: null, error: null, isLoading: true })
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: null })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: null })

    const { result } = renderHook(() => useDashboard(123))

    expect(result.current.surveyFeedbackLoading).toBe(true)
    expect(result.current.chartData).toBeNull()
  })
})
