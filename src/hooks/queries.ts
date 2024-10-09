import * as ApiService from '../http/queries.ts'
import {useQuery} from "@tanstack/react-query";

import { Theme, Game, GameLevel } from "../interfaces/interfaces.ts";

const mockedPalabras = [
  {
    id: 1,
    description: "Mesa",
    options: [
      { id: 1, name: "Mesa", correct: true, image: "Mesa", description: "Mesa" },
    ],
  },
];

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
  levels: GameLevel[] | null | undefined,
  error: Error | null,
  isLoading: boolean
} => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getGameLevels', themeId],
    queryFn: async () => await ApiService.getGameLevels(themeId),
  });

  if (themeId === 2) {
    return { levels: mockedPalabras, error: null, isLoading: false };
  }

  return { levels: data, error, isLoading };
};