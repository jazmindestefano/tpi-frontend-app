import { transformDashboardData } from '@/components/dashboard'
import { usePhonemeDashboard, useSurveyFeedbackForDashboard, useSyllableDashboard } from '@/hooks/queries'
import { ChartData } from '@/interfaces/interfaces'
import { useEffect, useState } from 'react'

const useDashboard = (selectedPatientId: number) => {
  const {
    data: surveyFeedbackData,
    error: surveyFeedbackError,
    isLoading: surveyFeedbackLoading
  } = useSurveyFeedbackForDashboard(selectedPatientId)
  const { data: syllableData } = useSyllableDashboard(selectedPatientId)
  const { data: phonemeData } = usePhonemeDashboard(selectedPatientId)
  const [chartData, setChartData] = useState<ChartData[] | null>(null)

  useEffect(() => {
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
  }, [syllableData, phonemeData])

  return {
    surveyFeedbackData,
    surveyFeedbackError,
    surveyFeedbackLoading,
    chartData
  }
}

export default useDashboard
