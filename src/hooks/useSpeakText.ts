import { useCallback, useRef } from 'react'
import { useTextToSpeech } from './queries.ts'

export const useSpeakText = () => {
  const { mutateAsync: tts } = useTextToSpeech()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isSpeakingRef = useRef(false)

  return useCallback(
    (text: string) => {
      if (isSpeakingRef.current) return

      isSpeakingRef.current = true

      // Stop the previous audio if it's still playing
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      // Trigger the TTS API call
      tts(text)
        .then((data: Blob) => {
          // Create a new audio object and assign it to the ref
          const audioUrl = URL.createObjectURL(data)
          const audio = new Audio(audioUrl)
          audioRef.current = audio

          // Clean up the URL object once the audio is done playing
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl)
            audioRef.current = null
            isSpeakingRef.current = false
          }

          // Play the audio
          audio.play()
        })
        .catch((error) => {
          console.error('Error during TTS request:', error)
          audioRef.current = null
          isSpeakingRef.current = false
        })
    },
    [tts]
  )
}
