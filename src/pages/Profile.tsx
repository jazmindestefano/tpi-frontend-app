import React from 'react';
import CustomButton from '../components/Common/Button';
import { Pencil, Save } from 'lucide-react';

interface ProfileProps {
    userType?: 'paciente' | 'profesional';
}

const Profile: React.FC<ProfileProps> = ({ userType }) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <img className="mx-auto h-48 w-auto" src="/avatar/lion-avatar.png" alt="Avatar" />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                {isEditing ? (
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                            <div className="mt-2">
                                <input id="nombre" name="nombre" type="nombre" autoComplete="nombre" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
                            </div>
                            <div className="mt-2">
                                <input id="apellido" name="apellido" type="text" autoComplete="apellido" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            </div>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className='flex items-end justify-end'>
                            <CustomButton size={"extrasmall"} variant={"primary"} onClick={() => setIsEditing(false)}> 
                                <Save />
                            </CustomButton>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                            <div className="mt-2">
                                <p className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">John</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
                            <div className="mt-2">
                                <p className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">Doe</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div className="mt-2">
                                <p className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">john.doe@example.com</p>
                            </div>
                        </div>

                        <div className='flex items-end justify-end'>
                            <CustomButton size={"extrasmall"} variant={"primary"} onClick={handleEditClick}> 
                                <Pencil />
                            </CustomButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;