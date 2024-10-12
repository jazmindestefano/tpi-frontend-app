import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SnakeGame from '../pages/SnakeGame';
import PageLayout from '../components/layout/pageLayout/PageLayout.tsx';
import {ThemeSelectorPage} from "../pages/themeSelect/ThemeSelectorPage.tsx";
import {ErrorPage} from "../pages/ErrorPage.tsx";
import { GamePage } from '../pages/GamePage.tsx';
import {NotFoundPage} from "../pages/NotFoundPage.tsx";
import {CongratulationsPage} from "../pages/CongratulationsPage.tsx";
import {AudioRecorder} from "../components/audio/AudioRecorder.tsx";

export const router = createBrowserRouter([
  {
    element: <PageLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/perfil",
        element: <Profile/>,
      },
      {
        path: "/viborita",
        element: <SnakeGame/>
      },
      {
        path: "/actividad/:gameId/tematicas",
        element: <ThemeSelectorPage />
      },
      {
        path: "/actividad/:gameId",
        element: <GamePage />
      },
      {
        path: "/audio",
        element: <AudioRecorder />
      },
      {
        path: "/felicitaciones",
        element: <CongratulationsPage />
      },
      {
        path: "/error",
        element: <ErrorPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ],
  },
]);