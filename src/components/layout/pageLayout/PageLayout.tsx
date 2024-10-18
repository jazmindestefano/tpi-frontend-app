import Header from "../header/Header";
import { Outlet, useLocation } from "react-router-dom";

const PageLayout: React.FC = () => {

const location = useLocation();
const paddingTop = location.pathname === "/felicitaciones" ? "pt-0" : "pt-20";

return (
    <div className="flex flex-col min-h-screen font-comfortaa" style={{ backgroundImage: 'url(/fondo_clara.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <main className={`flex flex-grow justify-center items-center ${paddingTop}`}>
            <Outlet />
        </main>
    </div>
);
};

export default PageLayout;
