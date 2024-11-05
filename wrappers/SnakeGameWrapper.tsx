import SpinnerLoader from '@/components/common/SpinnerLoader'
import { useGetWordsByUserId } from '@/hooks/queries'
import { useSelectedTheme, useUser } from '@/hooks/selectors'
import { SnakeGamePage } from '@/pages'
import { Navigate } from 'react-router-dom'

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const vowels = ['A', 'E', 'I', 'O', 'U']

const SnakeGameWrapper = () => {
  const selectedTheme = useSelectedTheme()
  const user = useUser()
  const { words, isLoading, error } = useGetWordsByUserId(user.id)

  return isLoading ? (
    <SpinnerLoader />
  ) : error ? (
    <Navigate to={'/'} />
  ) : words && words.length != 0 ? (
    <SnakeGamePage items={selectedTheme.id === 10 ? vowels : words[getRandomNumber(0, words.length)].syllables} />
  ) : null
}

export default SnakeGameWrapper
