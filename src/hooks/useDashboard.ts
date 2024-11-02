import { transformDashboardData, transformEndpointData, transformRankingData } from '@/components/dashboard'
import {
  useGetActivityLetterProgressDashboard,
  usePhonemeDashboard,
  useSurveyFeedbackForDashboard,
  useSyllableDashboard,
  useWhatHappenedTodayDashboard,
  useWorstPhonemeRankingDashboard,
  useWorstSyllableRankingDashboard
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

  const { data: worstSyllableRankingData } = useWorstSyllableRankingDashboard(selectedPatientId)

  const { data: worstPhonemeRankingData } = useWorstPhonemeRankingDashboard(selectedPatientId)

  const { data: activityLetterProgressData } = useGetActivityLetterProgressDashboard(selectedPatientId)

  const [chartData, setChartData] = useState<ChartData[] | null>(null)

  useEffect(() => {
    if (syllableLoading || phonemeLoading) {
      setChartData(null)
      return
    }

    if (syllableError || phonemeError) {
      setChartData(null)
      return
    }

    const sources = [
      { data: syllableData, id: 'syllables', title: 'Progreso Pronunciación Sílabas' },
      { data: phonemeData, id: 'phonemes', title: 'Progreso Pronunciación Fonemas' }
    ]

    const rankingSources = [
      { data: worstSyllableRankingData, id: 'worstSyllableRanking', title: 'Top 1O Sílabas más Difíciles' },
      { data: worstPhonemeRankingData, id: 'worstPhonemeRanking', title: 'Top 1O Fonemas más Difíciles' }
    ]

    const activitySources = [
      { data: activityLetterProgressData, id: 'activityLetterProgress', title: 'Progreso Discriminación Auditiva' }
    ]

    const transformedData3 = activitySources
      .filter((source) => source.data)
      .map((source) => transformEndpointData(source.data, source.id, source.title))

    const transformedData2 = rankingSources
      .filter((source) => source.data)
      .map((source) => transformRankingData(source.data, source.id, source.title))

    const transformedData = sources
      .filter((source) => source.data)
      .map((source) =>
        transformDashboardData(source.data as { date: string; value: string; score: number }[], source.id, source.title)
      )

    const combinedTransformedData = [...transformedData, ...transformedData2, ...transformedData3]
    setChartData(combinedTransformedData.length > 0 ? combinedTransformedData : null)
  }, [
    syllableData,
    phonemeData,
    syllableLoading,
    phonemeLoading,
    syllableError,
    phonemeError,
    activityLetterProgressData,
    worstPhonemeRankingData,
    worstSyllableRankingData
  ])

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
