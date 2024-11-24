import { useEffect } from 'react'

const useKeyboardControls = (setDirection: (dir: { x: number; y: number }) => void, togglePause: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        togglePause()
        return
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          e.preventDefault()
          setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          e.preventDefault()
          setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          e.preventDefault()
          setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [setDirection, togglePause])
}

export default useKeyboardControls
