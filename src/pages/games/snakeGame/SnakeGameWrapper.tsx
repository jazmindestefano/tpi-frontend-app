import SnakeGame from './SnakeGame.tsx'
import { useSelectedTheme, useUser } from '../../../hooks/selectors.ts'
import { useGetWordsByUserId } from '../../../hooks/queries.ts'
import { Navigate } from 'react-router-dom'
import SpinnerLoader from '../../../components/common/SpinnerLoader.tsx'

const vowels = ['A', 'E', 'I', 'O', 'U']

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const SnakeGameWrapper: React.FC = () => {
  const selectedTheme = useSelectedTheme()
  const user = useUser()
  const { words, isLoading, error } = useGetWordsByUserId(user.id)

  return isLoading ? (
    <SpinnerLoader />
  ) : error ? (
    <Navigate to={'/'} />
  ) : words && words.length != 0 ? (
    <SnakeGame items={selectedTheme.id === 10 ? vowels : words[getRandomNumber(0, words.length)].syllables} />
  ) : null
}
