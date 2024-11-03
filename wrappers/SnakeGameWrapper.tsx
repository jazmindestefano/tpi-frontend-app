import SpinnerLoader from '@/components/common/SpinnerLoader'
import { useGetWordsByUserId } from '@/hooks/queries'
import { useSelectedTheme, useUser } from '@/hooks/selectors'
import { useNavigate, Navigate } from 'react-router-dom'
import SnakeGame from '../src/pages/SnakeGamePage'

const vowels = ['A', 'E', 'I', 'O', 'U']

const SnakeGameWrapper = () => {
  const selectedTheme = useSelectedTheme()
  const user = useUser()
  const { words, isLoading, error } = useGetWordsByUserId(user.id)
  const navigate = useNavigate()

  // todo: create private routes to avoid checking this every fucking time
  if (error) {
    navigate('/error')
  }

  return isLoading ? (
    <SpinnerLoader />
  ) : error ? (
    <Navigate to={'/'} />
  ) : words && words.length != 0 ? (
    <SnakeGame items={selectedTheme.id === 10 ? vowels : words[0].syllables} />
  ) : null
}

export default SnakeGameWrapper
