import React from 'react';
import CustomButton from './Button';

const Card: React.FC = () => {
    return (
        <div className="max-w-xs bg-white rounded-lg shadow-lg">
            <div className="p-4 h-96">
                <h2 className="text-xl font-poppins text-gray-800">Título de la Carta</h2>
                <p className="mt-2 text-gray-600 font-comfortaa">
                Esta es una descripción corta sobre la carta. Aquí puedes añadir más detalles.
                </p>
                
                <div className="mt-4">
                <CustomButton size={"small"} variant={"primary"}>
                    Ver más
                </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default Card;