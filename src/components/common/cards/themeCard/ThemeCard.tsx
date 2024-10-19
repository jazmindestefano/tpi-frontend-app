import { Theme } from '../../../../interfaces/interfaces.ts'

import { BaseCard } from '../BaseCard.tsx'
import { BaseContainer } from '../BaseContainer.tsx'
import { VolumeButton } from '../../buttons/VolumeButton.tsx'
import { useSpeakText } from '../../../../hooks/useSpeakText.ts'

interface ThemeCardProps {
  theme: Theme
  onClick: () => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onClick }) => {
  const speakText = useSpeakText()

  return (
    <BaseCard className={'bg-orange-200 p-4 flex-col-center'}>
      <BaseContainer className={'gap-6'}>
        <div onClick={onClick} className="w-full">
          <img
            className="rounded-3xl bg-[#F7F7F7] size-80 w-full p-4"
            src={`/themes/letras/${theme.name}.png`}
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
