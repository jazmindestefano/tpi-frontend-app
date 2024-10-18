import { ThemeCard } from "../common/cards/themeCard/ThemeCard.tsx";
import { Theme } from "../../interfaces/interfaces.ts";
import { getJustifyClass } from "../../helpers/styles.ts";

interface ThemeCardsListProps {
  themes: Theme[];
  onCardClick: (theme: Theme) => void;
}

export const ThemeCardsList: React.FC<ThemeCardsListProps> = ({
  themes = [],
  onCardClick,
}) => {
  if (!Array.isArray(themes) || themes.length === 0) {
    return <p>No hay temas disponibles</p>;
  }

  return (
    <div className="flex flex-wrap justify-center w-full gap-y-10 pb-10 px-5">
      {themes.map((theme, index) => (
        <div
          className={`flex justify-center sm:${getJustifyClass(index)} w-full sm:w-1/3`}
          key={theme.id}
        >
          <ThemeCard theme={theme} onClick={() => onCardClick(theme)} />
        </div>
      ))}
    </div>
  );
};


