import * as ApiService from '@http'
import { useMutation, useQuery } from '@tanstack/react-query'

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
  PatientActivityAnswers,
  ProfileData,
  UpdateProfessionalStateIdProps,
  Role,
  LoginProps,
  RegisterFormData,
  ProfessionalInAdmin,
  LetterActityResponseDashboard,
  PhonemeDashboard,
  SurveyFeedbackDashboard,
  SyllableDashboard,
  SyllableRankingDashboard,
  WhatHappenedTodayDashboard,
  AchievementsWins
} from '@interfaces'

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
  themeId: number,
  patientId: number
): {
  levels: GameLevel[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getGameLevels', themeId],
    queryFn: async () => await ApiService.getGameLevels(themeId, patientId)
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
    mutationFn: async ({ userId, gameId, activityId, userAudio, text }: PostUserRecordingData) => {
      return await ApiService.postUserRecording({ userId, gameId, activityId, userAudio, text })
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
  patientId: number,
  themeId: number
): {
  achievement: Achievement | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patientId', patientId],
    queryFn: async () => await ApiService.getRandomAchievement(patientId, themeId)
  })
  return { achievement: data, error, isLoading }
}

export const useGetAchievements = (
  patientId: number
): {
  achievements: Achievement[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['achievements', patientId],
    queryFn: async () => await ApiService.getAchievements(patientId)
  })
  return { achievements: data, error, isLoading }
}

export const useGetSynthesizedAudio = (): {
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

export const useGetMe = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await ApiService.getMe()
  })
  return { mutate, isPending }
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

export const useGetPatientNameById = (
  patientId: number
): {
  data: string | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patientName', patientId],
    queryFn: async () => await ApiService.getPatientNameById(patientId)
  })

  return { data, error, isLoading }
}

export const useGetPatientBackgroundById = (
  patientId: number
): {
  data: string | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patientBackground', patientId],
    queryFn: async () => await ApiService.getPatientBackgroundById(patientId)
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

export const usePatchTermsAndConditions = (): {
  mutate: ({ patientId }: { patientId: number }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { error, isSuccess, isPending, mutate, reset } = useMutation({
    mutationFn: async ({ patientId }: { patientId: number }) =>
      await ApiService.patchPatientTermsAndConditions(patientId)
  })

  return { error, isSuccess, isPending, mutate, reset }
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

export const useGetProfileData = (
  id: number,
  role: Role
): {
  data: ProfileData | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['profileData', id, role],
    queryFn: async () => await ApiService.getProfileData(id, role)
  })

  return { data, error, isLoading, refetch }
}

export const useUpdateProfileData = (): {
  mutate: (args: { id: number; role: Role; data: ProfileData }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ id, role, data }: { id: number; role: Role; data: ProfileData }) =>
      await ApiService.updateProfileData(id, role, data)
  })

  return { mutate, reset, error, isPending, isSuccess }
}

export const useGetAvatars = (
  patientId: number
): {
  avatars: AchievementsWins[] | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['avatars', patientId],
    queryFn: async () => await ApiService.getAvatars(patientId)
  })

  return { avatars: data, error, isLoading, refetch }
}

export const useGetBackgrounds = (
  patientId: number
): {
  backgrounds: AchievementsWins[] | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['backgrounds', patientId],
    queryFn: async () => await ApiService.getBackgrounds(patientId)
  })

  return { backgrounds: data, error, isLoading, refetch }
}

export const useSelectAvatar = (): {
  mutate: (args: { patientId: number; avatarId: number }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ patientId, avatarId }: { patientId: number; avatarId: number }) =>
      await ApiService.selectAvatar(patientId, avatarId)
  })

  return { mutate, reset, error, isPending, isSuccess }
}

export const useSelectBackground = (): {
  mutate: (args: { patientId: number; backgroundId: number }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ patientId, backgroundId }: { patientId: number; backgroundId: number }) =>
      await ApiService.selecBackground(patientId, backgroundId)
  })

  return { mutate, reset, error, isPending, isSuccess }
}

