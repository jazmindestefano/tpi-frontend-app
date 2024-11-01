import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, Mock } from 'vitest'
import useDashboard from '@/hooks/useDashboard'

vi.mock('@/hooks/queries', () => ({
  useSurveyFeedbackForDashboard: vi.fn(),
  useSyllableDashboard: vi.fn(),
  usePhonemeDashboard: vi.fn(),
  useWhatHappenedTodayDashboard: vi.fn()
}))

import {
  useSurveyFeedbackForDashboard,
  useSyllableDashboard,
  usePhonemeDashboard,
  useWhatHappenedTodayDashboard
} from '@/hooks/queries'
import { SurveyFeedbackDashboard } from '@/components'

describe('useDashboard', () => {
  it('returns transformed data when data is available', async () => {
    const mockSurveyFeedbackData: SurveyFeedbackDashboard[] = []
    const mockSyllableData = [
      { date: '2024-10-01 12:00:00', value: 'a', score: 5 },
      { date: '2024-10-02 12:00:00', value: 'a', score: 7 }
    ]
    const mockPhonemeData = [{ date: '2024-10-01 12:00:00', value: 'b', score: 3 }]
    const mockWhatHappenedTodayData = { events: ['Event 1', 'Event 2'] }

    ;(useSurveyFeedbackForDashboard as Mock).mockReturnValue({
      data: mockSurveyFeedbackData,
      error: null,
      isLoading: false
    })
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: mockSyllableData })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: mockPhonemeData })
    ;(useWhatHappenedTodayDashboard as Mock).mockReturnValue({
      data: mockWhatHappenedTodayData,
      isLoading: false,
      error: null
    })

    const { result } = renderHook(() => useDashboard(123))

    await waitFor(() => {
      expect(result.current.chartData).not.toBeNull()
    })

    expect(result.current.chartData?.length).toBe(2)
    expect(result.current.whatHappenedTodayData).toEqual(mockWhatHappenedTodayData)
    expect(result.current.whatHappenedTodayLoading).toBe(false)
    expect(result.current.whatHappenedTodayError).toBeNull()
  })

  it('handles data loading correctly', () => {
    ;(useSurveyFeedbackForDashboard as Mock).mockReturnValue({ data: null, error: null, isLoading: true })
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: null })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: null })
    ;(useWhatHappenedTodayDashboard as Mock).mockReturnValue({ data: null, isLoading: true, error: null })

    const { result } = renderHook(() => useDashboard(123))

    expect(result.current.surveyFeedbackLoading).toBe(true)
    expect(result.current.chartData).toBeNull()
    expect(result.current.whatHappenedTodayLoading).toBe(true)
    expect(result.current.whatHappenedTodayData).toBeNull()
  })

  it('handles errors correctly', () => {
    const mockError = new Error('Error fetching data')

    ;(useSurveyFeedbackForDashboard as Mock).mockReturnValue({ data: null, error: mockError, isLoading: false })
    ;(useSyllableDashboard as Mock).mockReturnValue({ data: null })
    ;(usePhonemeDashboard as Mock).mockReturnValue({ data: null })
    ;(useWhatHappenedTodayDashboard as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError
    })

    const { result } = renderHook(() => useDashboard(123))

    expect(result.current.surveyFeedbackError).toEqual(mockError)
    expect(result.current.whatHappenedTodayError).toEqual(mockError)
    expect(result.current.chartData).toBeNull()
  })
})
