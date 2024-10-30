import { useSelectedGame } from '../hooks/selectors.ts'
import AuditoryDiscriminationGame from './games/AuditoryDiscriminationGame.tsx'
import RecordGame from './games/RecordGame'
import { SnakeGameWrapper } from './games/snakeGame/SnakeGameWrapper.tsx'

const gameMap: Record<number, React.FC> = {
  1: AuditoryDiscriminationGame,
  2: RecordGame,
  3: SnakeGameWrapper
}

const GameSelector: React.FC = () => {
  const selectedGame = useSelectedGame()
  const GameComponent = gameMap[selectedGame.id]
  return <GameComponent />
}

export default GameSelector
