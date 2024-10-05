import React from 'react';
import Card from '../components/Common/Card';

const Home: React.FC = () => {
    return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                <div className='flex justify-center items-center'>
                    <Card />
                </div>
                <div className='flex justify-center items-center'>
                    <Card />
                </div>
                <div className='flex justify-center items-center'>
                    <Card />
                </div>
            </div>
    );
};

export default Home;
