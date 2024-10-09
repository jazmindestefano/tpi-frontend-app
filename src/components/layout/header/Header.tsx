import React, { useState } from "react";
import { LogOut } from "lucide-react";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <header className={`flex justify-between items-start p-4 bg-orange-50 fixed top-0 left-0 w-full z-50 transition-opacity duration-300 ${
      isHovered ? 'bg-white opacity-100' : 'bg-transparent opacity-70'
    } md:${isHovered ? 'bg-white opacity-100' : 'bg-transparent opacity-70'}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <div className="flex flex-col justify-center items-start gap-4" onClick={() => navigate("/")}>
        <img src="/clara-logo.svg" alt="Logo" className="h-10 cursor-pointer" />
        <Breadcrumb />
      </div>
      <div className="flex flex-col gap-4">
        <Button size={"square"} variant={"primary"}>
          <LogOut className="text-white" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
