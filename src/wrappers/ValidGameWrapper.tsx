import { usePostPatientTime, useSelectedGame, useSelectedTheme, useGlobalTimer } from '@hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import { NOT_YET_ASSIGNED_NUM } from '@config'
import { FC, useEffect } from 'react'

const ValidGameWrapper: FC = () => {
  const game = useSelectedGame()
  const theme = useSelectedTheme()
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

  if (game.id === NOT_YET_ASSIGNED_NUM || theme.id === NOT_YET_ASSIGNED_NUM) {
    navigate('/')
    return
  }

  return <Outlet />
}

export default ValidGameWrapper
