import React, { useEffect } from 'react'
import Button from './Button.tsx'
import { AudioLinesIcon, MicIcon } from '../icons/Icons.tsx'

import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './buttonVariants.ts'

interface RecordButtonProps extends Omit<VariantProps<typeof buttonVariants>, 'size' | 'shape'> {
  isRecording: boolean
  stopRecording: () => void
  startRecording: () => void
  className?: string
}

export const RecordButton: React.FC<RecordButtonProps> = ({ isRecording, stopRecording, startRecording, variant }) => {
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
