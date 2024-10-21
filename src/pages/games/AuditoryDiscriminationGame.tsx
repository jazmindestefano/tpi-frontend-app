import SpinnerLoader from '../../components/common/SpinnerLoader'
import { LevelOption } from '../../interfaces/interfaces'
import React, { useEffect, useState } from 'react'
import { useGetGameLevels, usePostAuditoryDiscriminationAnswer } from '../../hooks/queries.ts'
import { useNavigate } from 'react-router-dom'
import { useSelectedTheme, useUser } from '../../hooks/selectors.ts'
import { shuffleArray } from '../../helpers/arrays.ts'
import { GameOptionsList } from './GameOptionsList.tsx'
import { GameHeader } from './GameHeader.tsx'
import { useSpeakText } from '../../hooks/useSpeakText.ts'
import ProgressBar from '../../components/progressBar/ProgressBar.tsx'

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

const AuditoryDiscriminationGame: React.FC = () => {
  // todo: possible to lift up state to parent
  const selectedTheme = useSelectedTheme()
  const navigate = useNavigate()
  const user = useUser()
  const { levels, isLoading, error: getLevelsError } = useGetGameLevels(selectedTheme!.id)
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [options, setOptions] = useState<LevelOption[]>([])
  // todo: all props need to be used
  const { mutate } = usePostAuditoryDiscriminationAnswer()
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
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [levels, currentLevel, speakText])

  // todo: save in LS to not redirect
  if (selectedTheme.id === -1) {
    navigate('/error', {
      state: {
        error: {
          message: 'No se seleccionó ningún juego!'
        }
      }
    })
    return
  }

  return !isLoading && !getLevelsError && levels && levels.length != 0 ? (
    <div className="w-full layout flex-col-center gap-4 px-10 md:px-40 lg:pt-20 pt-10">
      <ProgressBar currentActivity={currentLevel + 1} totalActivities={levels?.length} />
      <GameHeader level={levels[currentLevel]} headerTitle="Selecciona la imágen que empiece con la letra"></GameHeader>
      <GameOptionsList options={options} onOptionSelection={onOptionSelection} />
    </div>
  ) : (
    <SpinnerLoader />
  )
}

export default AuditoryDiscriminationGame
