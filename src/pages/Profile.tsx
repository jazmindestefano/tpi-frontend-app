import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-center mb-4">
            <div className="bg-black w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
                <img src="path/to/user-image.jpg" alt="Usuario" className="object-cover w-full h-full" />
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

        <div className="flex justify-end">
            <button className="bg-blue-600 text-black py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Editar
            </button>
        </div>
    </div>
    );
};

export default Profile;