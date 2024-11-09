import { useEffect } from 'react'
import { Theme } from '../../../../interfaces/interfaces'
import { BaseCard } from '../BaseCard'
import { BaseContainer } from '../BaseContainer'
import { HearableButton } from '../../buttons/HearableButton.tsx'
import SpinnerLoader from '@components/common/SpinnerLoader.tsx'
import { useImageSkeleton } from '@hooks'

interface ThemeCardProps {
  theme: Theme
  onClick: () => void
  bgColor: string
  onImageLoad: () => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onClick, bgColor, onImageLoad }) => {
  const { imageLoaded, handleImageLoad } = useImageSkeleton({ totalImages: 1 })

  useEffect(() => {
    if (imageLoaded) {
      onImageLoad()
    }
  }, [imageLoaded, onImageLoad])

  return (
    <BaseCard className={`${imageLoaded && bgColor} p-4 flex flex-col justify-center items-center w-full`}>
      {!imageLoaded && <SpinnerLoader />}
      <BaseContainer className={`gap-6 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <div onClick={onClick} className="w-full">
          <div className="relative w-full h-80">
            <img
              className={`rounded-3xl bg-white object-contain p-4 transition-opacity duration-500 size-80`}
              src={theme.image}
              alt={theme.name}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <h3 className="text-h3">{theme.name.toUpperCase()}</h3>
          <HearableButton variant={'secondary'} text={theme.name} />
        </div>
      </BaseContainer>
    </BaseCard>
  )
}
