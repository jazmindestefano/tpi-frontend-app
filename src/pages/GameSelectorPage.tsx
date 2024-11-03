import SnakeGameWrapper from '../../wrappers/SnakeGameWrapper.tsx'
import { useSelectedGame } from '../hooks/selectors.ts'
import AuditoryDiscriminationGame from './AuditoryDiscriminationGamePage.tsx'
import RecordGame from './RecordGamePage.tsx'

const gameMap: Record<number, React.FC> = {
  1: AuditoryDiscriminationGame,
  2: RecordGame,
  3: SnakeGameWrapper
}

const GameSelectorPage = () => {
  const selectedGame = useSelectedGame()
  const GameComponent = gameMap[selectedGame.id]
  return <GameComponent />
}

export default GameSelectorPage
