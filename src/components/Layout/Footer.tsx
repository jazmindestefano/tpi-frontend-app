import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/perfil');
    };

    return (
        <footer className="flex justify-start p-4">
            <button 
                className="bg-blue-500 text-black font-bold py-2 px-4 rounded" 
                onClick={goToProfile}
            >
                Ir a Perfil
            </button>
        </footer>
    );
};

export default Footer;