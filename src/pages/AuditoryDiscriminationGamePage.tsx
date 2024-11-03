import SpinnerLoader from '../components/common/SpinnerLoader.tsx'
import { LevelOption } from '../interfaces/interfaces.ts'
import { useEffect, useState } from 'react'
import { useGetGameLevels, usePostAuditoryDiscriminationAnswer } from '../hooks/queries.ts'
import { useNavigate } from 'react-router-dom'
import { shuffleArray } from '../helpers/arrays.ts'
import { useSpeakText } from '../hooks/useSpeakText.ts'
import ProgressBar from '../components/ProgressBar.tsx'
import { useSelectedTheme, useUser } from '../hooks/selectors.ts'
import { GameHeader } from '@/components/index.ts'
import GameOptionsList from './GameOptionsListPage.tsx'

const prepareData = ({
  patiendId,
  activityId,
  selectedOption
}: {
  patiendId: number
  selectedOption: number
  activityId: number
}) => {
  return {
    patientId: patiendId,
    activities: [
      {
        activityId: activityId,
        selectedOption: selectedOption
      }
    ]
  }
}

const AuditoryDiscriminationGamePage = () => {
  // todo: possible to lift up state to parent (HOC)
  const navigate = useNavigate()
  const selectedTheme = useSelectedTheme()
  const user = useUser()

  const { levels, isLoading, error: getLevelsError } = useGetGameLevels(selectedTheme!.id)
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [options, setOptions] = useState<LevelOption[]>([])

  // todo: all props need to be used
  const { mutate, error } = usePostAuditoryDiscriminationAnswer()
  const speakText = useSpeakText()

  useEffect(() => {
    if (levels && !isLoading && !getLevelsError) {
      const levelOptions = [...levels[currentLevel].options]
      shuffleArray(levelOptions)
      setOptions(levelOptions)
    }
  }, [levels, isLoading, getLevelsError, currentLevel])

  useEffect(() => {
    if (levels && currentLevel >= levels.length - 1) {
      navigate('/felicitaciones')
    }
  }, [currentLevel, levels, navigate])

  const onOptionSelection = (selectedOption: LevelOption) => {
    mutate(
      prepareData({
        activityId: levels![currentLevel].id,
        patiendId: user.id,
        selectedOption: selectedOption.id
      })
    )
    setCurrentLevel((prevState) => prevState + 1)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (levels) {
        speakText(`Seleccioná la imágen que empiece con la letra ${levels[currentLevel].description}`)
      }
    }, 250)
    return () => clearTimeout(timeoutId)
  }, [currentLevel, levels, speakText])

  useEffect(() => {
    if (error) {
      navigate('/error')
    }
  }, [error, navigate])

  return !isLoading && !getLevelsError && levels && levels.length != 0 && selectedTheme ? (
    <div className="w-full layout flex flex-col justify-center items-center gap-4 px-10 md:px-40 pt-20">
      <ProgressBar currentActivity={currentLevel + 1} totalActivities={levels?.length} />
      <GameHeader level={levels[currentLevel]} headerTitle="Selecciona la imágen que empiece con la letra"></GameHeader>
      <GameOptionsList options={options} onOptionSelection={onOptionSelection} />
    </div>
  ) : (
    <SpinnerLoader />
  )
}

export default AuditoryDiscriminationGamePage
