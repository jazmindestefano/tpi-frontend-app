import React from 'react';
import 'tailwindcss/tailwind.css';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div> 
            <Header />
            <main className="mx-auto p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;