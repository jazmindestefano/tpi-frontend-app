import React from "react";
import { Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button.tsx";

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="flex justify-center flex-col items-center">
        <Link to="/letras">
          <Card variant={"primary"} className="flex">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-2/3 flex items-center justify-center">
                <img
                  src="/letras.svg"
                  className="object-contain"
                  alt="Letras"
                />
              </div>

              <div className="w-1/3 p-4 flex flex-col justify-center items-center">
                <h2 className="text-lg font-poppins text-gray-800">Letras</h2>
                <p className="mt-2 text-gray-600 font-comfortaa text-center">
                  Esta es una descripción corta sobre la carta. Aquí puedes
                  añadir más detalles.
                </p>
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
          <Volume2 className="text-white w-auto h-38" />
        </Button>
      </div>

      <div className="flex justify-center flex-col items-center">
        <Link to="/palabras">
          <Card variant={"secondary"} className="flex">
            <div className="flex flex-row">
              <div className="w-1/3 p-4 flex flex-col justify-center">
                <h2 className="text-xl font-poppins text-gray-800">Palabras</h2>
                <p className="mt-2 text-gray-600 font-comfortaa">
                  Esta es una descripción corta sobre la carta. Aquí puedes
                  añadir más detalles.
                </p>
              </div>

              <div className="w-2/3">
                <img src="/palabras.svg" className="" alt="Palabras" />
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
          <Volume2 className="text-white w-auto h-38" />
        </Button>
      </div>

      <div className="flex justify-center flex-col items-center">
        <Link to="/viborita">
          <Card variant={"tertiary"} className="flex">
            <div className="flex flex-row">
              <div className="w-2/3">
                <img src="/viborita.svg" className="" alt="Snake Game" />
              </div>

              <div className="w-1/3 p-4 flex flex-col justify-center">
                <h2 className="text-xl font-poppins text-gray-800">Viborita</h2>
                <p className="mt-2 text-gray-600 font-comfortaa">
                  Esta es una descripción corta sobre la carta. Aquí puedes
                  añadir más detalles.
                </p>
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
          <Volume2 className="text-white w-auto h-38" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
