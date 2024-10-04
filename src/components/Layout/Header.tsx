import React from 'react';
import CustomButton from '../Common/Button';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
            <div className="logo">
                <img src="/path/to/logo.png" alt="Logo" className="h-10" />
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
