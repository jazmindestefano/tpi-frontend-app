import { useState, useEffect } from 'react'
import { rawData, activitiesLettersDataa, surveyFeedbackData } from '../testData/chartsData'

export interface RawDataItem {
  date: string
  type: 'syllable' | 'phoneme' | 'letter'
  value: string
  score: number
}

export interface ActivityLetterData {
  activity_id: number
  activity_name: string
  total_attempts: number
  correct_attempts: number
  accuracy_rate: number
}

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: (number | null)[]
    borderColor?: string
    backgroundColor: string
  }[]
}

export interface SurveyFeedback {
  most_liked_activity: {
    activity_id: number
    activity_name: string
    rating: number
  }
  least_liked_activity: {
    activity_id: number
    activity_name: string
    rating: number
  }
}

interface UseChartDataReturn {
  syllablesData: ChartData | null
  phonemesData: ChartData | null
  activitiesLettersData: ChartData | null
  lowestSyllablesData: ChartData | null
  lowestPhonemesData: ChartData | null
  surveyFeedback: SurveyFeedback | null
  isLoading: boolean
  error: string | null
}

const useChart = (): UseChartDataReturn => {
  const [syllablesData, setSyllablesData] = useState<ChartData | null>(null)
  const [phonemesData, setPhonemesData] = useState<ChartData | null>(null)
  const [activitiesLettersData, setActivitiesLettersData] = useState<ChartData | null>(null)
  const [lowestSyllablesData, setLowestSyllablesData] = useState<ChartData | null>(null)
  const [lowestPhonemesData, setLowestPhonemesData] = useState<ChartData | null>(null)
  const [surveyFeedback, setSurveyFeedback] = useState<SurveyFeedback | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSyllablesData(processLineChartData(rawData.filter((item) => item.type === 'syllable')))
        setPhonemesData(processLineChartData(rawData.filter((item) => item.type === 'phoneme')))
        setActivitiesLettersData(processBarChartData(activitiesLettersDataa))
        setLowestSyllablesData(
          processLowestScoresData(
            rawData.filter((item) => item.type === 'syllable'),
            3
          )
        )
        setLowestPhonemesData(
          processLowestScoresData(
            rawData.filter((item) => item.type === 'phoneme'),
            3
          )
        )
        setSurveyFeedback(surveyFeedbackData)
        setIsLoading(false)
      } catch {
        setError('Error al cargar los datos. Por favor, intente de nuevo más tarde.')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const processLineChartData = (rawData: RawDataItem[]): ChartData => {
    const values = [...new Set(rawData.map((item) => item.value))]
    const dates = [...new Set(rawData.map((item) => item.date))]

    const datasets = values.map((value, index) => {
      const color = `hsl(${(index * 360) / values.length}, 70%, 50%)`
      return {
        label: value,
        data: dates.map((date) => {
          const dataPoint = rawData.find((item) => item.date === date && item.value === value)
          return dataPoint ? dataPoint.score : null
        }),
        borderColor: color,
        backgroundColor: color.replace('hsl', 'hsla').replace(')', ', 0.5)')
      }
    })

    return {
      labels: dates,
      datasets
    }
  }

  const processBarChartData = (activitiesData: ActivityLetterData[]): ChartData => {
    return {
      labels: activitiesData.map((item) => item.activity_name),
      datasets: [
        {
          label: 'Precisión',
          data: activitiesData.map((item) => item.accuracy_rate),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }
      ]
    }
  }

  const processLowestScoresData = (rawData: RawDataItem[], topN: number): ChartData => {
    const averageScores = rawData.reduce(
      (acc, item) => {
        if (!acc[item.value]) {
          acc[item.value] = { total: 0, count: 0 }
        }
        acc[item.value].total += item.score
        acc[item.value].count += 1
        return acc
      },
      {} as Record<string, { total: number; count: number }>
    )

    const sortedAverages = Object.entries(averageScores)
      .map(([value, { total, count }]) => ({ value, average: total / count }))
      .sort((a, b) => a.average - b.average)
      .slice(0, topN)

    return {
      labels: sortedAverages.map((item) => item.value),
      datasets: [
        {
          label: 'Puntaje Promedio',
          data: sortedAverages.map((item) => item.average),
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }
      ]
    }
  }

  return {
    syllablesData,
    phonemesData,
    activitiesLettersData,
    lowestSyllablesData,
    lowestPhonemesData,
    surveyFeedback,
    isLoading,
    error
  }
}

export default useChart
