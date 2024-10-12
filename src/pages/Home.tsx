import React from "react";
import { Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../components/common/Button.tsx";
import { useGetGames } from "../hooks/queries.ts";
import { speakText } from "../helpers/speakText.ts";
import { CardBase } from "../components/common/CardBase.tsx";
import { selectGame } from '../redux/store/gameSelector.ts';

const classNameInner = "p-6 h-[441px]";
const classNameOuter = "p-6 gap-4";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { games, isLoading, error } = useGetGames();

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return games && games.length !== 0 && !error ? (
    <div className="w-full flex flex-col md:flex-row justify-around items-center px-24">
      {games.map((game, index) => (
        <CardBase
          key={game.id}
          classNameInner={`${classNameInner} ${index === 0 ? "bg-orange-300" : index === 1 ? "bg-orange-150" : "bg-blue-500"}`}
          classNameOuter={classNameOuter}
          outer={
            <Button
              size={"circle"}
              variant={"secondary"}
              shape={"circle"}
              onClick={() => speakText(game.name)}
            >
              <Volume2 color="white" />
            </Button>
          }
        >
          <div
            className="flex justify-center items-center"
            onClick={() => {
              dispatch(selectGame(game.id.toString()));
              navigate(`/actividad/${game.id}/tematicas`);
            }}
          >
            <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">
              {game.name.toUpperCase()}
            </h2>
          </div>
        </CardBase>
      ))}
    </div>
  ) : (
    <p>No games available</p>
  );
};

export default Home;
