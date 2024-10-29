import SpinnerLoader from '../../components/common/SpinnerLoader'
import { useNavigate } from 'react-router-dom'
import useRecordGame from '../../hooks/useRecordGame'
import { RecordButton } from '../../components/common/buttons/RecordButton.tsx'
import Button from '../../components/common/buttons/Button.tsx'
import { ArrowRightIcon } from '../../components/common/icons/Icons.tsx'
import ProgressBar from '../../components/ProgressBar.tsx'
import { GameHeader } from './GameHeader.tsx'
import { useEffect } from 'react'
import localStorageManager from '../../localStorage/localStorageManager.js'
import { useMediaQuery } from 'react-responsive'

const RecordGame: React.FC = () => {
  // const selectedTheme = useSelectedTheme()
  const navigate = useNavigate()
  const selectedThemeId = localStorageManager.getItem('selectedThemeId')
  const {
    isLoading,
    error,
    levels,
    currentLevel,
    levelOptions,
    setCurrentLevel,
    isRecording,
    stopRecording,
    startRecording
  } = useRecordGame(selectedThemeId)
  const isDesktop = useMediaQuery({ minWidth: 768 })

  useEffect(() => {
    if (error) {
      navigate('/error')
    }
  }, [error, navigate])

  const handleNextPage = () => {
    setCurrentLevel((prevState) => prevState + 1)
    if (currentLevel === levels!.length - 1) {
      navigate('/felicitaciones')
    }
  }

  return !isLoading ? (
    <div className="flex flex-col justify-center items-center w-full lg:gap-20 px-32 gap-10 lg:pt-0 pt-16">
      <ProgressBar currentActivity={currentLevel + 1} totalActivities={levels?.length} />

      <div className="flex justify-between items-center w-full">
        <div
          className={
            'lg:w-9/10 lg:flex justify-center items-center w-full flex flex-col justify-center items-center w-full gap-10'
          }
        >
          <div className="lg:w-2/5">
            <GameHeader level={levels![currentLevel]} headerTitle="¿Cómo dirías la palabra?"></GameHeader>
          </div>
          <div className="w-2/5 flex flex-col justify-center items-center w-full">
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
    <SpinnerLoader />
  )
}

export default RecordGame
