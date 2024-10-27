import { vi } from 'vitest'
import useDashboard from '../../hooks/useDashboard'
import useChart from '../../hooks/useChart'
import { renderHook, act } from '@testing-library/react'

vi.mock('../../hooks/useChart')

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useChart as jest.Mock).mockReturnValue({
      syllablesData: { labels: [], datasets: [] },
      phonemesData: { labels: [], datasets: [] },
      activitiesLettersData: { labels: [], datasets: [] },
      lowestSyllablesData: { labels: [], datasets: [] },
      lowestPhonemesData: { labels: [], datasets: [] },
      surveyFeedback: {
        most_liked_activity: { activity_id: 0, activity_name: '', rating: 0 },
        least_liked_activity: { activity_id: 0, activity_name: '', rating: 0 }
      },
      todayActivities: {},
      isLoading: true,
      error: null
    })
  })

  it('should initialize with default layout and chart types', () => {
    const { result } = renderHook(() => useDashboard())

    expect(result.current.layout).toEqual([
      { i: 'today', x: 0, y: 0, w: 12, h: 1 },
      { i: 'syllables', x: 0, y: 1, w: 6, h: 2 },
      { i: 'phonemes', x: 6, y: 1, w: 6, h: 2 },
      { i: 'letters', x: 0, y: 3, w: 6, h: 2 },
      { i: 'lowestSyllables', x: 6, y: 3, w: 6, h: 2 },
      { i: 'lowestPhonemes', x: 0, y: 5, w: 6, h: 2 },
      { i: 'feedback', x: 6, y: 5, w: 6, h: 2 }
    ])
    expect(result.current.chartTypes).toEqual({
      syllables: 'line',
      phonemes: 'line',
      letters: 'bar',
      lowestSyllables: 'bar',
      lowestPhonemes: 'bar'
    })
  })

  it('should set current date on mount', () => {
    const { result } = renderHook(() => useDashboard())
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

    expect(result.current.currentDate).toBe(today)
  })

  it('should change chart type', () => {
    const { result } = renderHook(() => useDashboard())

    act(() => {
      result.current.handleChartTypeChange('syllables', 'bar')
    })

    expect(result.current.chartTypes.syllables).toBe('bar')
  })

  it('should return correct chart title', () => {
    const { result } = renderHook(() => useDashboard())

    expect(result.current.getChartTitle('syllables')).toBe('Progreso de Sílabas')
    expect(result.current.getChartTitle('phonemes')).toBe('Progreso de Fonemas')
    expect(result.current.getChartTitle('letters')).toBe('Precisión en Actividades de Letras')
    expect(result.current.getChartTitle('lowestSyllables')).toBe('Sílabas con Menor Puntaje')
    expect(result.current.getChartTitle('lowestPhonemes')).toBe('Fonemas con Menor Puntaje')
    expect(result.current.getChartTitle('unknown')).toBe('')
  })

  it('should handle chart data and loading state from useChart', () => {
    const { result } = renderHook(() => useDashboard())

    expect(result.current.syllablesData).toEqual({ labels: [], datasets: [] })
    expect(result.current.phonemesData).toEqual({ labels: [], datasets: [] })
    expect(result.current.activitiesLettersData).toEqual({ labels: [], datasets: [] })
    expect(result.current.lowestSyllablesData).toEqual({ labels: [], datasets: [] })
    expect(result.current.lowestPhonemesData).toEqual({ labels: [], datasets: [] })
    expect(result.current.surveyFeedback).toEqual({
      most_liked_activity: { activity_id: 0, activity_name: '', rating: 0 },
      least_liked_activity: { activity_id: 0, activity_name: '', rating: 0 }
    })
    expect(result.current.todayActivities).toEqual({})
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it('should update layout', () => {
    const { result } = renderHook(() => useDashboard())

    act(() => {
      result.current.setLayout([{ i: 'new', x: 0, y: 0, w: 12, h: 1 }])
    })

    expect(result.current.layout).toEqual([{ i: 'new', x: 0, y: 0, w: 12, h: 1 }])
  })

  it('should handle error state from useChart', () => {
    ;(useChart as jest.Mock).mockReturnValue({
      syllablesData: { labels: [], datasets: [] },
      phonemesData: { labels: [], datasets: [] },
      activitiesLettersData: { labels: [], datasets: [] },
      lowestSyllablesData: { labels: [], datasets: [] },
      lowestPhonemesData: { labels: [], datasets: [] },
      surveyFeedback: {
        most_liked_activity: { activity_id: 0, activity_name: '', rating: 0 },
        least_liked_activity: { activity_id: 0, activity_name: '', rating: 0 }
      },
      todayActivities: {},
      isLoading: false,
      error: 'Error fetching data'
    })

    const { result } = renderHook(() => useDashboard())

    expect(result.current.error).toBe('Error fetching data')
  })
})
