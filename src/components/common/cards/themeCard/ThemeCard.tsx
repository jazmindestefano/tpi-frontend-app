import { useState, useEffect } from 'react'
import { useSpeakText } from '../../../../hooks/useSpeakText'
import { Theme } from '../../../../interfaces/interfaces'
import { VolumeButton } from '../../buttons/VolumeButton'
import { BaseCard } from '../BaseCard'
import { BaseContainer } from '../BaseContainer'

interface ThemeCardProps {
  theme: Theme
  onClick: () => void
  bgColor: string
  onImageLoad: () => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onClick, bgColor, onImageLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
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
              className={`rounded-3xl bg-white w-full h-full object-contain p-4 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              src={`themes/letras/${theme.name.toLowerCase()}.png`}
              alt={theme.name}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <h3 className="text-h3">{theme.name}</h3>
          <VolumeButton variant={'secondary'} onClick={() => speakText(theme.name)} />
        </div>
      </BaseContainer>
    </BaseCard>
  )
}
