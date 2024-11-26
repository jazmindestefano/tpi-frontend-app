import { authenticatedClient, unauthenticatedClient } from '@http'
import { convertBlobToAudioFile, convertToImgFile } from '@helpers'
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
  Role,
  RegisterFormData,
  ProfessionalInAdmin
} from '@interfaces'

export const getThemesByGameId = async (gameId: number): Promise<Theme[] | null> => {
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

export const getRandomAchievement = async (patientId: number, themeId: number) => {
  const res = await authenticatedClient.get(`/randomAchievement/${patientId}${themeId ? `?themeId=${themeId}` : ''}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getAchievements = async (patientId: number) => {
  const res = await authenticatedClient.get(`/achievements/${patientId}`)

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

export const patchPatientTermsAndConditions = async (patientId: number) => {
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

export const getPatientReportPdf = async (patientId?: number): Promise<Blob | null> => {
  if (!patientId) return null

  const res = await authenticatedClient.get<Blob>(`/generate-PDF-report?patientId=${patientId}`, {
    responseType: 'blob'
  })

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getPatientReportTimeline = async (patientId?: number): Promise<Blob | null> => {
  if (!patientId) return null

  const res = await authenticatedClient.get<Blob>(`/generate-timeline-report?patientId=${patientId}`, {
    responseType: 'blob'
  })

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const login = async (username: string, password: string): Promise<string> => {
  const res = await unauthenticatedClient.post<{ token: string }>('/api/login', {
    username,
    password
  })

  if (res.status === 200) {
    return res.data.token
  } else {
    return 'invalid_token'
  }
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
  const res = await authenticatedClient.get<ProfessionalInAdmin[]>(
    `admin/getProfessionals/${stateId == null ? '' : `?idState=${stateId}`}`
  )

  console.log(res)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const updateProfessionalState = async (professionalId: number, stateId: number, comment: string | null) => {
  const res = await authenticatedClient.patch(
    `admin/${professionalId}?idState=${stateId}${comment != null ? `&comment=${comment}` : ''}`
  )
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postPatientTime = async (sessionStart: Date, sessionTime: number) => {
  // const res = await authenticatedClient.patch(
  //   `admin/${professionalId}?idState=${stateId}${comment != null ? `&comment=${comment}` : ''}`
  // )

  // if (res.status === 200) {
  //   return res.data
  // }
  // return null
  console.log({ sessionStart, sessionTime })
  return
}

export const registerProfessional = async (data: RegisterFormData) => {
  const formData = new FormData()
  formData.append('file', convertToImgFile(data.professionalCredential!, data.professionalCredential!.name))

  const res = await unauthenticatedClient.post(
    `/professional/registerProfessional?email=${data.email}&name=${data.name}&surname=${data.surname}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const validateVerificationCode = async (email: string, code: string) => {
  const res = await unauthenticatedClient.post(`/professional/verifyEmailCode?email=${email}&code=${code}`)

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const changeOneTimePassword = async (role: string, id: number, newPassword: string) => {
  const url = `${role === 'PROFESSIONAL' ? '/professional' : '/patients'}/updateOneTimePw/${id}?newPassword=${newPassword}`
  const res = await unauthenticatedClient.patch(url)

  if (res.status === 200) {
    return res.data
  }

  return null
}
