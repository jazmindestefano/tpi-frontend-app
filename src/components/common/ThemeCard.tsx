import {Theme} from "../../interfaces/interfaces.ts";
import React from "react";
import {CardBase} from "./CardBase.tsx";
import Button from "./Button.tsx";
import {Volume2} from "lucide-react";

interface ThemeCardProps  {
  theme: Theme
}

export const ThemeCard: React.FC<ThemeCardProps> = ({theme}) => {
  return (
    <CardBase
      inner={
      <Button size={"circleSize"} shape={"circle"} variant={"fifth"}>
        <Volume2 color="#ffffff" size={36}/>
      </Button>
    }
    >
      <img className="rounded-3xl" src={theme.image} alt={theme.name}/>
    </CardBase>
  )
}