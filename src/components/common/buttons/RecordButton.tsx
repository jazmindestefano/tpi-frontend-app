import { FC, useEffect } from 'react'
import { AudioLinesIcon, MicIcon, Button, buttonVariants } from '@components'
import type { VariantProps } from 'class-variance-authority'

interface RecordButtonProps extends Omit<VariantProps<typeof buttonVariants>, 'size' | 'shape'> {
  isRecording: boolean
  stopRecording: () => void
  startRecording: () => void
  className?: string
}

const RecordButton: FC<RecordButtonProps> = ({ isRecording, stopRecording, startRecording, variant }) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (isRecording) {
      timeoutId = setTimeout(() => {
        stopRecording()
      }, 5000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isRecording, stopRecording])

  return (
    <Button
      size={'circle'}
      shape={'circle'}
      variant={variant}
      onClick={() => (isRecording ? stopRecording() : startRecording())}
    >
      {isRecording ? <AudioLinesIcon /> : <MicIcon />}
    </Button>
  )
}

export default RecordButton
