import React from "react";
import { LogOut } from "lucide-react";
import Button from "../common/Button.tsx";
import Breadcrumb from "../common/Breadcrumb.tsx";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-4">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/clara-logo.svg" alt="Logo" className="h-10 cursor-pointer" />
        <Breadcrumb />
      </div>
      <div>
        <Button size={"square"} variant={"fifth"}>
          <LogOut className="text-white" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
