import * as ApiService from '../http/queries.ts'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  Game,
  GameLevel,
  PostAuditoryDiscriminationRequest,
  PostFeedbackData,
  PostUserRecordingData,
  Theme
} from '../interfaces/interfaces.ts'

const mockedPalabras = [
  {
    id: 1,
    description: 'Mesa',
    options: [
      {
        id: 1,
        name: 'Mesa',
        correct: true,
        image: 'Mesa',
        description: 'Mesa'
      }
    ]
  }
]

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

  if (themeId === 2) {
    return { levels: mockedPalabras, error: null, isLoading: false }
  }

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
