import React from "react";
import { Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button.tsx";
import { useGetGames } from "../hooks/queries.ts";
import { speakText } from "../helpers/speakText.ts";
import { CardBase } from "../components/common/CardBase.tsx";

const classNameInner = "p-6 h-[441px]";
const classNameOuter = "p-6 gap-4";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { games, isLoading, error } = useGetGames();

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (!games || games.length === 0) {
    return <p>No games available</p>;
  }

  return games && games.length !== 0 && !error ? (
    <div className="w-full flex flex-col md:flex-row justify-around items-center px-24">
      <CardBase
        classNameInner={classNameInner + " bg-orange-300 "}
        classNameOuter={classNameOuter}
        outer={
          <Button
            size={"circle"}
            variant={"secondary"}
            shape={"circle"}
            onClick={() => speakText("Letras")}
          >
            <Volume2 className="text-white w-auto h-38" />
          </Button>
        }
      >
        <div
          onClick={() => navigate(`/actividad/${games![0].id}/tematicas`)}
          className="flex flex-col justify-center items-start"
        >
          <img
            src="/letras.svg"
            className="object-contain size-64 p-4"
            alt="Letras"
          />
          <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">
            {games![0].name.toUpperCase()}
          </h2>
        </div>
      </CardBase>
      <CardBase
        classNameInner={classNameInner + " bg-orange-150"}
        classNameOuter={classNameOuter}
        outer={
          <Button
            size={"circle"}
            variant={"secondary"}
            shape={"circle"}
            onClick={() => speakText("Palabras")}
          >
            <Volume2 color="white" />
          </Button>
        }
      >
        <div className="flex justify-center items-center">
              <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">
                {games![1].name.toUpperCase()}
              </h2>
            <img
              src="/palabras.svg"
              className="object-contain size-96"
              alt="Palabras"
            />
        </div>
      </CardBase>
      <CardBase
        classNameInner={classNameInner + " bg-blue-500"}
        classNameOuter={classNameOuter}
        outer={
          <Button
            size={"circle"}
            variant={"secondary"}
            shape={"circle"}
            onClick={() => speakText("Viborita")}
          >
            <Volume2 color="white" />
          </Button>
        }
      >
        <div className="flex justify-center items-center">
          <img
            src="/viborita.svg"
            className="object-contain size-96"
            alt="Viborita"
          />
          <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">
            VIBORITA
          </h2>
        </div>
      </CardBase>
    </div>
  ) : (
    <p>No games available</p>
  );
};

export default Home;
