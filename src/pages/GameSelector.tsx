import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelectedGame } from '../hooks/selectors'
import AuditoryDiscriminationGame from './games/AuditoryDiscriminationGame.tsx'
import RecordGame from './games/RecordGame'
import { SnakeGameWrapper } from './games/snakeGame/SnakeGameWrapper.tsx'

const gameMap: Record<number, React.FC> = {
  1: AuditoryDiscriminationGame,
  2: RecordGame,
  3: SnakeGameWrapper
}

const GameSelector: React.FC = () => {
  const navigate = useNavigate()
  const selectedGame = useSelectedGame()

  useEffect(() => {
    if (selectedGame.id === -1) {
      navigate('/error')
      return
    }
  })
  const GameComponent = gameMap[selectedGame.id]
  return <GameComponent />
}

export default GameSelector
