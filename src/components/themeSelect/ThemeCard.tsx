import Card from "../common/Card.tsx";
import Button from "../common/Button.tsx";
import {Theme} from "../../interfaces/interfaces.ts";
import { Volume2 } from "lucide-react";


interface ThemeCardProps {
  theme: Theme,
  onCardClick: () => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({theme, onCardClick}) => {
  return (
    <Card key={theme.id} onClick={onCardClick} className="bg-orange-200 flex flex-col justify-between">
      <div className="w-full h-[280px] bg-slate-50 rounded-lg">
        <img src="/princesas.png" alt={theme.name} />
      </div>
      <div className="flex justify-center w-full">
        <Button
                size={"circleSize"}
                shape={"circle"}
                className="bg-orange-800"
              >
                <Volume2 className="text-white w-auto h-38"/>
        </Button>
      </div>
    </Card>
  );
};