import { useEffect } from 'react'
import { useSpeakText } from '../../../../hooks/useSpeakText'
import { Theme } from '../../../../interfaces/interfaces'
import { VolumeButton } from '../../buttons/VolumeButton'
import { BaseCard } from '../BaseCard'
import { BaseContainer } from '../BaseContainer'
import { useImageSkeleton } from '../../../../hooks/useImageSkeleton'

interface ThemeCardProps {
  theme: Theme
  onClick: () => void
  bgColor: string
  onImageLoad: () => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onClick, bgColor, onImageLoad }) => {
  const { imageLoaded, handleImageLoad } = useImageSkeleton({ totalImages: 1 })
  const speakText = useSpeakText()

  useEffect(() => {
    if (imageLoaded) {
      onImageLoad()
    }
  }, [imageLoaded, onImageLoad])

  return (
    <BaseCard className={`${bgColor} p-4 flex-col-center`}>
      <BaseContainer className={'gap-6'}>
        <div onClick={onClick} className="w-full">
          <div className="relative w-full h-80">
            {!imageLoaded && (
              <div className="animate-pulse absolute inset-0">
                <div className="rounded-3xl bg-gray-300 w-full h-full" />
              </div>
            )}
            <img
              className={`rounded-3xl bg-white object-contain p-4 transition-opacity duration-500 size-80 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={theme.image}
              alt={theme.name}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <h3 className="text-h3">{theme.name.toUpperCase()}</h3>
          <VolumeButton variant={'secondary'} onClick={() => speakText(theme.name)} />
        </div>
      </BaseContainer>
    </BaseCard>
  )
}
