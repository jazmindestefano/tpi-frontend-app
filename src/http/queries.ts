import {
  GameLevel,
  Game,
  Theme,
  PostUserRecordingData,
  PostAuditoryDiscriminationRequest,
  PostFeedbackData
} from "../interfaces/interfaces.ts";
import { unauthenticatedClient } from "./clients.ts";


export const getThemesByGameId = async (gameId: number): Promise<Theme[] | null> => {
  // will change to an authenticated client probably
  const res = await unauthenticatedClient.get(`games/${gameId}/themes`)
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
  const formData = new FormData();
  
  const data = JSON.stringify({
    userId: userId,
    activityId: activityId,
    gameId: gameId
  });

  console.log({data})

  formData.append('data', new Blob([data], { type: 'application/json' }));

  formData.append('user_audio_file', userAudio);

  const res = await unauthenticatedClient.post(
    `answers/audio`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.status === 200) {
    return res.data;
  }
  return null;
};


export const postAuditoryDiscriminationAnswer = async ({ patientId, activities }: PostAuditoryDiscriminationRequest) => {
  const payload = {
    patientId: patientId,
    activities: activities,
  };

  const res = await unauthenticatedClient.post(`answers/text`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log({ res });

  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export const postFeedback = async ({ranking, gameId, patientId}: PostFeedbackData) => {
  const res = await unauthenticatedClient.post(`games/feedback`,{
    ranking,
    gameId,
    patientId
  })

  if (res.status === 201) {
    return res.data
  }
  return null 
}