import { transformDashboardData } from '@/components/dashboard'
import {
  usePhonemeDashboard,
  useSurveyFeedbackForDashboard,
  useSyllableDashboard,
  useWhatHappenedTodayDashboard
} from '@/hooks/queries'
import { ChartData } from '@/interfaces/interfaces'
import { useEffect, useState } from 'react'

const useDashboard = (selectedPatientId: number) => {
  const {
    data: surveyFeedbackData,
    error: surveyFeedbackError,
    isLoading: surveyFeedbackLoading
  } = useSurveyFeedbackForDashboard(selectedPatientId)
  const {
    data: syllableData,
    error: syllableError,
    isLoading: syllableLoading
  } = useSyllableDashboard(selectedPatientId)
  const { data: phonemeData, error: phonemeError, isLoading: phonemeLoading } = usePhonemeDashboard(selectedPatientId)
  const {
    data: whatHappenedTodayData,
    isLoading: whatHappenedTodayLoading,
    error: whatHappenedTodayError
  } = useWhatHappenedTodayDashboard(selectedPatientId)
  const [chartData, setChartData] = useState<ChartData[] | null>(null)

  useEffect(() => {
    if (syllableLoading || phonemeLoading) {
      setChartData(null)
      return
    }

    if (syllableError || phonemeError) {
      console.error('Error loading syllable or phoneme data:', syllableError || phonemeError)
      setChartData(null)
      return
    }
    const sources = [
      { data: syllableData, id: 'syllables', title: 'Sílabas' },
      { data: phonemeData, id: 'phonemes', title: 'Fonemas' }
    ]

    const transformedData = sources
      .filter((source) => source.data)
      .map((source) =>
        transformDashboardData(source.data as { date: string; value: string; score: number }[], source.id, source.title)
      )

    setChartData(transformedData.length > 0 ? transformedData : null)
  }, [syllableData, phonemeData, syllableLoading, phonemeLoading, syllableError, phonemeError])

  return {
    surveyFeedbackData,
    surveyFeedbackError,
    surveyFeedbackLoading,
    chartData,
    whatHappenedTodayData,
    whatHappenedTodayLoading,
    whatHappenedTodayError
  }
}

export default useDashboard
