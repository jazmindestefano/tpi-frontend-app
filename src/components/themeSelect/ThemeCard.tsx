import Card from "../common/Card.tsx";
import Button from "../common/Button.tsx";
import {Theme} from "../../interfaces/interfaces.ts";
import { Volume2 } from "lucide-react";


interface ThemeCardProps {
  theme: Theme,
  onCardClick: () => void
}

export const ThemeCard: React.FC<ThemeCardProps> = ({theme, onCardClick}) => {
  console.log({theme})
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  return (
    <Card key={theme.id} className="bg-orange-200 flex flex-col justify-between max-w-96">
      <div className="w-full h-[280px] bg-[#F7F7F7] rounded-lg flex justify-center items-center cursor-pointer" onClick={onCardClick}>
        <img src={`/themes/letras/${theme.name}.png`} alt={theme.name} className="h-[250px]" />
      </div>
      <div className="flex justify-center w-full">
        <Button
                size={"circleSize"}
                shape={"circle"}
                variant={"fifth"}
                onClick={() =>
                  theme &&
                  speakText(
                    theme.name
                  )
                }
              >
                <Volume2 className="text-white w-auto h-38"/>
        </Button>
      </div>
    </Card>
  );
};