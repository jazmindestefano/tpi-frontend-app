import React from "react";
import {Volume2} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button.tsx";
import { useGetGames } from '../hooks/queries.ts';

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { games } = useGetGames();

  console.log({games});

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
      <div className="flex justify-center flex-col items-center">
        <div className="flex flex-col flex-nowrap items-center">
            <Card variant={"primary"} onClick={() => navigate("/letras")} className={"flex flex-col"}>
              <div className="basis-3/5 flex items-end justify-center">
                <img
                  src="/letras.svg"
                  className="object-contain"
                  alt="Letras"
                />
              </div>
              <div className="basis-2/5 flex items-end">
                <h2 className="text-4xl font-medium font-comfortaa text-gray-800 text-left">LETRAS</h2>
              </div>
            </Card>
          <Button
              size={"circleSize"}
              variant={"fifth"}
              shape={"circle"}
              className="mt-3"
            >
              <Volume2 className="text-white w-auto h-38"/>
            </Button>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center">
        <Link to="/palabras">
          <Card variant={"secondary"} className="flex">
            <div className="flex flex-row">
              <div className="w-1/3 p-4 flex flex-col justify-center">
                <h2 className="text-4xl font-medium font-comfortaa text-gray-800 pb-36">PALABRAS</h2>
              </div>
              <div className="w-2/3">
                <img src="/palabras.svg" className="scale-110" alt="Palabras"/>
              </div>
            </div>
          </Card>
        </Link>
        <Button
          size={"circleSize"}
          variant={"fifth"}
          shape={"circle"}
          className="mt-3"
        >
          <Volume2 className="text-white w-auto h-38"/>
        </Button>
      </div>
      <div className="flex justify-center flex-col items-center">
        <Link to="/viborita">
          <Card variant={"tertiary"} className="flex">
            <div className="flex flex-row">
              <div className="w-2/4">
                <img src="/viborita.svg" className="h-full scale-95" alt="la viborita"/>
              </div>
              <div className="w-2/4 py-2 flex flex-col justify-center">
                <h2 className="text-4xl font-medium font-comfortaa text-gray-800">LA VIBORITA</h2>
              </div>
            </div>
          </Card>
        </Link>
        <Button
          size={"circleSize"}
          variant={"fifth"}
          shape={"circle"}
          className="mt-3"
        >
          <Volume2 className="text-white w-auto h-38"/>
        </Button>
      </div>
    </div>
  );
};

export default Home;
