import { useSelectedGame, useSelectedTheme } from '../hooks/selectors.ts'
import { Outlet, useNavigate } from 'react-router-dom'
import { NOT_YET_ASSIGNED_NUM } from '../config/constants.ts'

export const ValidGameWrapper: React.FC = () => {
  const game = useSelectedGame()
  const theme = useSelectedTheme()
  const navigate = useNavigate()

  if (game.id === NOT_YET_ASSIGNED_NUM || theme.id === NOT_YET_ASSIGNED_NUM) {
    navigate('/')
    return
  }
  return <Outlet />
}
