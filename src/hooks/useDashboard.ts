// hooks/useDashboard.ts
import { useState, useEffect } from 'react'
import useChart from './useChart'

const useDashboard = () => {
  const [layout, setLayout] = useState([
    { i: 'today', x: 0, y: 0, w: 12, h: 1 },
    { i: 'syllables', x: 0, y: 1, w: 6, h: 2 },
    { i: 'phonemes', x: 6, y: 1, w: 6, h: 2 },
    { i: 'letters', x: 0, y: 3, w: 6, h: 2 },
    { i: 'lowestSyllables', x: 6, y: 3, w: 6, h: 2 },
    { i: 'lowestPhonemes', x: 0, y: 5, w: 6, h: 2 },
    { i: 'feedback', x: 6, y: 5, w: 6, h: 2 }
  ])

  const {
    syllablesData,
    phonemesData,
    activitiesLettersData,
    lowestSyllablesData,
    lowestPhonemesData,
    surveyFeedback,
    todayActivities,
    isLoading,
    error
  } = useChart()

  const [currentDate, setCurrentDate] = useState('')
  const [chartTypes, setChartTypes] = useState({
    syllables: 'line',
    phonemes: 'line',
    letters: 'bar',
    lowestSyllables: 'bar',
    lowestPhonemes: 'bar'
  })

  useEffect(() => {
    const today = new Date()
    setCurrentDate(today.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  const handleChartTypeChange = (chartId: string, type: 'line' | 'bar') => {
    setChartTypes((prev) => ({ ...prev, [chartId]: type }))
  }

  const getChartTitle = (chartId: string) => {
    switch (chartId) {
      case 'syllables':
        return 'Progreso de Sílabas'
      case 'phonemes':
        return 'Progreso de Fonemas'
      case 'letters':
        return 'Precisión en Actividades de Letras'
      case 'lowestSyllables':
        return 'Sílabas con Menor Puntaje'
      case 'lowestPhonemes':
        return 'Fonemas con Menor Puntaje'
      default:
        return ''
    }
  }

  return {
    layout,
    setLayout,
    currentDate,
    chartTypes,
    handleChartTypeChange,
    syllablesData,
    phonemesData,
    activitiesLettersData,
    lowestSyllablesData,
    lowestPhonemesData,
    surveyFeedback,
    todayActivities,
    isLoading,
    error,
    getChartTitle
  }
}

export default useDashboard
