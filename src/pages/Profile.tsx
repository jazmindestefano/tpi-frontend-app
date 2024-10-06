import React from 'react';
import CustomButton from '../components/Common/Button';

interface ProfileProps {
    userType?: 'paciente' | 'profesional';
}

const Profile: React.FC<ProfileProps> = ({ userType }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-96">
            <div className="flex justify-center mb-4">
            <div className="w-30 h-30 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/public/avatar/lion-avatar.png" alt="Usuario" className="object-cover w-full h-full" />
            </div>
            </div>

            <hr className="border-gray-300 mb-4" />

            <div className="mb-4">
            <input type="text" placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="mb-4">
            <input type="text" placeholder="Apellido" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="mb-4">
            <input type="number" placeholder="Edad" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="mb-4">
            <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            {userType === 'profesional' && (
            <div className="mb-4">
                <input type="text" placeholder="Especialidad" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            )}

            <div className="flex justify-end">
            <CustomButton size="extrasmall" variant="primary">
                Editar
            </CustomButton>
            </div>
        </div>
    );
};

export default Profile;