import SpinnerLoader from '../../components/common/SpinnerLoader'
import { useNavigate } from 'react-router-dom'
import useRecordGame from '../../hooks/useRecordGame'
import { RecordButton } from '../../components/common/buttons/RecordButton.tsx'
import Button from '../../components/common/buttons/Button.tsx'
import { ArrowRightIcon } from '../../components/common/icons/Icons.tsx'
import { useSelectedTheme } from '../../hooks/selectors.ts'
import ProgressBar from '../../components/progressBar/ProgressBar.tsx'
import { GameHeader } from './GameHeader.tsx'
import useCustomMediaQuery from '../../hooks/useMediaQuery.ts'

const RecordGame: React.FC = () => {
  const selectedTheme = useSelectedTheme()
  const navigate = useNavigate()
  const { isLoading, levels, currentLevel, levelOptions, setCurrentLevel, isRecording, stopRecording, startRecording } =
    useRecordGame(selectedTheme.id)
  const { isDesktop } = useCustomMediaQuery()

  // todo: save in LS to not redirect
  if (selectedTheme.id === -1) {
    navigate('/error')
    return null
  }

  const handleNextPage = () => {
    setCurrentLevel((prevState) => prevState + 1)
    if (currentLevel === levels!.length - 1) {
      navigate('/felicitaciones')
    }
  }

  return !isLoading ? (
    <div className="flex-col-center lg:gap-20 px-32 gap-10 lg:pt-0 pt-10">
      <ProgressBar currentActivity={currentLevel + 1} totalActivities={levels?.length} />

      <div className="flex justify-between items-center w-full">
        <div className={isDesktop ? 'w-9/10 flex-center' : 'flex-col-center gap-10'}>
          <div className="lg:w-2/5">
            <GameHeader level={levels![currentLevel]} headerTitle="¿Cómo dirías la palabra?"></GameHeader>
          </div>
          <div className="w-2/5 flex-col-center">
            {levelOptions.map((option) => (
              <div
                key={option.id}
                className="flex flex-col items-center justify-start cursor-pointer rounded-3xl shadow-lg p-4 h-auto gap-6 bg-orange-50 w-96"
              >
                <div className="p-4 w-full rounded-3xl h-80 flex flex-col items-start justify-center">
                  <img
                    src={`/gameOptions/${option.name.toLowerCase().replace(' ', '_').replace('ñ', 'ni')}.png`}
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
