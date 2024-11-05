import * as ApiService from '../http/queries.ts'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  LetterActityResponseDashboard,
  PhonemeDashboard,
  SurveyFeedbackDashboard,
  SyllableDashboard,
  SyllableRankingDashboard,
  WhatHappenedTodayDashboard
} from '@/components/index.ts'

import {
  Theme,
  Game,
  GameLevel,
  PostUserRecordingData,
  PostFeedbackData,
  PostAuditoryDiscriminationRequest,
  Word,
  Achievement,
  TimelineData,
  ProfesionalPatient,
  PatientActivityAnswers
} from '@/interfaces/interfaces.ts'

export const useGetThemesByGameId = (
  gameId: number
): {
  themes: Theme[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getThemeByGame'],
    queryFn: async () => await ApiService.getThemesByGameId(gameId)
  })
  return { themes: data, error, isLoading }
}

export const useGetGames = (): {
  games: Game[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getGames'],
    queryFn: async () => await ApiService.getGames()
  })
  return { games: data, error, isLoading }
}

export const useGetGameLevels = (
  themeId: number
): {
  levels: GameLevel[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getGameLevels', themeId],
    queryFn: async () => await ApiService.getGameLevels(themeId)
  })

  return { levels: data, error, isLoading }
}

export const usePostUserRecording = (): {
  mutate: (args: PostUserRecordingData) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ userId, gameId, activityId, userAudio }: PostUserRecordingData) => {
      return await ApiService.postUserRecording({ userId, gameId, activityId, userAudio })
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const usePostFeedback = (): {
  mutate: (args: PostFeedbackData) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ ranking, gameId, patientId }: PostFeedbackData) => {
      return await ApiService.postFeedback({ ranking, gameId, patientId })
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const usePostAuditoryDiscriminationAnswer = (): {
  mutate: (args: PostAuditoryDiscriminationRequest) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ patientId, activities }: PostAuditoryDiscriminationRequest) => {
      return await ApiService.postAuditoryDiscriminationAnswer({
        patientId,
        activities
      })
    }
  })
  return { mutate, reset, error, isPending, isSuccess }
}

export const useGetWordsByUserId = (
  userId: number
): {
  words: Word[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getWordsByUser'],
    queryFn: async () => await ApiService.getWordsByUserId(userId)
  })

  return { words: data, error, isLoading }
}

export const useRandomAchievement = (
  patientId: number
): {
  achievement: Achievement | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patientId', patientId],
    queryFn: async () => await ApiService.getRandomAchievement(patientId)
  })
  return { achievement: data, error, isLoading }
}

export const useAchievements = (
  patientId: number
): {
  achievement: Achievement[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patientId', patientId],
    queryFn: async () => await ApiService.getAchievements(patientId)
  })
  return { achievement: data, error, isLoading }
}

export const useTextToSpeech = (): {
  mutateAsync: (text: string) => Promise<Blob>
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { error, isSuccess, isPending, mutateAsync } = useMutation({
    mutationFn: async (text: string) => await ApiService.getSynthesizedAudio(text)
  })

  return { error, isSuccess, isPending, mutateAsync }
}

export const useActivityLetterResponsesForDashboard = (
  patientId: number
): {
  data: LetterActityResponseDashboard[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patientId', patientId],
    queryFn: async () => await ApiService.getActivityLetterResponsesForDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const useSurveyFeedbackForDashboard = (
  patientId: number
): {
  data: SurveyFeedbackDashboard
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['surveyFeedback', patientId],
    queryFn: async () => await ApiService.getSurveyFeedbackForDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const useSyllableDashboard = (
  patientId: number
): {
  data: SyllableDashboard[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['syllable', patientId],
    queryFn: async () => await ApiService.getSyllableDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const usePhonemeDashboard = (
  patientId: number
): {
  data: PhonemeDashboard[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['phoneme', patientId],
    queryFn: async () => await ApiService.getPhonemeDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const useTimelineData = (patientId: number) => {
  const { data, error, isLoading } = useQuery<TimelineData[]>({
    queryKey: ['timeline', patientId],
    queryFn: async () => {
      const data = await ApiService.getTimelineData(patientId)
      return data ? [data] : []
    }
  })

  return { data, error, isLoading }
}

export const useTermsAndConditions = () => {
  const { error, isSuccess, isPending, mutateAsync } = useMutation({
    mutationFn: async (patientId: number) => await ApiService.UpdatePatientTermsAndConditions(patientId)
  })

  return { error, isSuccess, isPending, mutateAsync }
}

export const useWhatHappenedTodayDashboard = (
  patientId: number
): {
  data: WhatHappenedTodayDashboard[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['today', patientId],
    queryFn: async () => await ApiService.getWhatHappenedTodayDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const useWorstSyllableRankingDashboard = (
  patientId: number
): {
  data: SyllableRankingDashboard[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['worstSyllableRanking', patientId],
    queryFn: async () => await ApiService.getWorstSyllableRankingDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const useWorstPhonemeRankingDashboard = (
  patientId: number
): {
  data: SyllableRankingDashboard[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['worstPhonemeRanking', patientId],
    queryFn: async () => await ApiService.getWorstPhonemeRankingDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const useGetActivityLetterProgressDashboard = (
  patientId: number
): {
  data: LetterActityResponseDashboard[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['activityLetterProgress', patientId],
    queryFn: async () => await ApiService.getActivityLetterProgressDashboard(patientId)
  })

  return { data, error, isLoading }
}

export const useGetProfessionalPatients = (
  professionalId: number
): {
  patients: ProfesionalPatient[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['professionalPatients', professionalId],
    queryFn: async () => await ApiService.getProfessionalPatients(professionalId)
  })

  return { patients: data, error, isLoading }
}

export const useGetPatientActivityAnswers = (
  patientId: number
): {
  data: PatientActivityAnswers[]
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patientData', patientId],
    queryFn: async () => await ApiService.getPatientActivityAnswers(patientId)
  })

  return { data, error, isLoading }
}

export const useExportPdf = (
  patientId: number
): {
  pdf: Blob | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['exportPdf', patientId],
    queryFn: async () => await ApiService.exportPdf(patientId)
  })

  return { pdf: data, error, isLoading }
}
