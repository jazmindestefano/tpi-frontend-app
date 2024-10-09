import * as ApiService from '../http/queries.ts'
import {useQuery} from "@tanstack/react-query";

import { Theme, Game, GameLevel } from "../interfaces/interfaces.ts";

export const useGetThemesByGameId = (gameId: number): {
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

export const useGetGameLevels = (themeId: number): {
  levels: GameLevel[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getGameLevels'],
    queryFn: async () => await ApiService.getGameLevels(themeId)
  })
  return { levels: data, error, isLoading }
}