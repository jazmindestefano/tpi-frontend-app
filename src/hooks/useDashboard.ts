import { useParams } from 'react-router-dom'
import {
  useActivityLetterResponsesForDashboard,
  usePhonemeDashboard,
  useSyllableDashboard,
  useWorstPhonemeRankingDashboard,
  useWorstSyllableRankingDashboard
} from './queries'
import { useEffect, useState } from 'react'
import {
  AuditoryDiscriminationChartProps,
  PhonemeDashboard,
  PronunciationChart,
  RankingProps,
  SyllableDashboard,
  SyllableRankingDashboard
} from '@/components'

const useDashboard = () => {
  const { patientId } = useParams()
  const [readyToFetch, setReadyToFetch] = useState(false)
  const {
    data: syllableData,
    isLoading: syllableLoading,
    error: syllableError
  } = useSyllableDashboard(readyToFetch ? Number(patientId) : 0)
  const {
    data: phonemeData,
    isLoading: phonemeLoading,
    error: phonemeError
  } = usePhonemeDashboard(readyToFetch ? Number(patientId) : 0)
  const {
    data: auditoryData,
    isLoading: auditoryLoading,
    error: auditoryError
  } = useActivityLetterResponsesForDashboard(readyToFetch ? Number(patientId) : 0)
  const {
    data: phonemeRanking,
    error: phonemeRankingError,
    isLoading: phonemeRankingLoading
  } = useWorstPhonemeRankingDashboard(readyToFetch ? Number(patientId) : 0)
  const {
    data: syllableRanking,
    error: syllableRankingError,
    isLoading: syllableRankingLoading
  } = useWorstSyllableRankingDashboard(readyToFetch ? Number(patientId) : 0)

  const [pronunciationChart, setPronunciationChart] = useState<[PronunciationChart[], PronunciationChart[]]>([[], []])
  const [auditoryChart, setAuditoryChart] = useState<AuditoryDiscriminationChartProps[]>([])
  const [rankingChart, setRankingChart] = useState<[RankingProps[], RankingProps[]]>([[], []])

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
    }
  }, [patientId])

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
    rankingChart,
    syllableLoading,
    phonemeLoading,
    auditoryLoading,
    phonemeRankingLoading,
    syllableRankingLoading
  }
}

export default useDashboard
