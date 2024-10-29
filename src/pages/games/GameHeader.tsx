import { GameLevel } from '../../interfaces/interfaces.ts'
import { HearableButton } from '../../components/common/buttons/HearableButton.tsx'

interface GameHeaderProps {
  level: GameLevel
  headerTitle: string
}

export const GameHeader: React.FC<GameHeaderProps> = ({ level, headerTitle }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h2 className="text-h2 text-center">{headerTitle}</h2>
      <div className="flex justify-center items-center w-full gap-4">
        <p className="font-bold xl:text-7xl text-4xl">{level.description.toUpperCase()}</p>
        <HearableButton variant={'secondary'} text={`${headerTitle} ${level.description}`} />
      </div>
    </div>
  )
}
