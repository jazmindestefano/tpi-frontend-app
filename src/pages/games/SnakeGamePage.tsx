import { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button, HearableButton, RecordButton, ContinueIcon } from '@components'
import { useCurrentGame } from '@hooks'
import useSnakeGame from '@hooks/games/useSnakeGame.ts'

interface SnakeGameProps {
  items: string[]
  cellSize?: number
}

const SnakeGamePage: FC<SnakeGameProps> = ({ items, cellSize = 65 }) => {
  const {
    snake,
    item,
    eatenItems,
    gridSize,
    isPaused,
    showBigItem,
    togglePause,
    startRecording,
    stopRecording,
    isRecording,
    handlePause
  } = useSnakeGame({ items })

  const { selectedTheme } = useCurrentGame()
  const displayText = selectedTheme.id === 10 ? 'Vocales comidas' : 'Sílabas comidas'

  return (
    <div className="flex flex-col items-center justify-center h-full mt-6 w-full">
      <div className="mt-4 text-2xl font-bold text-purple-800">
        {displayText}: {eatenItems.join(', ')}
      </div>
      <div className="mt-2 mb-4 text-sm text-purple-600">Presiona espacio para pausar/reanudar</div>
      <div
        className="relative rounded-lg shadow-lg overflow-hidden"
        style={{
          width: `${gridSize.width * cellSize}px`,
          height: `${gridSize.height * cellSize}px`,
          background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
        }}
      >
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            className="absolute rounded-sm"
            style={{
              width: `${cellSize - 2}px`,
              height: `${cellSize - 2}px`,
              left: `${segment.x * cellSize + 1}px`,
              top: `${segment.y * cellSize + 1}px`,
              background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {index === 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full mr-1" />
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>
            )}
          </motion.div>
        ))}
        <motion.div
          className="absolute rounded-full flex items-center justify-center text-white font-bold"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${item.x * cellSize}px`,
            top: `${item.y * cellSize}px`,
            background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {item.char}
        </motion.div>
        {isPaused && !showBigItem && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-4xl font-bold">PAUSADO</div>
          </div>
        )}
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

      <AnimatePresence>
        {showBigItem && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-9xl font-bold text-white mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {eatenItems[eatenItems.length - 1]}
            </motion.div>
            <div className="flex space-x-4">
              <RecordButton
                variant={'fourth'}
                isRecording={isRecording}
                stopRecording={stopRecording}
                startRecording={startRecording}
              />
              <HearableButton text={eatenItems[eatenItems.length - 1]} />
              <Button variant="primary" size="circle" shape={'circle'} onClick={handlePause}>
                <ContinueIcon />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SnakeGamePage
