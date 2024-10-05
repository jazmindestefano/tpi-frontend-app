import React from 'react';
import 'tailwindcss/tailwind.css';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow mx-auto p-4 flex justify-center items-center">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;