import { useEffect, useRef, useState } from 'react'

interface UseAudioRecordingProps {
  audioMimeType?: string
}

/**
 * React Hook that uses the Media Recording API to record audio from the user's microphone.
 *
 * This hook maintains the audio's blob being recorded and tells if audio is being recorded with isRecording boolean.
 *
 * It returns the error string in case of error and the audio blob once the recording has stopped.
 */
export const useAudioRecording = (props?: UseAudioRecordingProps) => {
  const { audioMimeType = 'audio/wav' } = props || {}
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [audio, setAudio] = useState<Blob | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<BlobPart[]>([])

  useEffect(() => {
    let mediaStream: MediaStream
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaStream = stream
        mediaRecorderRef.current = new MediaRecorder(stream)
        // Registers event for ondataavailable event
        mediaRecorderRef.current.ondataavailable = (event) => {
          console.log(event)
          audioChunksRef.current.push(event.data)
        }

        // Registers event for onstop event
        mediaRecorderRef.current.onstop = (event) => {
          console.log(event)
          setAudio(new Blob(audioChunksRef.current, { type: audioMimeType }))
        }
      })
      .catch((e) => {
        console.error(e)
        setError(e.message)
      })

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [audioMimeType])

  const startRecording = () => {
    try {
      // Clear previous recordings
      audioChunksRef.current = []
      // Collect audio data in chunks
      if (mediaRecorderRef.current) {
        console.log('grabando...')
        mediaRecorderRef.current.start()
        setIsRecording(true)
      }
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      try {
        console.log('parando...')
        mediaRecorderRef.current.stop()
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          setError(e.message)
        }
      } finally {
        setIsRecording(false)
      }
    }
  }

  return {
    isRecording,
    error,
    audio,
    startRecording,
    stopRecording
  }
}
