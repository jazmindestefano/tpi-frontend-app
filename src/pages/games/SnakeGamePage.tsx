import { FC, useEffect } from 'react'
import { useSnakeGame, useGridSize, useKeyboardControls } from '../../hooks/games/snakegame'
import { useNavigate } from 'react-router-dom'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { Button } from '@components'

interface SnakeGameProps {
  items: string[]
  cellSize?: number
}

const SnakeGamePage: FC<SnakeGameProps> = ({ items, cellSize = 65 }) => {
  const navigate = useNavigate()
  const gridSize = useGridSize()
  const { snake, setDirection, item, eatenItems, isPaused, isGameFinished, togglePause } = useSnakeGame(items, gridSize)

  useKeyboardControls(setDirection, togglePause)

  useEffect(() => {
    if (isGameFinished) {
      setTimeout(() => navigate('/felicitaciones'))
    }
  }, [isGameFinished, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-full mt-6 w-full">
      {isPaused && (
        <div className="absolute z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4 rounded">
          <h2 className="text-2xl font-bold text-white">Juego pausado</h2>
        </div>
      )}

      <div className="mt-4 text-2xl font-bold text-purple-800">Vocales comidas: {eatenItems.join(', ')}</div>

      <div
        className="relative rounded-lg shadow-lg overflow-hidden"
        style={{
          width: `${gridSize.width * cellSize}px`,
          height: `${gridSize.height * cellSize}px`,
          background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute rounded-sm"
            style={{
              width: `${cellSize - 2}px`,
              height: `${cellSize - 2}px`,
              left: `${segment.x * cellSize + 1}px`,
              top: `${segment.y * cellSize + 1}px`,
              background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 100%)'
            }}
          />
        ))}
        <div
          className="absolute rounded-full flex items-center justify-center text-white font-bold"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${item.x * cellSize}px`,
            top: `${item.y * cellSize}px`,
            background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)'
          }}
        >
          {item.char}
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        {['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].map((key) => (
          <Button
            key={key}
            variant="secondary"
            size="circle"
            onClick={() => {
              if (!isPaused) {
                const event = new KeyboardEvent('keydown', { key })
                window.dispatchEvent(event)
              }
            }}
            aria-label={`Move ${key.replace('Arrow', '').toLowerCase()}`}
          >
            {key === 'ArrowUp' && <ChevronUp />}
            {key === 'ArrowDown' && <ChevronDown />}
            {key === 'ArrowLeft' && <ChevronLeft />}
            {key === 'ArrowRight' && <ChevronRight />}
          </Button>
        ))}
        <Button
          variant="secondary"
          size="circle"
          onClick={togglePause}
          aria-label={isPaused ? 'Resume game' : 'Pause game'}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      </div>
    </div>
  )
}

export default SnakeGamePage
