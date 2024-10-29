import { Game } from '../../../interfaces/interfaces'
import { BaseCard } from './BaseCard'
import { BaseContainer } from './BaseContainer'
import { HearableButton } from '../buttons/HearableButton.tsx'

interface HomeCardProps {
  buttonVariant: 'primary' | 'secondary' | 'tertiary' | 'fourth'
  backgroundColor: string
  onClick: () => void
  game: Game
}

const HomeCard: React.FC<HomeCardProps> = ({ buttonVariant, backgroundColor, onClick, game }) => {
  return (
    <BaseCard className={'flex flex-col justify-center items-center w-full gap-4 shadow-none'}>
      <BaseContainer
        className={`gap-6 ${backgroundColor} rounded-3xl p-6 transition-transform duration-300 transform hover:scale-105`}
      >
        <div onClick={onClick} className="flex flex-col justify-center items-center w-full">
          <img className="rounded-3xl object-cover size-96" src={game.image} alt={game.name} />
          <h1 className="text-h1" data-testid="home-card-name">
            {game.name.toUpperCase()}
          </h1>
        </div>
      </BaseContainer>
      <HearableButton
        variant={buttonVariant}
        text={game.name}
        className={'transition-transform duration-300 transform hover:scale-105 mt-2'}
      />
    </BaseCard>
  )
}

export default HomeCard
