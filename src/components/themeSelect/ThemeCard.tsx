import Card from "../common/Card.tsx";
import Button from "../common/Button.tsx";
import {Theme} from "../../interfaces/interfaces.ts";


interface ThemeCardProps {
  theme: Theme,
  onCardClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({theme, onCardClick}) => {
  return (
    <Card key={theme.id} className="flex-grow-0 flex-shrink-0 theme-card-basis" onClick={onCardClick}>
      <div className="w-full h-[300px] bg-slate-50">
        Lugar para imagen...
      </div>
      {theme.name}
      <Button>Elegir</Button>
    </Card>
  );
};