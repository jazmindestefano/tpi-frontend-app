import SnakeGame from './SnakeGame.tsx'
import { useSelectedTheme, useUser } from '../../../hooks/selectors.ts'
import { useGetWordsByUserId } from '../../../hooks/queries.ts'
import { Navigate, useNavigate } from 'react-router-dom'
import SpinnerLoader from '../../../components/common/SpinnerLoader.tsx'

const vowels = ['A', 'E', 'I', 'O', 'U']

export const SnakeGameWrapper: React.FC = () => {
  const selectedTheme = useSelectedTheme()
  const user = useUser()
  const { words, isLoading, error } = useGetWordsByUserId(user.id)
  const navigate = useNavigate()

  // todo: create private routes to avoid checking this every fucking time
  if (user.id === -1 || selectedTheme.id === -1) {
    navigate('/')
  }

  return isLoading ? (
    <SpinnerLoader />
  ) : error ? (
    <Navigate to={'/'} />
  ) : words && words.length != 0 ? (
    <SnakeGame items={selectedTheme.id === 10 ? vowels : words[0].syllables} />
  ) : null
}
