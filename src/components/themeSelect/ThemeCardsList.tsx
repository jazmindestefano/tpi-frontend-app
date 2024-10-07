import {ThemeCard} from "./ThemeCard.tsx";
import {Theme} from "../../interfaces/interfaces.ts";

interface ThemeCardsListProps {
  themes: Theme[]
  onCardClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const ThemeCardsList: React.FC<ThemeCardsListProps> = ({themes, onCardClick}) => {
  return (
    <div className="flex flex-grow flex-wrap flex-row gap-4 justify-center items-start">
      {themes.map((theme) => (
        <ThemeCard theme={theme} key={theme.id} onCardClick={onCardClick}/>
      ))}
    </div>
  );
};