import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Button from "../common/Button.tsx";

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="flex justify-between items-center p-4">
            <div className="logo" onClick={() => navigate('/')}>
                <img src="/clara-logo.svg" alt="Logo" className="h-10 cursor-pointer" />
            </div>
            <div>
                <Button size={"extrasmall"} variant={"primary"}> 
                    <LogOut />
                </Button>
            </div>
        </header>
    );
};

export default Header;
