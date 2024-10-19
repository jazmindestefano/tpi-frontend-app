import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import PageLayout from '../components/layout/pageLayout/PageLayout.tsx'
import ThemeSelectorPage from '../pages/ThemeSelector.tsx'
import ErrorPage from '../pages/Error.tsx'
import GameSelectorPage from '../pages/GameSelector.tsx'
import NotFoundPage from '../pages/NotFound.tsx'
import CongratulationsPage from '../pages/Congratulations.tsx'

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/perfil',
        element: <Profile />
      },
      {
        path: '/tematicas',
        element: <ThemeSelectorPage />
      },
      {
        path: '/actividad/:gameId',
        element: <GameSelectorPage />
      },
      {
        path: '/felicitaciones',
        element: <CongratulationsPage />
      },
      {
        path: '/error',
        element: <ErrorPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])
