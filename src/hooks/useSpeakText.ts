import { useCallback, useEffect, useRef, useState } from 'react'
import env from '../config/env.ts'
import axios from 'axios'

interface UseSpeakTextHookProps {
  language?: string
  apiUrl?: string
}

export const useSpeakText = (props?: UseSpeakTextHookProps) => {
  const { language = 'es-AR', apiUrl = env.apiUrl } = props || {}
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [isSpeechSynthesisAvailable, setIsSpeechSynthesisAvailable] = useState<boolean>(true)

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    // Check if browser supports speech synthesis
    if (!window.speechSynthesis || !window.speechSynthesis.getVoices().length) {
      setIsSpeechSynthesisAvailable(false)
    }
  }, [])

  const fetchAudioFromApi = useCallback(
    async (text: string) => {
      if (!apiUrl) {
        console.warn('API URL for text-to-speech is not provided.')
        return
      }
      try {
        const response = await axios.post(
          `${apiUrl}/text-to-speech`,
          {
            text
          },
          {
            responseType: 'arraybuffer'
          }
        )
        const audioBlob = new Blob([new Uint8Array(response.data)], { type: 'audio/mp3' })
        const audioUrl = URL.createObjectURL(audioBlob)
        return new Audio(audioUrl)
      } catch (error) {
        console.error('Error fetching audio:', error)
      }
    },
    [apiUrl]
  )

  return useCallback(
    (text: string) => {
      if (isSpeechSynthesisAvailable && window.speechSynthesis.getVoices().length) {
        if (utteranceRef.current) {
          window.speechSynthesis.cancel()
        }

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = language
        utterance.onend = () => {
          utteranceRef.current = null // Clear ref after speech ends
        }

        utteranceRef.current = utterance
        window.speechSynthesis.speak(utterance)
      } else {
        // Fallback to API if speech synthesis is not available
        fetchAudioFromApi(text)
          .then((audio) => audio?.play())
          .catch((e) => {
            console.log(e)
          })
      }
    },
    [fetchAudioFromApi, isSpeechSynthesisAvailable, language]
  )
}
