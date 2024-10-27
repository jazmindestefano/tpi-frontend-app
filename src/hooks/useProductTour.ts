import { useEffect, useState } from 'react'
import { Step } from 'react-joyride'
import { useSpeakText } from './useSpeakText'

const useProductTour = ({ steps }: { steps: Step[] }) => {
  const [runTour, setRunTour] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const textToSpeak = useSpeakText()

  useEffect(() => {
    setRunTour(true)
  }, [])

  useEffect(() => {
    const stepContent = steps[currentStepIndex]?.content?.toString()
    if (stepContent) {
      textToSpeak(stepContent)
    }
  }, [currentStepIndex, steps, textToSpeak])

  const handleJoyrideCallback = ({ index, type }: { index: number; type: string }) => {
    if (type === 'step:after' || type === 'step:before') {
      setCurrentStepIndex(index)
    }
  }

  return { runTour, handleJoyrideCallback }
}

export default useProductTour
