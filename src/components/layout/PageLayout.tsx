import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from '../common/Button';
import { House } from 'lucide-react';

const PageLayout: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen bg-orange-50">
            <aside className="w-32 min-h-screen bg-orange-1000 text-black flex flex-col justify-center items-center fixed">
                <nav className="flex flex-col justify-center items-center h-full p-4">
                <Button
                    size={"square"}
                    variant={"fourth"}
                    onClick={() =>
                    navigate(location.pathname !== "/perfil" ? "/perfil" : "/")
                    }
                >
                    {location.pathname !== "/perfil" ? (
                    <img
                        src="/avatar/lion-avatar.png"
                        alt="Avatar"
                        className="w-full h-8 object-cover"
                    />
                    ) : (
                    <House />
                    )}
                </Button>
                </nav>
            </aside>
            
            {/* Contenedor para el header y el contenido a la derecha */}
            <div className="flex flex-col flex-grow pl-32">
                {/* Header */}
                <Header />

                {/* Contenido principal */}
                <main className="flex-grow md:py-4 md:px-20 px-5 justify-center items-center overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PageLayout;
