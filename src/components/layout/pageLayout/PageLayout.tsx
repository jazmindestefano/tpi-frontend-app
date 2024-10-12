import Header from '../header/Header';
import { Outlet } from 'react-router-dom';

const PageLayout: React.FC = () => {

    return (
        <div className="flex flex-col min-h-screen bg-orange-50" style={{ backgroundImage: 'url(/fondo.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Header />
            <main className="mt-10 flex flex-grow justify-center items-center bg-cover bg-center relative">
                <Outlet />
            </main>
        </div>
    );
};

export default PageLayout;
