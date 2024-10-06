import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../Common/Button';
import { CircleUserRound, House } from 'lucide-react';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
        {
            location.pathname !== '/perfil' ? (
                <footer className="flex justify-start p-4">
                    <CustomButton size={"extrasmall"} variant={"primary"} onClick={() => navigate('/perfil')}>
                        <CircleUserRound /> Perfil
                    </CustomButton>
                </footer>
            ) : (
                <footer className="flex justify-start p-4">
                    <CustomButton size={"extrasmall"} variant={"primary"} onClick={() => navigate('/')}>
                        <House /> Inicio
                    </CustomButton>
                </footer>
            )
        }
        </>
    );
};

export default Footer;