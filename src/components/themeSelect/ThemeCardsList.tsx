import {ThemeCard} from "./ThemeCard.tsx";
import {Theme} from "../../interfaces/interfaces.ts";

interface ThemeCardsListProps {
  themes: Theme[]
  onCardClick: (theme: Theme) => void
}

export const ThemeCardsList: React.FC<ThemeCardsListProps> = ({themes, onCardClick}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 my-16">
      {themes.map((theme) => (
      <ThemeCard theme={theme} key={theme.id} onCardClick={() => onCardClick(theme)}/>
      ))}
    </div>
  );
};