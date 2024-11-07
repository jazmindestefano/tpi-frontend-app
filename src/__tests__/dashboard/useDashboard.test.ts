import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, MockedFunction } from 'vitest'
import useDashboard from '@hooks/dashboard/useDashboard'
import {
  useSyllableDashboard,
  usePhonemeDashboard,
  useActivityLetterResponsesForDashboard,
  useWorstPhonemeRankingDashboard,
  useWorstSyllableRankingDashboard
} from '@/hooks/queries'
import {
  syllableMockedData,
  phonemeMockedData,
  letterActivityMockedData,
  syllableRankingMockedData
} from './mockedData'

// Mock de los hooks
vi.mock('@/hooks/queries', () => ({
  useSyllableDashboard: vi.fn(),
  usePhonemeDashboard: vi.fn(),
  useActivityLetterResponsesForDashboard: vi.fn(),
  useWorstPhonemeRankingDashboard: vi.fn(),
  useWorstSyllableRankingDashboard: vi.fn()
}))

describe('useDashboard', () => {
  it('expect dashboard information to be returned from Api', async () => {
    WhenApiReturnsDataForDashboard()

    const { result } = renderHook(() => useDashboard())

    await waitFor(() => {
      expect(result.current.syllablePronunciationChart).not.toBeNull()
      expect(result.current.phonemePronunciationChart).not.toBeNull()
      expect(result.current.auditoryDiscriminationChart).not.toBeNull()
      expect(result.current.phonemeRankingChart).not.toBeNull()
      expect(result.current.syllableRankingChart).not.toBeNull()
    })
  })
})

function WhenApiReturnsDataForDashboard() {
  ;(useSyllableDashboard as MockedFunction<typeof useSyllableDashboard>).mockReturnValue({
    data: syllableMockedData,
    error: null,
    isLoading: false
  })
  ;(usePhonemeDashboard as MockedFunction<typeof usePhonemeDashboard>).mockReturnValue({
    data: phonemeMockedData,
    error: null,
    isLoading: false
  })
  ;(
    useActivityLetterResponsesForDashboard as MockedFunction<typeof useActivityLetterResponsesForDashboard>
  ).mockReturnValue({
    data: letterActivityMockedData,
    error: null,
    isLoading: false
  })
  ;(useWorstPhonemeRankingDashboard as MockedFunction<typeof useWorstPhonemeRankingDashboard>).mockReturnValue({
    data: syllableRankingMockedData,
    error: null,
    isLoading: false
  })
  ;(useWorstSyllableRankingDashboard as MockedFunction<typeof useWorstSyllableRankingDashboard>).mockReturnValue({
    data: syllableRankingMockedData,
    error: null,
    isLoading: false
  })
}
