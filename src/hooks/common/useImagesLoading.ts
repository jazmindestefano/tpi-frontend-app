import { useState, useCallback } from 'react'

interface useImagesLoadingProps {
  totalImages: number
  onAllImagesLoaded?: () => void
}

const useImagesLoading = ({ totalImages, onAllImagesLoaded }: useImagesLoadingProps) => {
  const [loadedImages, setLoadedImages] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = useCallback(() => {
    setLoadedImages((prev) => {
      const newCount = prev + 1
      if (newCount === totalImages && onAllImagesLoaded) {
        onAllImagesLoaded()
      }
      return newCount
    })
    setImageLoaded(true)
  }, [totalImages, onAllImagesLoaded])

  return { imageLoaded, handleImageLoad, loadedImages }
}

export default useImagesLoading