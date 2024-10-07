import React from 'react';
import Card from '../components/Common/Card';
import Button from "../components/Common/Button.tsx";

const Home: React.FC = () => {
    return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                <div className='flex justify-center items-center'>
                  <Card>
                    <h2 className="text-xl font-poppins text-gray-800">Título de la Carta</h2>
                    <p className="mt-2 text-gray-600 font-comfortaa">
                      Esta es una descripción corta sobre la carta. Aquí puedes añadir más detalles.
                    </p>

                    <div className="mt-4">
                      <Button size={"small"} variant={"primary"}>
                        Ver más
                      </Button>
                    </div>
                  </Card>
                </div>
              <div className='flex justify-center items-center'>
                <Card>
                  <h2 className="text-xl font-poppins text-gray-800">Título de la Carta</h2>
                  <p className="mt-2 text-gray-600 font-comfortaa">
                    Esta es una descripción corta sobre la carta. Aquí puedes añadir más detalles.
                  </p>

                  <div className="mt-4">
                  <Button size={"small"} variant={"primary"}>
                        Ver más
                      </Button>
                    </div>
                  </Card>
                </div>
              <div className='flex justify-center items-center'>
                <Card>
                  <h2 className="text-xl font-poppins text-gray-800">Título de la Carta</h2>
                  <p className="mt-2 text-gray-600 font-comfortaa">
                    Esta es una descripción corta sobre la carta. Aquí puedes añadir más detalles.
                  </p>

                  <div className="mt-4">
                  <Button size={"small"} variant={"primary"}>
                        Ver más
                      </Button>
                    </div>
                  </Card>
                </div>
            </div>
    );
};

export default Home;
