import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, MockedFunction } from 'vitest'
import {
  useSyllableDashboard,
  usePhonemeDashboard,
  useActivityLetterResponsesForDashboard,
  useWorstPhonemeRankingDashboard,
  useWorstSyllableRankingDashboard
} from '@hooks/queries' // this seems wrong, but tests break otherwise
import { useDashboard } from '@hooks/dashboard'
import {
  syllableMockedData,
  phonemeMockedData,
  letterActivityMockedData,
  syllableRankingMockedData
} from './mockedData'

vi.mock('@hooks/queries', async () => {
  const actual = await vi.importActual('@hooks/queries')
  return {
    ...actual,
    useSyllableDashboard: vi.fn(),
    usePhonemeDashboard: vi.fn(),
    useActivityLetterResponsesForDashboard: vi.fn(),
    useWorstPhonemeRankingDashboard: vi.fn(),
    useWorstSyllableRankingDashboard: vi.fn()
  }
})

describe('useDashboard', () => {
  it('expect dashboard information to be returned from Api', async () => {
    WhenApiReturnsDataForDashboard()

    const { result } = renderHook(() => useDashboard())

    expect(result.current.syllablePronunciationChart).not.toBeNull()
    expect(result.current.phonemePronunciationChart).not.toBeNull()
    expect(result.current.auditoryDiscriminationChart).not.toBeNull()
    expect(result.current.phonemeRankingChart).not.toBeNull()
    expect(result.current.syllableRankingChart).not.toBeNull()
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
