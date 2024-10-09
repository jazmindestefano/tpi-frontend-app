import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Breadcrumb from '../common/Breadcrumb';

const PageLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-orange-50">
            <Header />
            <Breadcrumb />
            <main className="flex flex-grow md:py-4 md:px-20 px-5 justify-center items-center overflow-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;