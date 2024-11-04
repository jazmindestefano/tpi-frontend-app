import { unauthenticatedClient } from './clients.ts'
import { convertBlobToAudioFile } from '../helpers/blobs.ts'
import {
  Theme,
  Game,
  GameLevel,
  PostUserRecordingData,
  PostAuditoryDiscriminationRequest,
  PostFeedbackData,
  Word,
  TimelineData,
  ProfesionalPatient
} from '@/interfaces/interfaces.ts'
import { getCurrentAge } from '@/helpers/index.ts'

export const getThemesByGameId = async (gameId: number): Promise<Theme[] | null> => {
  // will change to an authenticated client probably
  const res = await unauthenticatedClient.get(`/games/${gameId}/themes`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getGames = async (): Promise<Game[] | null> => {
  const res = await unauthenticatedClient.get(`/games`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getGameLevels = async (themeId: number): Promise<GameLevel[] | null> => {
  const res = await unauthenticatedClient.get(`/themes/${themeId}/activities`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postUserRecording = async ({ userId, activityId, gameId, userAudio }: PostUserRecordingData) => {
  const formData = new FormData()

  const data = JSON.stringify({
    userId: userId,
    activityId: activityId,
    gameId: gameId
  })

  formData.append('data', new Blob([data], { type: 'application/json' }))
  formData.append('user_audio_file', convertBlobToAudioFile(userAudio, 'user_audio'))

  const res = await unauthenticatedClient.post(`/answers/audio`, formData, {
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

  const res = await unauthenticatedClient.post(`/answers/text`, payload, {
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
  const res = await unauthenticatedClient.post(`/games/feedback`, {
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
  const res = await unauthenticatedClient.get<Word[]>(`/words/${userId}`)

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getRandomAchievement = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/randomAchievement/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getAchievements = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/achivements/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getSynthesizedAudio = async (text: string) => {
  const res = await unauthenticatedClient.post(
    `/text-to-speech`,
    {
      text
    },
    { responseType: 'arraybuffer' }
  )

  return new Blob([new Uint8Array(res.data)], { type: 'audio/mp3' })
}

export const getActivityLetterResponsesForDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/activityLetter/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getSurveyFeedbackForDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/surveyFeedback/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getSyllableDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/syllable/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getPhonemeDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/phoneme/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getTimelineData = async (patientId: number): Promise<TimelineData | null> => {
  const res = await unauthenticatedClient.get(`/timeline/${patientId}`)
  if (res.status === 200) {
    return res.data
  }

  return null
}

export const UpdatePatientTermsAndConditions = async (patientId: number) => {
  const res = await unauthenticatedClient.patch(`/${patientId}/accept-terms`)

  if (res.status === 200) {
    return res.data
  }

  return null
}

export const getWhatHappenedTodayDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/today/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getWorstSyllableRankingDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/syllableRanking/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getWorstPhonemeRankingDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/phonemeRanking/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getActivityLetterProgressDashboard = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/activityLetter/${patientId}`)

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getProfessionalPatients = async (profesionalId: number): Promise<ProfesionalPatient[] | null> => {
  //  const res = await unauthenticatedClient.get(`/professional/${profesionalId}/patients`)
  const res = `http://localhost:8080/professional/${profesionalId}/patients`
  console.log(res)

  const mockedResponse = [
    {
      id: 1,
      name: 'Candela',
      email: 'cande.fdz12@gmail.com',
      image: 'candelaPerfil',
      birthDate: '2002-10-23T03:00:00.000Z'
    },
    {
      id: 2,
      name: 'Ailen',
      email: 'ailenpereiravilches@gmail.com',
      image: 'ailenPerfil',
      birthDate: '2002-10-23T03:00:00.000Z'
    }
  ]

  const newPatients: ProfesionalPatient[] = []

  mockedResponse.forEach((patient) => {
    newPatients.push({
      id: patient.id,
      name: patient.name,
      image: patient.image,
      email: patient.email,
      age: getCurrentAge(patient.birthDate)
    })
  })

  return newPatients
}

export const exportPdf = async (patientId: number) => {
  const res = await unauthenticatedClient.get(`/export-today-games-and-timeline?patientId=${patientId}`)

  console.log(res)

  if (res.status === 200) {
    return res.data
  }
  return null
}
