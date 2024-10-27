import { useEffect, useState } from 'react'
import { useSpeakText } from './useSpeakText'
import { Step } from 'react-joyride'

const useProductTour = ({ steps }: { steps: Step[] }) => {
  const [runTour, setRunTour] = useState(false)
  const speakText = useSpeakText()

  useEffect(() => {
    setRunTour(true)
  }, [])

  const handleJoyrideCallback = ({ action, index, type }: { action: string; index: number; type: string }) => {
    if (type === 'step:after' && action === 'next') {
      const textToSpeak = steps[index].content?.toString()

      console.log('textToSpeak', textToSpeak)

      if (textToSpeak) {
        speakText(textToSpeak)
      }
    }
  }

  return { runTour, handleJoyrideCallback }
}

export default useProductTour
