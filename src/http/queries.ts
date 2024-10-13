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

export const postUserRecording = async ({ userId, gameId, text, userAudio }: PostUserRecordingData) => {
  console.log("Enviando grabación: ", { userAudio, userId, gameId, text });

  const formData = new FormData();
  formData.append("user_audio_file", userAudio);

  const res = await unauthenticatedClient.post(`/sendAnswersWithAudio`, formData, {
    params: {
      user_id: userId,
      game_id: gameId,
      text: text,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

  if (res.status === 200) {
    return res.data;
  }

  return null;
};

