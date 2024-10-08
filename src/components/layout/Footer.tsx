import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { House } from "lucide-react";
import Button from "../common/Button";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="flex justify-start p-4">
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
