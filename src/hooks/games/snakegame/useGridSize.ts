import { useState, useEffect } from 'react'

const useGridSize = () => {
  const [gridSize, setGridSize] = useState({ width: 30, height: 9 })

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

  return gridSize
}

export default useGridSize
