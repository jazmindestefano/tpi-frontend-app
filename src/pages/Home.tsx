import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetGames } from "../hooks/queries.ts";
import HomeCard from "../components/common/cards/HomeCard.tsx";
import SpinnerLoader from "../components/common/SpinnerLoader.tsx";

const getCardBgColor = (index: number) => {
  const colors = ["bg-blue-300", "bg-orange-300", "bg-orange-150"];
  return colors[index % colors.length];
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { games, isLoading, error } = useGetGames();

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return games && games.length !== 0 && !error ? (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-16 gap-10">
      {games.map((game) => (
        <div key={game.id} className="flex justify-center items-center w-full">
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
    <p>No games available</p>
  );
};

export default Home;
