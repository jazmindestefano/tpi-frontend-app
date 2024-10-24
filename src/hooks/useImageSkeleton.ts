import { useState, useCallback } from 'react'

interface UseImageSkeletonProps {
  totalImages: number
  onAllImagesLoaded?: () => void
}

export const useImageSkeleton = ({ totalImages, onAllImagesLoaded }: UseImageSkeletonProps) => {
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
