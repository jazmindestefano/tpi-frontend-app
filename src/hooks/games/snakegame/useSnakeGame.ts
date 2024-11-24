import { useState, useEffect, useCallback } from 'react'

const useSnakeGame = (items: string[], gridSize: { width: number; height: number }) => {
  const [snake, setSnake] = useState([{ x: 7, y: 5 }])
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [item, setItem] = useState({ char: items[0], x: 10, y: 4 })
  const [eatenItems, setEatenItems] = useState<string[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [isGameFinished, setIsGameFinished] = useState(false)

  const togglePause = useCallback(() => setIsPaused((prev) => !prev), [])

  useEffect(() => {
    if (isPaused) return

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

          const remainingItems = items.filter((v) => !updatedEatenItems.includes(v))

          if (remainingItems.length > 0) {
            setItem({
              char: remainingItems[Math.floor(Math.random() * remainingItems.length)],
              x: Math.floor(Math.random() * gridSize.width),
              y: Math.floor(Math.random() * gridSize.height)
            })
          } else {
            setIsGameFinished(true)
          }
        } else {
          newSnake = newSnake.slice(0, -1)
        }

        return newSnake
      })
    }, 500)

    return () => clearInterval(gameLoop)
  }, [isPaused, direction, item, gridSize, items, eatenItems])

  return {
    snake,
    direction,
    setDirection,
    item,
    eatenItems,
    isPaused,
    isGameFinished,
    togglePause
  }
}

export default useSnakeGame
