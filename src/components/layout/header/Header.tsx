import React  from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/buttons/Button.tsx";
import {House, LogOut} from "lucide-react";
import { useSelectedTheme } from "../../../hooks/selectors.ts";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const selectedTheme = useSelectedTheme();
  
  return (
    <header className="flex justify-between items-start p-4 bg-gradient-to-b from-orange-100 to-transparent fixed w-full">
      {selectedTheme == null && (
      <div className="flex flex-col justify-center items-start gap-4" onClick={() => navigate("/")}>
      <img src="/clara-logo.svg" alt="Logo" className="h-16 cursor-pointer" />
      </div>
      )}
      <div className={`flex flex-row gap-4 ${location.pathname.includes("actividad") ? "ml-auto" : ""}`}>
      {location.pathname !== "/perfil" && (
      <Button
      size={"square"}
      variant={"tertiary"}
      onClick={() => navigate(location.pathname !== "/perfil" ? "/perfil" : "/")}
      >
      <img
        src="/avatar/lion-avatar.png"
        alt="Avatar"
        className="object-cover h-10"
      />
      </Button>
      )}
      {location.pathname === "/" ? (
      <Button size={"square"} variant={"primary"}>
      <LogOut className="text-white" />
      </Button>
      ) : (
      <Button size={"square"} variant={"tertiary"} onClick={() => navigate("/")}>
      <House />
      </Button>
      )}
      </div>
    </header>
  );
};

export default Header;
