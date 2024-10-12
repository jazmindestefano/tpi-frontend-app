import React from 'react';
import Button from '../buttons/Button';
import { Volume2 } from 'lucide-react';
import { Game } from '../../../interfaces/interfaces';
import { BaseCard } from './BaseCard';
import { BaseContainer } from './BaseContainer';
import { speakText } from '../../../helpers/speakText';

interface HomeCardProps {
    buttonVariant: 'primary' | 'secondary' | 'tertiary' | 'fourth';
    onClick: () => void;
    game: Game;
}

const HomeCard: React.FC<HomeCardProps> = ({ buttonVariant, onClick, game }) => {
    return (
    <BaseCard className={"flex flex-col justify-between items-center w-full gap-2 shadow-none"}>
        <BaseContainer className={"gap-6 bg-orange-200 rounded-3xl"}>
            <div onClick={onClick}>
                <img className="rounded-3xl object-cover h-64" src={`/viborita.svg`} alt={game.name}/>
                <h1 className="text-3xl font-bold text-center">{game.name}</h1>
            </div>
        </BaseContainer>
        <Button size="circle" shape="circle" variant={buttonVariant} onClick={() => speakText(game.name)}>
             <Volume2 />
        </Button>
    </BaseCard>
    );
};

export default HomeCard;