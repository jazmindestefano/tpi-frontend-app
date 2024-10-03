import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/perfil",
        element: <Profile />,
    },
]);

const AppRouter: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;