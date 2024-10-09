import {useParams} from "react-router-dom";
import {ThemeCardsList} from "../../components/themeSelect/ThemeCardsList.tsx";
import {useGetThemesByGameId} from "../../hooks/queries.ts";
import {useDispatch} from "react-redux";
import {selectTheme} from "../../redux/store/themeSlice.ts";
import {Theme} from "../../interfaces/interfaces.ts";

export const ThemeSelect = () => {
  const { gameId } = useParams();
  const { themes, isLoading, error } = useGetThemesByGameId(Number(gameId));
  const dispatch = useDispatch();
  
  const onCardClick = (theme: Theme) => {
    dispatch(selectTheme(theme))
  }

  console.log(themes)

  return (
    isLoading ? <h1>Cargando...</h1> : 
      themes && themes.length !== 0 && !error ?
      <ThemeCardsList themes={themes} onCardClick={onCardClick}/> : null
  );
};
