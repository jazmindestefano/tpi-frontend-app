import {Game, Theme} from "../interfaces/interfaces.ts";
import {unauthenticatedClient} from "./clients.ts";


export const getThemesByActivityId = async (activityId: number): Promise<Theme[] | null> => {
  // will change to an authenticated client probably
  const res = await unauthenticatedClient.get(`/activities/${activityId}/themes`)
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
