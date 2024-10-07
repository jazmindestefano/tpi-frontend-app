// import { useState } from "react";
import {useParams} from "react-router-dom";
import {ThemeCardsList} from "../../components/themeSelect/ThemeCardsList.tsx";
import {useGetThemesByActivityId} from "../../hooks/queries.ts";

export const ThemeSelect = () => {
  const { activityId } = useParams();
  const {themes, isLoading, error} = useGetThemesByActivityId(Number(activityId));
  
  // const [choseThemeId, setChoseThemeId] = useState<number | undefined>();
  
  const onCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Card clicked", e)
    // cuando se guarde probablemente se guarde el id o el name de la card seleccionada en redux
  }

  return (
    isLoading ? <h1>Cargando...</h1> : 
      themes && themes.length !== 0 && !error ?
      <ThemeCardsList themes={themes} onCardClick={onCardClick}/> : null
  );
};
