import { shuffleArray } from '@helpers'
import { useAudioRecording, useGetGameLevels, usePostUserRecording, useUser, useSelectedGame } from '@hooks'
import { LevelOption } from '@interfaces'
import { useState, useEffect } from 'react'

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
        activityId: levels![currentLevel].id,
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
