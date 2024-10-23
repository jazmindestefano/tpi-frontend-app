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
  const [voiceAvailable, setVoiceAvailable] = useState<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    const checkVoiceAvailability = () => {
      if (!window.speechSynthesis) {
        setIsSpeechSynthesisAvailable(false)
        return
      }

      const voices = window.speechSynthesis.getVoices()
      const voice = voices.find((v) => v.lang === language)

      if (voice) {
        setVoiceAvailable(voice)
      } else {
        setVoiceAvailable(null)
      }
    }

    // Ensure the voices are loaded before checking
    if (window.speechSynthesis.getVoices().length > 0) {
      checkVoiceAvailability()
    } else {
      window.speechSynthesis.onvoiceschanged = checkVoiceAvailability
    }
  }, [language])

  const fetchAudioFromApi = useCallback(
    async (text: string) => {
      if (!apiUrl) {
        console.warn('API URL for text-to-speech is not provided.')
        return
      }
      try {
        const response = await axios.post(`${apiUrl}/text-to-speech`, { text }, { responseType: 'arraybuffer' })
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
      if (isSpeechSynthesisAvailable && voiceAvailable) {
        if (utteranceRef.current) {
          window.speechSynthesis.cancel()
        }

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = language
        utterance.voice = voiceAvailable
        utterance.onend = () => {
          utteranceRef.current = null
        }

        utteranceRef.current = utterance
        window.speechSynthesis.speak(utterance)
      } else {
        fetchAudioFromApi(text)
          .then((audio) => audio?.play())
          .catch((e) => {
            console.log(e)
          })
      }
    },
    [fetchAudioFromApi, isSpeechSynthesisAvailable, voiceAvailable, language]
  )
}
