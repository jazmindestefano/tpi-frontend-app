import * as ApiService from '../http/queries.ts'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  Achievement,
  Game,
  GameLevel,
  LetterActityRsponseDashboard,
  PostAuditoryDiscriminationRequest,
  PostFeedbackData,
  PostUserRecordingData,
  Theme,
  Word
} from '../interfaces/interfaces.ts'
import { SurveyFeedbackDashboard, SyllableDashboard } from '@/components/index.ts'

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
  data: LetterActityRsponseDashboard[]
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
