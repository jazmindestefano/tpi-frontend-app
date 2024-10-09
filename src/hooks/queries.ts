import * as ApiService from '../http/queries.ts'
import {useQuery} from "@tanstack/react-query";

import { Theme, Game, ContentActivity } from "../interfaces/interfaces.ts";

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

export const useGetContentActivity = (themeId: number): {
  contentActivity: ContentActivity[] | null | undefined
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getContentActivity'],
    queryFn: async () => await ApiService.getContentActivity(themeId)
  })
  return { contentActivity: data, error, isLoading }
}