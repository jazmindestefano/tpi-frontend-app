import Header from '../header/Header';
import { Outlet } from 'react-router-dom';

const PageLayout: React.FC = () => {

    return (
        <div className="flex flex-col min-h-screen font-comfortaa" style={{ backgroundImage: 'url(/fondo_clara.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Header />
            <main className="flex flex-grow justify-center items-center xl:px-48 md:px-20 py-16">
                <Outlet />
            </main>
        </div>
    );
};

export default PageLayout;
