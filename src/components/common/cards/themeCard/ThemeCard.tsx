import {Theme} from "../../../../interfaces/interfaces.ts";
import React from "react";
import {BaseCard} from "../BaseCard.tsx";
import Button from "../../buttons/Button.tsx";
import {BaseContainer} from "../BaseContainer.tsx";
import { speakText } from "../../../../helpers/speakText.ts";
import { VolumeIcon } from "../../icons/Icons.tsx";

interface ThemeCardProps  {
  theme: Theme,
  onClick: () => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({theme, onClick}) => {
  return (
    <BaseCard className={"bg-orange-200 p-4 flex flex-col justify-between items-center"}>
      <BaseContainer className={"gap-6"}>
        <div onClick={onClick} className="w-full">
          <img className="rounded-3xl bg-white size-80 w-full" src={`/themes/letras/${theme.name}.png`} alt={theme.name}/>
        </div>
        <Button size={"circle"} shape={"circle"} variant={"secondary"} onClick={() => speakText(theme.name)}>
          <VolumeIcon />
        </Button>
      </BaseContainer>
    </BaseCard>
  );
};