import React from "react";
import {Volume2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import Button from "../components/common/Button.tsx";
import { useGetGames } from '../hooks/queries.ts';
import { speakText } from "../helpers/speakText.ts";
import { CardBase } from "../components/common/CardBase.tsx";

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { games, isLoading, error } = useGetGames();


  if (error) {
    return <p>Error</p>
  }

  if (isLoading) {
    return <h1>Cargando...</h1>
  }

  return (
    games && games.length !== 0 && !error ? (
      <div className="grid grid-cols-1 xl:grid-cols-3 w-full px-16 items-center">
        <div className="w-full flex justify-center items-center">
          <CardBase
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
            inner={
              <div>
                <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">{games![0].name}</h2>
              </div>
            }
          >
            <div onClick={() => navigate(`/actividad/${games![0].id}/tematicas`)}>
              <img
                src="/letras.svg"
                className="object-contain"
                alt="Letras"
              />
            </div>
          </CardBase>
        </div>
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <CardBase
          >
            <div className="flex">
                <img
                  src="/palabras.svg"
                  className="object-contain size-60"
                  alt="Palabras"
                />
                <h2 className="text-3xl font-medium font-comfortaa text-gray-800 text-left">PALABRAS</h2>
            </div>
          </CardBase>
          <Button
                size={"circle"}
                variant={"secondary"}
                shape={"circle"}
                onClick={() => speakText("Palabras")}
              >
                <Volume2 color="white" />
              </Button>
        </div>
        <div className="w-full flex justify-center items-center">
          <CardBase
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
            inner={
              <div>
                <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">VIBORITA</h2>
              </div>
            }
          >
            <img
              src="/viborita.svg"
              className="object-contain"
              alt="Viborita"
            />
          </CardBase>
        </div>
      </div>
    ) : (
      <p>No games available</p>
    )
  );
};

export default Home;
