import { usePostPatientTime, useGlobalTimer, useCurrentGame } from '@hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import { NOT_YET_ASSIGNED_NUM } from '@config'
import { FC, useEffect } from 'react'

const ValidGameWrapper: FC = () => {
  const { selectedTheme, selectedGame } = useCurrentGame()
  const navigate = useNavigate()
  const { startTimer, stopTimer, getStartTime, getElapsedTime } = useGlobalTimer()
  const { mutate } = usePostPatientTime()

  useEffect(() => {
    startTimer()
    return () => {
      if (getElapsedTime() !== 0) {
        mutate({ sessionStart: new Date(getStartTime()), sessionTime: getElapsedTime() })
      }
      stopTimer()
    }
  }, [getElapsedTime, getStartTime, mutate, startTimer, stopTimer])

  if (selectedTheme.id === NOT_YET_ASSIGNED_NUM || selectedGame.id === NOT_YET_ASSIGNED_NUM) {
    navigate('/')
    return
  }

  return <Outlet />
}

export default ValidGameWrapper
