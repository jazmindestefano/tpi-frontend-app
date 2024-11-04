import SnakeGameWrapper from '../../../wrappers/SnakeGameWrapper.tsx'
import { useSelectedGame } from '../../hooks/selectors.ts'
import AuditoryDiscriminationGame from './AuditoryDiscriminationGamePage.tsx'
import RecordGamePage from './RecordGamePage.tsx'

const gameMap: Record<number, React.FC> = {
  1: AuditoryDiscriminationGame,
  2: RecordGamePage,
  3: SnakeGameWrapper
}

const GameSelectorPage = () => {
  const selectedGame = useSelectedGame()
  const GameComponent = gameMap[selectedGame.id]
  return <GameComponent />
}

export default GameSelectorPage
