import { useCallback, useEffect, useState } from 'react'
import { useAudioRecording, useCurrentGame, useCurrentUser, usePostUserRecording, useTextToSpeech } from '@hooks'
import { useNavigate } from 'react-router-dom'

interface SnakeGameProps {
  items: string[]
  cellSize?: number
}

const useSnakeGame = ({ items }: SnakeGameProps) => {
  const [snake, setSnake] = useState([{ x: 7, y: 5 }])
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [item, setItem] = useState({ char: items[0], x: 10, y: 4 })
  const [eatenItems, setEatenItems] = useState<string[]>([])
  const [showBigItem, setShowBigItem] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [gridSize, setGridSize] = useState({ width: 30, height: 9 })
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  const { isLoading, playAudio } = useTextToSpeech({ text: item.char })
  const { isRecording, audio, startRecording, stopRecording } = useAudioRecording()
  const { mutate } = usePostUserRecording()
  const user = useCurrentUser()
  const navigate = useNavigate()
  const { selectedGame } = useCurrentGame()

  useEffect(() => {
    if (audio && !isRecording) {
      console.log(item.char)
      mutate({
        userId: user.id,
        gameId: selectedGame.id,
        activityId: 0,
        userAudio: audio,
        text: item.char ?? ''
      })
    }
  }, [audio, selectedGame, isRecording, mutate, user, item.char])

  const togglePause = useCallback(() => {
    if (!showBigItem) {
      setIsPaused((prev) => !prev)
    }
  }, [showBigItem])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        togglePause()
        return
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      if (isPaused) return

      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPaused, togglePause])

  useEffect(() => {
    if (isPaused) return

    if (eatenItems.length === items.length) {
      setIsGameFinished(true)
      return
    }

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: (prevSnake[0].x + direction.x + gridSize.width) % gridSize.width,
          y: (prevSnake[0].y + direction.y + gridSize.height) % gridSize.height
        }

        let newSnake = [newHead, ...prevSnake]

        if (newHead.x === item.x && newHead.y === item.y) {
          const updatedEatenItems = [...eatenItems, item.char]
          setEatenItems(updatedEatenItems)

          setShowBigItem(true)
          setIsPaused(true)

          if (!isLoading) playAudio()
          const remainingItems = items.filter((v) => !updatedEatenItems.includes(v))

          if (remainingItems.length > 0) {
            setItem({
              char: remainingItems[Math.floor(Math.random() * remainingItems.length)],
              x: Math.floor(Math.random() * gridSize.width),
              y: Math.floor(Math.random() * gridSize.height)
            })
          }
        } else {
          newSnake = newSnake.slice(0, -1)
        }
        return newSnake
      })
    }, 500)

    return () => clearInterval(gameLoop)
  }, [isLoading, playAudio, snake, direction, item, isPaused, gridSize, eatenItems, items])

  useEffect(() => {
    if (isGameFinished) {
      setTimeout(() => navigate('/felicitaciones'), 1000)
    }
  }, [isGameFinished, navigate])

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth

      if (width > 1024) {
        setGridSize({ width: 30, height: 9 })
      } else if (width > 768) {
        setGridSize({ width: 20, height: 7 })
      } else {
        setGridSize({ width: 10, height: 5 })
      }
    }

    window.addEventListener('resize', updateGridSize)
    updateGridSize()

    return () => window.removeEventListener('resize', updateGridSize)
  }, [])

  useEffect(() => {
    if (showBigItem) {
      const timer = setTimeout(() => {
        setShowBigItem(false)
        setIsPaused(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showBigItem])

  const handlePause = () => {
    setShowBigItem(false)
    setIsPaused(false)
  }

  return {
    snake,
    direction,
    item,
    eatenItems,
    gridSize,
    isPaused,
    showBigItem,
    togglePause,
    startRecording,
    stopRecording,
    isRecording,
    isGameFinished,
    handlePause
  }
}

export default useSnakeGame
