import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Common/Button';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/perfil');
    };

    return (
        <footer className="flex justify-start p-4">
            <CustomButton size={"small"} variant={"primary"} onClick={goToProfile}>
                Ver Perfil
            </CustomButton>
        </footer>
    );
};

export default Footer;