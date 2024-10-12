import React from 'react';
import Button from '../buttons/Button';
import { Game } from '../../../interfaces/interfaces';
import { BaseCard } from './BaseCard';
import { BaseContainer } from './BaseContainer';
import { speakText } from '../../../helpers/speakText';
import { VolumeIcon } from '../icons/Icons';

interface HomeCardProps {
    buttonVariant: 'primary' | 'secondary' | 'tertiary' | 'fourth';
    backgroundColor: string;
    onClick: () => void;
    game: Game;
}

const HomeCard: React.FC<HomeCardProps> = ({ buttonVariant, backgroundColor, onClick, game }) => {
    return (
    <BaseCard className={"flex flex-col justify-between items-center w-full gap-4 shadow-none"}>
        <BaseContainer className={`gap-6 ${backgroundColor} rounded-3xl p-6`}>
            <div onClick={onClick}>
                <img className="rounded-3xl object-cover size-96" src={`/${game.name.toUpperCase()}.png`} alt={game.name}/>
                <h1 className="text-3xl font-bold text-center">{game.name.toUpperCase()}</h1>
            </div>
        </BaseContainer>
        <Button size="circle" shape="circle" variant={buttonVariant} onClick={() => speakText(game.name)}>
            <VolumeIcon />
        </Button>
    </BaseCard>
    );
};

export default HomeCard;