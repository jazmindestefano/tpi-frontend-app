import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as ApiService from '../http/queries.ts'

interface UseAudioPlayerHookProps {
  text: string
}
// todo: we need to somehow merge these two useTextToSpeech - useSpeakText
export const useTextToSpeech = ({ text }: UseAudioPlayerHookProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    data: audio,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['audio', text],
    queryFn: async () => {
      const audioBlob = await ApiService.getSynthesizedAudio(text)
      const url = URL.createObjectURL(audioBlob)
      return new Audio(url)
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  const playAudio = useCallback(() => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
        audio.currentTime = 0
        setIsPlaying(false)
      }

      audio.play().catch((e) => console.error(e))
      setIsPlaying(true)
      audio.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }
  }, [audio, isPlaying])

  const pauseAudio = useCallback(() => {
    if (audio && isPlaying) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    }
  }, [audio, isPlaying])

  return {
    audio,
    isPlaying,
    isLoading,
    isError,
    playAudio,
    pauseAudio
  }
}
