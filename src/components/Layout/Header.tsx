import React from "react";
import CustomButton from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Breadcrumb from "../Common/Breadcrumb";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src="/clara-logo.svg"
            alt="Logo"
            className="h-10 cursor-pointer"
          />
        </div>
        <div>
          <CustomButton size={"extrasmall"} variant={"primary"}>
            <LogOut color="white" />
          </CustomButton>
        </div>
      </div>

      <Breadcrumb />
    </header>
  );
};

export default Header;
