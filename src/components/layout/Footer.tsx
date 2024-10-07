import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleUserRound, House } from "lucide-react";
import Button from "../common/Button";

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <footer className="flex justify-start p-4">
          <Button size={"extrasmall"} variant={"primary"}
                  onClick={() => navigate(
                    location.pathname !== '/perfil' ? '/perfil' : "/"
                  )}
          >
              {location.pathname !== '/perfil' ? <CircleUserRound/> : <House />}
          </Button>
      </footer>
    );
};

export default Footer;