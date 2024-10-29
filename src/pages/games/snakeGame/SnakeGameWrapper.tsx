import SnakeGame from './SnakeGame.tsx'
import { useGetWordsByUserId } from '../../../hooks/queries.ts'
import { Navigate, useNavigate } from 'react-router-dom'
import SpinnerLoader from '../../../components/common/SpinnerLoader.tsx'
import localStorageManager from '../../../localStorage/localStorageManager.js'

const vowels = ['A', 'E', 'I', 'O', 'U']

export const SnakeGameWrapper: React.FC = () => {
  const selectedThemeId = localStorageManager.getItem('selectedThemeId')
  const patientId = localStorageManager.getItem('patientId')
  const { words, isLoading, error } = useGetWordsByUserId(patientId)
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
    <SnakeGame items={selectedThemeId === 10 ? vowels : words[0].syllables} />
  ) : null
}
