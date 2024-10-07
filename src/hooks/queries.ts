import * as ApiService from '../http/queries.ts'
import {useQuery} from "@tanstack/react-query";

import {Theme} from "../models/models.ts";

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