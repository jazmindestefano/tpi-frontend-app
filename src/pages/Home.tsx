import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetGames } from "../hooks/queries.ts";
import HomeCard from "../components/common/cards/HomeCard.tsx";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { games, isLoading, error } = useGetGames();

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return games && games.length !== 0 && !error ? (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-16">
      {games.map((game) => (
      <div key={game.id} className="flex justify-center items-center w-full">
      <HomeCard
        buttonVariant="secondary"
        onClick={() => navigate(`/actividad/${game.id}/tematicas`)}
        game={game}
      />
      </div>
      ))}
    </div>
  ) : (
    <p>No games available</p>
  );
};

export default Home;
