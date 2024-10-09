import React from "react";
import {Volume2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button.tsx";
import { useGetGames } from '../hooks/queries.ts';

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { games, isLoading, error } = useGetGames();

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    isLoading ? <h1>Cargando...</h1> : 
      games && games.length !== 0 && !error ?
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full px-10 my-16">
        <div className="flex justify-center flex-col items-center cursor-pointer w-full">
            <div className="flex justify-center flex-col items-center w-full">
            <Card variant={"primary"} onClick={() => navigate(`/actividad/${games![0].id}/tematicas`)} className={"flex flex-col"}>
                  <div className="basis-3/5 flex items-end justify-center">
                  <img
                    src="/letras.svg"
                    className="object-contain"
                    alt="Letras"
                  />
                  </div>
                  <div className="basis-2/5 flex items-end">
                  <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">{games![0].name.toUpperCase()}</h2>
                  </div>
                </Card>
            </div>
            <Button
                size={"circleSize"}
                variant={"fifth"}
                shape={"circle"}
                className="mt-3"
                onClick={() =>
                  games &&
                  speakText(
                    games[0].name
                  )
                }
              >
                <Volume2 className="text-white w-auto h-38"/>
              </Button>
        </div>
        <div className="flex justify-center flex-col items-center cursor-pointer w-full">
            <div className="flex justify-center flex-col items-center cursor-pointer w-full">
              <Card variant={"secondary"} className="flex" onClick={() => navigate(`/actividad/${games![1].id}/tematicas`)}>
                  <div className="flex flex-row">
                    <div className="w-1/3 p-4 flex flex-col justify-center">
                      <h2 className="text-4xl font-medium font-comfortaa text-gray-800 pb-36">{games![1].name.toUpperCase()}</h2>
                    </div>
                    <div className="w-2/3">
                      <img src="/palabras.svg" className="scale-100" alt="Palabras"/>
                    </div>
                  </div>
                </Card>
            </div>
            <Button
              size={"circleSize"}
              variant={"fifth"}
              shape={"circle"}
              className="mt-3"
              onClick={() =>
                games &&
                speakText(
                  games[1].name
                )
              }
            >
              <Volume2 className="text-white w-auto h-38"/>
            </Button>
        </div>
        <div className="flex justify-center flex-col items-center cursor-pointer w-full">
          <div className="flex justify-center flex-col items-center cursor-pointer w-full">
            <Card variant={"tertiary"} className="flex" onClick={() => navigate(`/actividad/${games![2].id}/tematicas`)}>
              <div className="flex flex-row">
                <div className="w-2/4">
                  <img src="/viborita.svg" className="h-full scale-95" alt="la viborita"/>
                </div>
                <div className="w-2/4 py-2 flex flex-col justify-center">
                  <h2 className="text-4xl font-medium font-comfortaa text-gray-800">{games![2].name.substring(0, 5).toUpperCase()} {games![2].name.substring(5).toUpperCase()}</h2>
                </div>
              </div>
            </Card>
          </div>
          <Button
            size={"circleSize"}
            variant={"fifth"}
            shape={"circle"}
            className="mt-3"
            onClick={() =>
              games &&
              speakText(
                games[2].name
              )
            }
          >
            <Volume2 className="text-white w-auto h-38"/>
          </Button>
        </div>
    </div> : <p>error</p>
  );
};

export default Home;
