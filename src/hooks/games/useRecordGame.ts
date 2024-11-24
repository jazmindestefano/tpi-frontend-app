import { shuffleArray } from '@helpers'
import { useGetGameLevels, usePostUserRecording, useCurrentUser, useCurrentGame } from '@hooks'
import { LevelOption } from '@interfaces'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useRecordGame = (audio: Blob | null) => {
  const user = useCurrentUser()
  const { selectedGame, selectedTheme } = useCurrentGame()
  const navigate = useNavigate()
  const { levels, isLoading, error } = useGetGameLevels(selectedTheme.id)
  const { mutate } = usePostUserRecording()
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([])

  useEffect(() => {
    if (levels && !isLoading && !error) {
      const levelOptions = [...levels[currentLevel].options]
      shuffleArray(levelOptions)
      setLevelOptions(levelOptions)
    }
  }, [levels, isLoading, error, currentLevel])

  useEffect(() => {
    if (audio && levels) {
      mutate({
        userId: user.id,
        gameId: selectedGame.id,
        activityId: levels[currentLevel].id,
        userAudio: audio
      })
    }
  }, [audio, currentLevel, levels, mutate, selectedGame, user])

  const handleNextPage = () => {
    setCurrentLevel((prevState) => prevState + 1)
    if (levels && currentLevel === levels.length - 1) {
      navigate('/felicitaciones')
    }
  }

  return {
    levels,
    isLoading,
    error,
    currentLevel,
    levelOptions,
    handleNextPage
  }
}

export default useRecordGame
