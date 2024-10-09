import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const PageLayout: React.FC = () => {

    return (
        <div className="flex flex-col min-h-screen bg-orange-50">
            <Header />
            <main className="my-20 flex flex-grow justify-center items-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
