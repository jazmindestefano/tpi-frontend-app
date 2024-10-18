import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedTheme } from "../hooks/selectors";
import AuditoryDiscriminationGame from "./games/AuditoryDiscriminationGame.tsx";
import RecordGame from "./games/RecordGame";
import VowelSnakeGame from "./games/SnakeGame";

const GameSelector: React.FC = () => {
  const navigate = useNavigate()
  const selectedTheme = useSelectedTheme()

  useEffect(() => {
    if (!selectedTheme) {
      navigate('/error');
      return;
    }
  })

  let GameComponent;

  switch (selectedTheme!.id) {
    case 1:
      GameComponent = AuditoryDiscriminationGame;
      break;
    case 2:
      GameComponent = RecordGame;
      break;
    case 3:
      GameComponent = VowelSnakeGame;
      break;
    default:
      navigate('/error');
      return null;
  }

  return (
    <GameComponent selectedThemeId={selectedTheme!.id}/>
  );
};

export default GameSelector;
