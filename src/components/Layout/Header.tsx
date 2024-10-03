import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
            <div className="logo">
                <img src="/path/to/logo.png" alt="Logo" className="h-10" />
            </div>
            <div className="logout-button">
                <button 
                    className="px-4 py-2 bg-blue-500 text-black border-none rounded cursor-pointer"
                    onClick={() => console.log('Logout clicked')}
                >
                    SALIR
                </button>
            </div>
        </header>
    );
};

export default Header;
