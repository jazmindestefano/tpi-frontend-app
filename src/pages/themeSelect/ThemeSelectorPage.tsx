import {useNavigate, useParams} from "react-router-dom";
import {ThemeCardsList} from "../../components/themeSelect/ThemeCardsList.tsx";
import {useGetThemesByGameId} from "../../hooks/queries.ts";
import {useDispatch} from "react-redux";
import {selectTheme} from "../../redux/store/themeSlice.ts";
import {Theme} from "../../interfaces/interfaces.ts";

const snakeThemes = [
  { id: 1, name: "Silabas", image: "Silabas" },
  { id: 2, name: "Vocales", image: "Vocales" },
];

export const ThemeSelectorPage = () => {
  const { gameId } = useParams();
  const { themes, isLoading, error } = useGetThemesByGameId(Number(gameId));
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const onCardClick = (theme: Theme) => {
    console.log(`card clickeada: ${theme.id}`)
    dispatch(selectTheme(theme))
    switch (gameId) {
      case "1":
        navigate(`/actividad/${gameId}`)
        break
      case "2":
        navigate(`/actividad/1`)
        break
      case "3":
        navigate(`/viborita`)
        break
      default:
        navigate(`/`)
    }
 
  }

  return (
    <>
      {gameId == "3" ? (
      <ThemeCardsList themes={snakeThemes} onCardClick={onCardClick} />
      ) : isLoading ? (
      <h1>Cargando...</h1>
      ) : themes && themes.length !== 0 && !error ? (
      <ThemeCardsList themes={themes} onCardClick={onCardClick} />
      ) : null}
    </>
  );
};
