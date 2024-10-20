import Button from '../buttons/Button'
import { Game } from '../../../interfaces/interfaces'
import { BaseCard } from './BaseCard'
import { BaseContainer } from './BaseContainer'
import { VolumeIcon } from '../icons/Icons'
import { useSpeakText } from '../../../hooks/useSpeakText.ts'

interface HomeCardProps {
  buttonVariant: 'primary' | 'secondary' | 'tertiary' | 'fourth'
  backgroundColor: string
  onClick: () => void
  game: Game
}

const HomeCard: React.FC<HomeCardProps> = ({ buttonVariant, backgroundColor, onClick, game }) => {
  const speakText = useSpeakText()

  return (
    <BaseCard className={'flex-col-center gap-4 shadow-none'}>
      <BaseContainer
        className={`gap-6 ${backgroundColor} rounded-3xl p-6 transition-transform duration-300 transform hover:scale-105`}
      >
        <div onClick={onClick} className="flex-col-center">
          <img
            className="rounded-3xl object-cover size-96"
            src={game.image}
            alt={game.name}
          />
          <h1 className="text-h1" data-testid="home-card-name">
            {game.name.toUpperCase()}
          </h1>
        </div>
      </BaseContainer>
      <Button
        className="transition-transform duration-300 transform hover:scale-105 mt-2"
        size="circle"
        shape="circle"
        variant={buttonVariant}
        onClick={() => speakText(game.name)}
      >
        <VolumeIcon />
      </Button>
    </BaseCard>
  )
}

export default HomeCard
