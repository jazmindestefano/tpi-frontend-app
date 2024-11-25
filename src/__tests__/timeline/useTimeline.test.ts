import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, MockedFunction } from 'vitest'
import { useTimeline } from '@hooks/timeline'
import { useGetPatientActivityAnswers, useTimelineData } from '@hooks/queries'
import { PatientActivityAnswers, TimelineData } from '@interfaces'

vi.mock('@hooks/queries')

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

const mockPatientActivityAnswers: PatientActivityAnswers[] = [
  {
    gameId: 1,
    gameName: 'La Viborita',
    answersDto: []
  },
  {
    gameId: 2,
    gameName: 'Palabras',
    answersDto: []
  }
]

const mockTimelineData: TimelineData[] = [
  {
    date: '2021-09-01',
    gameDescription: 'La Viborita',
    playedTimes: 1
  },
  {
    date: '2021-09-02',
    gameDescription: 'La Viborita',
    playedTimes: 2
  }
]

describe('useTimeline', () => {
  it('should set readyToFetch to true when patientId is provided', async () => {
    WhenCallDataForTimeline()

    const { result } = renderHook(() => useTimeline({ patientId: '1' }))

    expect(result.current.readyToFetch).toBe(true)
  })
})

function WhenCallDataForTimeline() {
  ;(useGetPatientActivityAnswers as MockedFunction<typeof useGetPatientActivityAnswers>).mockReturnValue({
    data: mockPatientActivityAnswers,
    isLoading: false,
    error: null
  })
  ;(useTimelineData as MockedFunction<typeof useTimelineData>).mockReturnValue({
    data: mockTimelineData,
    isLoading: false,
    error: null
  })
}
