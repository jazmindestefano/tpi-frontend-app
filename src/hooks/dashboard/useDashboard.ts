import { useParams } from 'react-router-dom'
import {
  useActivityLetterResponsesForDashboard,
  usePhonemeDashboard,
  useSyllableDashboard,
  useWorstPhonemeRankingDashboard,
  useWorstSyllableRankingDashboard
} from '../queries'
import { useEffect, useState } from 'react'
import {
  AuditoryDiscriminationChartProps,
  PhonemeDashboard,
  PronunciationChartProps,
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

  const [phonemePronunciationChart, setPhonemePronunciationChart] = useState<PronunciationChartProps[]>([])
  const [syllablePronunciationChart, setSyllablePronunciationChart] = useState<PronunciationChartProps[]>([])
  const [auditoryDiscriminationChart, setAuditoryDiscriminationChart] = useState<AuditoryDiscriminationChartProps[]>([])
  const [syllableRankingChart, setSyllableRankingChart] = useState<RankingProps[]>([])
  const [phonemeRankingChart, setPhonemeRankingChart] = useState<RankingProps[]>([])

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
    }
  }, [patientId])

  useEffect(() => {
    if (!syllableError && !syllableLoading && syllableData) {
      const syllableChartData: PronunciationChartProps[] = syllableData.map((item: SyllableDashboard) => ({
        type: 'syllable',
        data: {
          date: item.date,
          value: item.value,
          score: item.score,
          type: 'syllable'
        }
      }))
      setSyllablePronunciationChart(syllableChartData)
    }

    if (!phonemeError && !phonemeLoading && phonemeData) {
      const phonemeChartData: PronunciationChartProps[] = phonemeData.map((item: PhonemeDashboard) => ({
        type: 'phoneme',
        data: {
          date: item.date,
          value: item.value,
          score: item.score,
          type: 'phoneme'
        }
      }))
      setPhonemePronunciationChart(phonemeChartData)
    }
  }, [syllableData, syllableError, syllableLoading, phonemeData, phonemeError, phonemeLoading])

  useEffect(() => {
    if (!phonemeRankingError && !phonemeRankingLoading && phonemeRanking) {
      const phonemeRankingData: RankingProps[] = phonemeRanking.map((item: SyllableRankingDashboard) => ({
        type: 'phoneme',
        chartData: {
          name: item.syllableName,
          average: item.average
        }
      }))
      setPhonemeRankingChart(phonemeRankingData)
    }

    if (!syllableRankingError && !syllableRankingLoading && syllableRanking) {
      const syllableRankingData: RankingProps[] = syllableRanking.map((item: SyllableRankingDashboard) => ({
        type: 'syllable',
        chartData: {
          name: item.syllableName,
          average: item.average
        }
      }))
      setSyllableRankingChart(syllableRankingData)
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
      setAuditoryDiscriminationChart(auditoryData)
    }
  }, [auditoryData, auditoryError, auditoryLoading])

  return {
    phonemePronunciationChart,
    syllablePronunciationChart,
    auditoryDiscriminationChart,
    syllableRankingChart,
    phonemeRankingChart,
    syllableLoading,
    phonemeLoading,
    auditoryLoading,
    phonemeRankingLoading,
    syllableRankingLoading
  }
}

export default useDashboard
