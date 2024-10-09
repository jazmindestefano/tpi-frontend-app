import React  from "react";
import { House, LogOut } from "lucide-react";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-start p-4 bg-gradient-to-b from-orange-50 to-transparent fixed top-0 left-0 w-full z-50 transition-opacity duration-300">
      <div className="flex flex-col justify-center items-start gap-4" onClick={() => navigate("/")}>
        <img src="/clara-logo.svg" alt="Logo" className="h-16 cursor-pointer" />
      </div>
      <div className="flex flex-row gap-4">
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
        <Button size={"square"} variant={"primary"}>
          <LogOut className="text-white" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
