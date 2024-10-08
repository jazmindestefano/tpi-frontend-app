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

const palabrasThemes = [
  { id: 2, name: "Banio", image: "Banio" },
  { id: 2, name: "Patio", image: "Patio" },
  { id: 2, name: "Cocina", image: "Cocina" },
];

export const ThemeSelectorPage = () => {
  const { gameId } = useParams();
  const { themes, isLoading, error } = useGetThemesByGameId(Number(gameId));
  const dispatch = useDispatch();
  const navigate = useNavigate()

  console.log({gameId})
  
  const onCardClick = (theme: Theme) => {
    console.log(`card clickeada: ${theme.id}`)
    dispatch(selectTheme(theme))
    switch (gameId) {
      case "1":
        navigate(`/actividad/${gameId}`)
        break
      case "2":
        navigate(`/actividad/${gameId}`)
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
      ) : gameId == "2" ? (
        <ThemeCardsList themes={palabrasThemes} onCardClick={onCardClick} />
      ) : isLoading ? (
        <h1>Cargando...</h1>
      ) : themes && themes.length !== 0 && !error ? (
        <ThemeCardsList themes={themes} onCardClick={onCardClick} />
      ) : null}
    </>
  );
};
