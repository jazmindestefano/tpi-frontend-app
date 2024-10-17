import React  from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryLogOutButton, TertiaryHomeButton, TertiaryProfileButton } from "../../common/buttons/Buttons";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-start p-4 bg-gradient-to-b from-orange-100 to-transparent fixed w-full">
      <div className="flex flex-col justify-center items-start gap-4" onClick={() => navigate("/")}>
        <img src="/clara-logo.svg" alt="Logo" className="h-16 cursor-pointer" />
      </div>
      <div className="flex flex-row gap-4">
        {location.pathname !== "/perfil" && (
          <TertiaryProfileButton onClick={() => navigate(location.pathname !== "/perfil" ? "/perfil" : "/")}>
            <img
              src="/avatar/lion-avatar.png"
              alt="Avatar"
              className="object-cover h-10"
            />
          </TertiaryProfileButton>
        )}
        {location.pathname === "/" ? (
          <PrimaryLogOutButton />
        ) : (
          <TertiaryHomeButton onClick={() => navigate("/")} />
        )}
      </div>
    </header>
  );
};

export default Header;
