import Button from "../common/Button.tsx";
import { Theme } from "../../interfaces/interfaces.ts";
import { Volume2 } from "lucide-react";
import { CardBase } from "../common/CardBase.tsx";

interface ThemeCardProps {
  theme: Theme;
  onCardClick: () => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onCardClick }) => {
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <CardBase
      classNameOuter="bg-orange-200 p-4"
      inner={
        <Button
          size={"circle"}
          shape={"circle"}
          variant={"secondary"}
          onClick={() => theme && speakText(theme.name)}
        >
          <Volume2 className="text-white w-auto h-38" />
        </Button>
      }
    >
      <div
        className="w-full h-[280px] bg-[#F7F7F7] rounded-lg flex justify-center items-center cursor-pointer mb-4"
        onClick={onCardClick}
      >
        <img
          src={`/themes/letras/${theme.name}.png`}
          alt={theme.name}
          className="h-[250px]"
        />
      </div>
    </CardBase>
  );
};
