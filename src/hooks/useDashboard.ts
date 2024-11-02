import { useParams } from 'react-router-dom'
import {
  useActivityLetterResponsesForDashboard,
  usePhonemeDashboard,
  useSyllableDashboard,
  useWorstPhonemeRankingDashboard,
  useWorstSyllableRankingDashboard
} from './queries'
import { useEffect, useState } from 'react'
import { PhonemeDashboard, SyllableDashboard, SyllableRankingDashboard } from '@/components'

interface PronunciationChartProps {
  date: string
  value: string
  score: number
  type: string
}

interface PronunciationChart {
  type: string
  data: PronunciationChartProps
}

interface AuditoryDiscriminationChartProps {
  activityId: number
  activityName: string
  totalAttempts: number
  correctAttempts: number
  accuracyRate: number
}

interface RankingChartProps {
  name: string
  average: number
}

interface RankingProps {
  type: string
  chartData: RankingChartProps
}

const useDashboard = () => {
  const { patientId } = useParams()
  const {
    data: syllableData,
    isLoading: syllableLoading,
    error: syllableError
  } = useSyllableDashboard(parseInt(patientId!))
  const {
    data: phonemeData,
    isLoading: phonemeLoading,
    error: phonemeError
  } = usePhonemeDashboard(parseInt(patientId!))
  const {
    data: auditoryData,
    isLoading: auditoryLoading,
    error: auditoryError
  } = useActivityLetterResponsesForDashboard(parseInt(patientId!))
  const {
    data: phonemeRanking,
    error: phonemeRankingError,
    isLoading: phonemeRankingLoading
  } = useWorstPhonemeRankingDashboard(parseInt(patientId!))
  const {
    data: syllableRanking,
    error: syllableRankingError,
    isLoading: syllableRankingLoading
  } = useWorstSyllableRankingDashboard(parseInt(patientId!))

  const [pronunciationChart, setPronunciationChart] = useState<[PronunciationChart[], PronunciationChart[]]>([[], []])
  const [auditoryChart, setAuditoryChart] = useState<AuditoryDiscriminationChartProps[]>([])
  const [rankingChart, setRankingChart] = useState<[RankingProps[], RankingProps[]]>([[], []])

  useEffect(() => {
    if (!syllableError && !syllableLoading && syllableData && phonemeData && !phonemeError && !phonemeLoading) {
      const pronunciationChartData: [PronunciationChart[], PronunciationChart[]] = [
        syllableData.map((item: SyllableDashboard) => ({
          type: 'syllable',
          data: {
            date: item.date,
            value: item.value,
            score: item.score,
            type: 'syllable'
          }
        })),
        phonemeData.map((item: PhonemeDashboard) => ({
          type: 'phoneme',
          data: {
            date: item.date,
            value: item.value,
            score: item.score,
            type: 'phoneme'
          }
        }))
      ]

      setPronunciationChart(pronunciationChartData)
    }
  }, [syllableData, syllableError, syllableLoading, phonemeData, phonemeError, phonemeLoading])

  useEffect(() => {
    if (
      !phonemeRankingError &&
      !phonemeRankingLoading &&
      phonemeRanking &&
      syllableRanking &&
      !syllableRankingError &&
      !syllableRankingLoading
    ) {
      const rankingChartData: [RankingProps[], RankingProps[]] = [
        phonemeRanking.map((item: SyllableRankingDashboard) => ({
          type: 'phoneme',
          chartData: {
            name: item.syllableName,
            average: item.average
          }
        })),
        syllableRanking.map((item: SyllableRankingDashboard) => ({
          type: 'syllable',
          chartData: {
            name: item.syllableName,
            average: item.average
          }
        }))
      ]

      setRankingChart(rankingChartData)
    }
  }, [
    phonemeRanking,
    phonemeRankingError,
    phonemeRankingLoading,
    syllableRanking,
    syllableRankingError,
    syllableRankingLoading
  ])

  useEffect(() => {
    if (!auditoryError && !auditoryLoading && auditoryData) {
      setAuditoryChart(auditoryData)
    }
  }, [auditoryData, auditoryError, auditoryLoading])

  return {
    pronunciationChart,
    auditoryChart,
    rankingChart
  }
}

export default useDashboard
