import {Theme} from "../../../../interfaces/interfaces.ts";
import React from "react";
import {BaseCard} from "../BaseCard.tsx";
import Button from "../../buttons/Button.tsx";
import {Volume2} from "lucide-react";
import {BaseContainer} from "../BaseContainer.tsx";
import { speakText } from "../../../../helpers/speakText.ts";

interface ThemeCardProps  {
  theme: Theme,
  onClick: () => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({theme, onClick}) => {
  return (
    <BaseCard className={"bg-orange-200 p-4 flex flex-col justify-between items-center"}>
      <BaseContainer className={"gap-6"}>
        <div onClick={onClick}>
          <img className="rounded-3xl object-cover h-64 bg-white" src={`/themes/letras/${theme.name}.png`} alt={theme.name}/>
        </div>
        <Button size={"circle"} shape={"circle"} variant={"secondary"} onClick={() => speakText(theme.name)}>
          <Volume2 color="#ffffff" size={36}/>
        </Button>
      </BaseContainer>
    </BaseCard>
  );
};