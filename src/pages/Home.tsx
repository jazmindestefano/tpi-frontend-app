import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetGames } from "../hooks/queries.ts";
import HomeCard from "../components/common/cards/HomeCard.tsx";
import SpinnerLoader from "../components/common/SpinnerLoader.tsx";
import { useDispatch } from "react-redux";
import { selectGame } from "../redux/store/gameSlice.ts";

const getCardBgColor = (index: number) => {
  const colors = ["bg-blue-300", "bg-orange-300", "bg-orange-150"];
  return colors[index % colors.length];
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { games, isLoading, error } = useGetGames();

  if (error) {
    return <h1>¡Ups! Parece que estamos teniendo un problema.</h1>;
  }

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return games && games.length !== 0 && !error ? (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-16 gap-10">
      {games.map((game) => (
        <div key={game.id} className="flex justify-center items-center w-full" onClick={() => dispatch(selectGame(game))}>
          <HomeCard
            buttonVariant="secondary"
            onClick={() => navigate(`/actividad/${game.id}/tematicas`)}
            game={game}
            backgroundColor={getCardBgColor(game.id)}
          />
        </div>
      ))}
    </div>
  ) : (
    <h1>No hay juegos disponibles</h1>
  );
};

export default Home;
