import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import PageLayout from '../components/Layout/PageLayout';

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [            
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/perfil",
                element: <Profile />,
            },
        ],
    },
]);