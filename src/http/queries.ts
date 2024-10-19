import {
  GameLevel,
  Game,
  Theme,
  PostUserRecordingData,
  PostAuditoryDiscriminationRequest,
  PostFeedbackData
} from '../interfaces/interfaces.ts'
import { unauthenticatedClient } from './clients.ts'

export const getThemesByGameId = async (gameId: number): Promise<Theme[] | null> => {
  // will change to an authenticated client probably
  const res = await unauthenticatedClient.get(`theme/getThemes/${gameId}`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getGames = async (): Promise<Game[] | null> => {
  const res = await unauthenticatedClient.get(`/getGames/getGames`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getGameLevels = async (themeId: number): Promise<GameLevel[] | null> => {
  const res = await unauthenticatedClient.get(`/activities/getActivities${themeId}`)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postUserRecording = async ({ userId, gameId, text, userAudio, gameName }: PostUserRecordingData) => {
  const formData = new FormData()
  formData.append('user_id', String(userId))
  formData.append('activity_id', String(gameId))
  formData.append('text', text)
  formData.append('user_audio_file', userAudio)
  formData.append('game_name', gameName)

  const res = await unauthenticatedClient.post(`answers/sendAnswersWithAudio`, formData, {
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
  const res = await unauthenticatedClient.post(`answers/sendAnswersWithText`, {
    patientId,
    activities
  })

  if (res.status === 200) {
    return res.data
  }
  return null
}

export const postFeedback = async ({ ranking, gameId, patientId }: PostFeedbackData) => {
  const res = await unauthenticatedClient.post(`postSurvey/${ranking}/${gameId}/${patientId}`)

  if (res.status === 201) {
    return res.data
  }
  return null
}
