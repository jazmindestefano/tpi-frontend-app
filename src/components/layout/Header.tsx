import React from "react";
import { LogOut } from "lucide-react";
import Button from "../common/Button.tsx";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb.tsx";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-start p-4">
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
