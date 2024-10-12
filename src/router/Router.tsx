import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SnakeGame from '../pages/games/SnakeGame.tsx';
import PageLayout from '../components/layout/pageLayout/PageLayout.tsx';
import ThemeSelectorPage from "../pages/ThemeSelector.tsx";
import ErrorPage from "../pages/Error.tsx";
import GameSelectoPage from '../pages/GameSelector.tsx';
import NotFoundPage from "../pages/NotFound.tsx";
import CongratulationsPage from "../pages/Congratulations.tsx";
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
        element: <GameSelectoPage />
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