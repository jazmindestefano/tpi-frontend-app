import { GameHeader, Loader, ProgressBar } from '@components'
import {
  useSpeakText,
  useCurrentUser,
  useGetGameLevels,
  usePostAuditoryDiscriminationAnswer,
  useCurrentGame
} from '@hooks'
import { LevelOption } from '@interfaces'
import { useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { shuffleArray } from '@helpers'
import { GameOptionsListPage } from '@pages'

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

const AuditoryDiscriminationGamePage: FC = () => {
  const navigate = useNavigate()
  const { selectedTheme } = useCurrentGame()
  const user = useCurrentUser()
  const { levels, isLoading, error: getLevelsError } = useGetGameLevels(selectedTheme.id)
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [options, setOptions] = useState<LevelOption[]>([])

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

    setTimeout(() => {
      setCurrentLevel((prevState) => prevState + 1)
    }, 500)
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
      <GameHeader level={levels[currentLevel]} headerTitle="Selecciona la imagen que empiece con la letra"></GameHeader>
      <GameOptionsListPage options={options} onOptionSelection={onOptionSelection} />
    </div>
  ) : (
    <Loader />
  )
}

export default AuditoryDiscriminationGamePage
