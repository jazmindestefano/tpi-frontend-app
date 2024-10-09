import { House } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <footer
                className={`fixed bottom-0 left-0 w-full bg-orange-50 text-black flex justify-between items-center p-4 z-50 transition-opacity duration-300 ${
                    isHovered ? 'bg-white opacity-100' : 'bg-transparent opacity-70'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
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
            </footer>
    );
};

export default Footer;