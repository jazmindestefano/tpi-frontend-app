import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import PageLayout from '../components/layout/PageLayout';
import {ThemeSelect} from "../pages/themeSelect/ThemeSelect.tsx";

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
            {
                path: "/actividad/:activityId/tematicas",
                element: <ThemeSelect />
            }
        ],
    },
]);