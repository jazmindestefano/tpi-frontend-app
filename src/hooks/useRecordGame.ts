import { useState, useEffect } from 'react'
import { shuffleArray } from '../helpers/arrays'
import { useGetGameLevels, usePostUserRecording } from './queries.ts'
import { useSelectedGame, useUser } from './selectors.ts'
import { useAudioRecording } from './useAudioRecording.ts'
import { LevelOption } from '../interfaces/interfaces'

const useRecordGame = (selectedThemeId: number) => {
  const { levels, isLoading, error } = useGetGameLevels(selectedThemeId)
  const { isRecording, audio, startRecording, stopRecording } = useAudioRecording()
  const { mutate } = usePostUserRecording()
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([])
  const user = useUser()
  const selectedGame = useSelectedGame()
  useEffect(() => {
    if (levels && !isLoading && !error) {
      const levelOptions = [...levels[currentLevel].options]
      shuffleArray(levelOptions)
      setLevelOptions(levelOptions)
    }
  }, [levels, isLoading, error, currentLevel])

  useEffect(() => {
    if (audio) {
      mutate({
        userId: user.id,
        gameId: selectedGame.id,
        activityId: 1, // todo: fix hardcoded value
        userAudio: audio
      })
    }
  }, [audio, currentLevel, levels, mutate, selectedGame, user])

  return {
    levels,
    isLoading,
    error,
    isRecording,
    audio,
    startRecording,
    stopRecording,
    currentLevel,
    levelOptions,
    setCurrentLevel
  }
}

export default useRecordGame
