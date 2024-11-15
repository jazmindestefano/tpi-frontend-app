import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import {
  useSelectedGame,
  useSelectedTheme,
  useUser,
  useAudioRecording,
  useGetGameLevels,
  usePostUserRecording
} from '@hooks'
import { FC, useEffect, useState } from 'react'
import { shuffleArray } from '@helpers'
import { ArrowRightIcon } from 'lucide-react'
import { LevelOption } from '@interfaces'
import { Button, GameHeader, ProgressBar, RecordButton, Loader } from '@components'

const RecordGamePage: FC = () => {
  const selectedTheme = useSelectedTheme()
  const navigate = useNavigate()
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const { levels, isLoading, error } = useGetGameLevels(selectedTheme.id)
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

  const handleNextPage = () => {
    setCurrentLevel((prevState) => prevState + 1)
    if (levels && currentLevel === levels.length - 1) {
      navigate('/felicitaciones')
    }
  }

  return !isLoading ? (
    <div className="flex flex-col justify-center items-center w-full h-screen lg:gap-20 px-32 gap-10 lg:pt-0 pt-16">
      <ProgressBar currentActivity={currentLevel + 1} totalActivities={levels?.length} />

      <div className="flex justify-between items-center w-full">
        <div className="lg:w-9/10 lg:flex flex justify-center items-center w-full gap-10">
          <div className="lg:w-2/5">
            <GameHeader level={levels![currentLevel]} headerTitle="¿Cómo dirías la palabra?" />
          </div>
          <div className="w-2/5 flex flex-col justify-center items-center">
            {levelOptions.map((option) => (
              <div
                key={option.id}
                className="flex flex-col items-center justify-start cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-orange-50 w-96"
              >
                <div className="p-4 w-full rounded-3xl h-80 flex flex-col items-start justify-center">
                  <img
                    src={`/gameOptions/${option.name.toLowerCase()}.png`}
                    alt={option.name}
                    className="w-auto h-80 bg-white rounded-3xl p-4"
                  />
                </div>
                <div className={!isDesktop ? 'flex justify-center items-center gap-10' : ''}>
                  <RecordButton
                    variant={'fourth'}
                    isRecording={isRecording}
                    stopRecording={stopRecording}
                    startRecording={startRecording}
                  />
                  {!isDesktop && (
                    <div className="w-1/10 flex justify-end self-center pr-10">
                      <Button size={'circle'} shape={'circle'} variant={'primary'} onClick={handleNextPage}>
                        <ArrowRightIcon />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {isDesktop && (
          <div className="w-1/10 flex justify-end self-center pr-10">
            <Button size={'circle'} shape={'circle'} variant={'primary'} onClick={handleNextPage}>
              <ArrowRightIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default RecordGamePage
