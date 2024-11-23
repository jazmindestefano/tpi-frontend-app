import { Loader } from '@components'
import { useGetWordsByUserId, useSelectedTheme, useUser } from '@hooks'
import { SnakeGamePage } from '@pages'
import { Navigate } from 'react-router-dom'
import { FC } from 'react'

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const vowels = ['A', 'E', 'I', 'O', 'U']

const SnakeGameWrapper: FC = () => {
  const selectedTheme = useSelectedTheme()
  const user = useUser()
  const { words, isLoading, error } = useGetWordsByUserId(user.id)

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Navigate to={'/'} />
  ) : words && words.length != 0 ? (
    <SnakeGamePage items={selectedTheme.id === 10 ? vowels : words[getRandomNumber(0, words.length)].syllables} />
  ) : null
}

export default SnakeGameWrapper
