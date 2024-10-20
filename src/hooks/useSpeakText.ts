import { useCallback, useEffect, useRef } from 'react'

interface UseSpeakTextHookProps {
  language?: string
}

export const useSpeakText = (props?: UseSpeakTextHookProps) => {
  const { language = 'es-AR' } = props || {}
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return useCallback(
    (text: string) => {
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
    },
    [language]
  )
}
