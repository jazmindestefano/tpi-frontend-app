import { authenticatedClient, unauthenticatedClient } from './clients.ts'
import { convertBlobToAudioFile } from '@/helpers'
import {
  Theme,
  Game,
  GameLevel,
  PostUserRecordingData,
  PostAuditoryDiscriminationRequest,
  PostFeedbackData,
  Word,
  TimelineData,
  ProfesionalPatient,
  ProfileData,
  RoleEnum,
  Role
} from '@/interfaces/interfaces.ts'

export const getThemesByGameId = async (gameId: number): Promise<Theme[] | null> => {
  // will change to an authenticated client probably
  const res = await authenticatedClient.get(`/games/${gameId}/themes`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getGames = async (): Promise<Game[] | null> => {
  const res = await authenticatedClient.get(`/games`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getGameLevels = async (themeId: number): Promise<GameLevel[] | null> => {
  const res = await authenticatedClient.get(`/themes/${themeId}/activities`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postUserRecording = async ({ userId, activityId, gameId, userAudio, text }: PostUserRecordingData) => {
  const formData = new FormData()

  const data = JSON.stringify({
    userId: userId,
    activityId: activityId,
    gameId: gameId,
    text: text ?? ''
  })

  formData.append('data', new Blob([data], { type: 'application/json' }))
  formData.append('user_audio_file', convertBlobToAudioFile(userAudio, 'user_audio'))

  const res = await authenticatedClient.post(`/answers/audio`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postAuditoryDiscriminationAnswer = async ({
  patientId,
  activities
}: PostAuditoryDiscriminationRequest) => {
  const payload = {
    patientId: patientId,
    activities: activities
  }

  const res = await authenticatedClient.post(`/answers/text`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postFeedback = async ({ ranking, gameId, patientId }: PostFeedbackData) => {
  const res = await authenticatedClient.post(`/games/feedback`, {
    ranking,
    gameId,
    patientId
  })

  if (res.status === 201) {
    return res.data
  }
  return null
}

export const getWordsByUserId = async (userId: number): Promise<Word[] | null> => {
  const res = await authenticatedClient.get<Word[]>(`/words/${userId}`)

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getRandomAchievement = async (patientId: number) => {
  const res = await authenticatedClient.get(`/randomAchievement/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getAchievements = async (patientId: number) => {
  const res = await authenticatedClient.get(`/achivements/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getSynthesizedAudio = async (text: string) => {
  const res = await authenticatedClient.post(
    `/text-to-speech`,
    {
      text
    },
    { responseType: 'arraybuffer' }
  )

  return new Blob([new Uint8Array(res.data)], { type: 'audio/mp3' })
}

export const getMe = async () => {
  const res = await authenticatedClient.get('/api/users/me')

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getActivityLetterResponsesForDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/activityLetter/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getSurveyFeedbackForDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/surveyFeedback/${patientId}`)
  if (res.status === 200 && res.data.statusCode !== '404') {
    return res.data
  }
  return null
}

export const getSyllableDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/syllable/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getPhonemeDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/phoneme/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getTimelineData = async (patientId: number): Promise<TimelineData | null> => {
  const res = await authenticatedClient.get(`/timeline/${patientId}`)
  if (res.status === 200) {
    return res.data
  }

  return null
}

export const UpdatePatientTermsAndConditions = async (patientId: number) => {
  const res = await authenticatedClient.patch(`/${patientId}/accept-terms`)

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getWhatHappenedTodayDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/today/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getWorstSyllableRankingDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/syllableRanking/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getWorstPhonemeRankingDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/phonemeRanking/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getActivityLetterProgressDashboard = async (patientId: number) => {
  const res = await authenticatedClient.get(`/activityLetter/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getProfileData = async (id: number, role: Role): Promise<ProfileData | null> => {
  const endpoint = role === RoleEnum.PATIENT ? `/patients/${id}` : `/professional/${id}`
  const res = await authenticatedClient.get<ProfileData>(endpoint)
  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getPatientNameById = async (id: number): Promise<string | null> => {
  const res = await authenticatedClient.get(`/patients/${id}`)
  const { name } = res.data

  if (res.status === 200) {
    return name
  }
  return null
}

export const updateProfileData = async (id: number, role: Role, data: ProfileData) => {
  const endpoint = role === RoleEnum.PATIENT ? `/patients/${id}` : `/professional/${id}`
  const res = await authenticatedClient.patch(endpoint, data)
  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getProfessionalPatients = async (profesionalId: number): Promise<ProfesionalPatient[] | null> => {
  const res = await authenticatedClient.get<ProfesionalPatient[]>(`/professional/${profesionalId}/patients`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getPatientActivityAnswers = async (patientId: number) => {
  const res = await authenticatedClient.get(`/answers/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getPacientReportPdf = async (patientId?: number): Promise<Blob | null> => {
  if (!patientId) return null

  const res = await authenticatedClient.get<Blob>(`/export-today-games-and-timeline?patientId=${patientId}`, {
    responseType: 'blob'
  })

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const login = async (username: string, password: string): Promise<string | null> => {
  const res = await unauthenticatedClient.post('/api/login', {
    username,
    password
  })

  if (res.status === 200) {
    return res.data.token
  }

  return null
}

export const createPatient = async (
  name: string,
  surname: string,
  email: string,
  birthDate: string,
  professionalId: number
) => {
  const res = await authenticatedClient.post(`/patients/${professionalId}`, {
    name,
    surname,
    email,
    birthDate: new Date(birthDate)
  })

  if (res.status === 201) {
    return res.data
  }
  return null
}

export const getProfessionals = async (stateId: number | null) => {
  const res = await authenticatedClient.get(`admin/getProfessionals/${stateId == null ? '' : `?idState=${stateId}`}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const updateProfessionalState = async (professionalId: number, stateId: number, comment: string | null) => {
  const res = await authenticatedClient.patch(
    `admin/${professionalId}?idState=${stateId}${comment != null ? `&comment=${comment}` : ''}`
  )
  console.log({ res })
  if (res.status === 200) {
    return res.data
  }
  return null
}
