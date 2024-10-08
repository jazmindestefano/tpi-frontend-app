import React from "react";
import { Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button.tsx";

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="flex justify-center flex-col items-center">
        <Card>
          <h2 className="text-xl font-poppins text-gray-800">Letras</h2>
          <p className="mt-2 text-gray-600 font-comfortaa">
            Esta es una descripción corta sobre la carta. Aquí puedes añadir más
            detalles.
          </p>
        </Card>
        <Button size={"circleSize"} variant={"fifth"} className="mt-3">
          <Volume2 className="text-white w-auto h-38" />
        </Button>
      </div>
      <div className="flex justify-center flex-col items-center">
        <Card>
          <h2 className="text-xl font-poppins text-gray-800">Palabras</h2>
          <p className="mt-2 text-gray-600 font-comfortaa">
            Esta es una descripción corta sobre la carta. Aquí puedes añadir más
            detalles.
          </p>
        </Card>
        <Button size={"circleSize"} variant={"fifth"} className="mt-3">
          <Volume2 className="text-white w-auto h-38" />
        </Button>
      </div>
      <Link to="/viborita">
        <div className="flex justify-center flex-col items-center">
          <Link to="/viborita">
            <Card>
              <h2 className="text-xl font-poppins text-gray-800">Snake Game</h2>
              <p className="mt-2 text-gray-600 font-comfortaa">
                Esta es una descripción corta sobre la carta. Aquí puedes añadir
                más detalles.
              </p>
            </Card>
          </Link>
          <Button size={"circleSize"} variant={"fifth"} className="mt-3">
            <Volume2 className="text-white w-auto h-38" />
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default Home;
