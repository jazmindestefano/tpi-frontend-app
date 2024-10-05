import React from 'react';
import CustomButton from '../Common/Button';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="flex justify-between items-center p-4">
            <div className="logo" onClick={() => navigate('/')}>
                <img src="/public/clara-logo.svg" alt="Logo" className="h-10 cursor-pointer" />
            </div>
            <div>
                <CustomButton size={"extrasmall"} variant={"primary"}> 
                    Salir
                </CustomButton>
            </div>
        </header>
    );
};

export default Header;
