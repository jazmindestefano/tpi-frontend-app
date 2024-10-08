import * as ApiService from '../http/queries.ts'
import {useQuery} from "@tanstack/react-query";

import { Theme, Game } from "../interfaces/interfaces.ts";

export const useGetThemesByActivityId = (activityId: number): {
  themes: Theme[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getThemeByActivity'],
    queryFn: async () => await ApiService.getThemesByActivityId(activityId)
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