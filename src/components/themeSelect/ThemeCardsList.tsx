import {ThemeCard} from "../common/cards/themeCard/ThemeCard.tsx";
import {Theme} from "../../interfaces/interfaces.ts";
import { getJustifyClass } from "../../helpers/justifyClass.ts";

interface ThemeCardsListProps {
  themes: Theme[]
  onCardClick: (theme: Theme) => void
}

export const ThemeCardsList: React.FC<ThemeCardsListProps> = ({ themes, onCardClick }) => {
  return (
    <div
      className={`grid w-full gap-y-10 pb-10 ${
        themes.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
      }`}
    >
      {themes.map((theme, index) => (
        <div
          className={`flex ${getJustifyClass(index)}`}
          key={theme.id}
        >
          <ThemeCard theme={theme} onClick={() => onCardClick(theme)} />
        </div>
      ))}
    </div>
  );
};


