import {ThemeCard} from "../common/cards/ThemeCard.tsx";
import {Theme} from "../../interfaces/interfaces.ts";

interface ThemeCardsListProps {
  themes: Theme[]
  onCardClick: (theme: Theme) => void
}

export const ThemeCardsList: React.FC<ThemeCardsListProps> = ({themes, onCardClick}) => {
  return (
    <div className={`grid gap-10 my-16 px-10 ${themes.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
      {themes.map((theme) => (
        <ThemeCard theme={theme} key={theme.id} onClick={() => onCardClick(theme)} />
      ))}
    </div>
  );
};