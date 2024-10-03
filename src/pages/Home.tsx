import React from 'react';
import Card from '../components/Common/Card';

const Home: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-center items-center min-h-screen text-center py-20 px-10 bg-red-200">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Home;