export const useGetProfessionalPatients = (
  professionalId: number
): {
  patients: ProfesionalPatient[] | null | undefined
  error: Error | null
  isLoading: boolean
  refetch: () => void
} => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['professionalPatients', professionalId],
    queryFn: async () => await ApiService.getProfessionalPatients(professionalId)
  })

  return { patients: data, error, isLoading, refetch }
}

export const useLogin = (): {
  mutate: (args: LoginProps) => void
  token?: string
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { error, isPending, mutate, data, isSuccess } = useMutation({
    mutationFn: async ({ username, password }: LoginProps) => await ApiService.login(username, password)
  })

  return { error, isPending, mutate, token: data, isSuccess }
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

export const useGetPacientReportPdf = (
  patientId: number | undefined
): {
  reportPdf: Blob | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['reportPdf', patientId],
    queryFn: async () => await ApiService.getPatientReportPdf(patientId)
  })

  return { reportPdf: data, error, isLoading }
}

export const useGetPacientReportTimeline = (
  patientId: number | undefined
): {
  reportTimeline: Blob | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['reportTimeline', patientId],
    queryFn: async () => await ApiService.getPatientReportTimeline(patientId)
  })

  return { reportTimeline: data, error, isLoading }
}

export const usePostPatient = (): {
  mutate: (args: { name: string; surname: string; email: string; birthDate: string; professionalId: number }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      name,
      surname,
      email,
      birthDate,
      professionalId
    }: {
      name: string
      surname: string
      email: string
      birthDate: string
      professionalId: number
    }) => await ApiService.createPatient(name, surname, email, birthDate, professionalId)
  })

  return { mutate, reset, error, isPending, isSuccess }
}

export const useGetProfessionals = (
  stateId: number | null
): {
  data?: ProfessionalInAdmin[] | null
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['professionalsAdmin', stateId],
    queryFn: async () => await ApiService.getProfessionals(stateId)
  })

  return { data, error, isLoading }
}

export const useUpdateProfessioanlStateId = (): {
  mutateAsync: (args: UpdateProfessionalStateIdProps) => Promise<string | null>
  error: Error | null
  isPending: boolean
} => {
  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: async ({ professionalId, stateId, comment }: UpdateProfessionalStateIdProps) =>
      await ApiService.updateProfessionalState(professionalId, stateId, comment)
  })

  return { error, isPending, mutateAsync }
}

export const useRegister = (): {
  mutateAsync: (args: { formData: RegisterFormData }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutateAsync, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ formData }: { formData: RegisterFormData }) => await ApiService.registerProfessional(formData)
  })

  return { mutateAsync, reset, error, isPending, isSuccess }
}

export const useValidateVerificationCode = (): {
  mutateAsync: (args: { email: string; code: string }) => void
  reset: () => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutateAsync, reset, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) =>
      await ApiService.validateVerificationCode(email, code)
  })

  return { mutateAsync, reset, error, isPending, isSuccess }
}

export const usePostPatientTime = (): {
  mutate: (args: { sessionStart: Date; sessionTime: number }) => void
  error: Error | null
  isPending: boolean
} => {
  const { error, isPending, mutate } = useMutation({
    mutationFn: async ({ sessionStart, sessionTime }: { sessionStart: Date; sessionTime: number }) =>
      await ApiService.postPatientTime(sessionStart, sessionTime)
  })

  return { error, isPending, mutate }
}

export const useChangeOneTimePassword = (): {
  mutate: (args: { role: string; id: number; newPassword: string }) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
} => {
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ role, id, newPassword }: { role: string; id: number; newPassword: string }) =>
      await ApiService.changeOneTimePassword(role, id, newPassword)
  })

  return { mutate, error, isPending, isSuccess }
}
