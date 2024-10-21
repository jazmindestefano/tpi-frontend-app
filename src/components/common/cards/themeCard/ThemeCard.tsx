import { useSpeakText } from '../../../../hooks/useSpeakText'
import { Theme } from '../../../../interfaces/interfaces'
import { VolumeButton } from '../../buttons/VolumeButton'
import { BaseCard } from '../BaseCard'
import { BaseContainer } from '../BaseContainer'

interface ThemeCardProps {
  theme: Theme
  onClick: () => void
  bgColor: string
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onClick, bgColor }) => {
  const speakText = useSpeakText()
  var imageName = theme.name.toLowerCase().replace(" ", "_").replace("ñ", "ni");

  return (
    <BaseCard className={`${bgColor} p-4 flex-col-center`}>
      <BaseContainer className={'gap-6'}>
        <div onClick={onClick} className="w-full">
          
          <img
            className="rounded-3xl bg-white size-80 w-full p-4"
            src={`/themes/letras/${imageName}.png`}
            alt={theme.name}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <h3 className="text-h3">{theme.name}</h3>
          <VolumeButton variant={'secondary'} onClick={() => speakText(theme.name)} />
        </div>
      </BaseContainer>
    </BaseCard>
  )
}
