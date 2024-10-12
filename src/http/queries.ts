import {GameLevel, Game, Theme, PostUserRecordingData} from "../interfaces/interfaces.ts";
import {unauthenticatedClient} from "./clients.ts";


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

export const postUserRecording = async ({userId, gameId, text, userAudio}: PostUserRecordingData) => {
  const formData = new FormData();
  const file = new File([userAudio], `${userId}-${gameId}.${userAudio.type.split("/")[1]}`);
  formData.append('file', file, file.name);
  formData.append('userId', userId.toString());
  formData.append('gameId', gameId.toString());
  formData.append('text', text)
  
  const res = await unauthenticatedClient.post('/sendAnswersWithAudio', {
    formData
  }, {
    headers: {
      "Content-Type": `multipart/form-data`,
    }
  })

  if (res.status === 200) {
    return res.data
  }
  return null
}
