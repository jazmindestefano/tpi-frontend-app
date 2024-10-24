import { VolumeButton } from '../../components/common/buttons/VolumeButton.tsx'
import { GameLevel } from '../../interfaces/interfaces.ts'
import { useSpeakText } from '../../hooks/useSpeakText.ts'

interface GameHeaderProps {
  level: GameLevel
  headerTitle: string
}

export const GameHeader: React.FC<GameHeaderProps> = ({ level, headerTitle }) => {
  const speakText = useSpeakText()
  console.log('me renderizo')
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h2 className="text-h2 text-center">{headerTitle}</h2>
      <div className="flex-center gap-4">
        <p className="font-bold xl:text-7xl text-4xl">{level.description.toUpperCase()}</p>
        <VolumeButton variant={'secondary'} onClick={() => speakText(`${headerTitle} ${level.description}`)} />
      </div>
    </div>
  )
}
