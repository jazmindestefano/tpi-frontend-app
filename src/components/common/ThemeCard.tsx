import {Theme} from "../../interfaces/interfaces.ts";
import React from "react";
import {BaseCard} from "./BaseCard.tsx";
import Button from "./Button.tsx";
import {Volume2} from "lucide-react";
import {BaseContainer} from "./BaseContainer.tsx";

interface ThemeCardProps  {
  theme: Theme
}

export const ThemeCard: React.FC<ThemeCardProps> = ({theme}) => {
  return (
    <BaseCard className={"bg-orange-100 p-4"}>
      <BaseContainer className={"gap-6"}>
        <div>
          <img className="rounded-3xl object-cover" src={theme.image} alt={theme.name}/>
        </div>
        <Button size={"circle"} shape={"circle"} variant={"secondary"}>
          <Volume2 color="#ffffff" size={36}/>
        </Button>
      </BaseContainer>
    </BaseCard>
  );
};