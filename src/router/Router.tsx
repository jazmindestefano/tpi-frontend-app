import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import PageLayout from '../components/layout/pageLayout/PageLayout.tsx'
import ThemeSelectorPage from '../pages/ThemeSelector.tsx'
import ErrorPage from '../pages/Error.tsx'
import NotFoundPage from '../pages/NotFound.tsx'
import CongratulationsPage from '../pages/Congratulations.tsx'
import AchievementsPage from '../pages/achievement/Achievements.tsx'
import HomeProfesional from '../pages/profesional/HomeProfesional.tsx'
import ProfesionalPageLayout from '../components/layout/profesionalPageLayout/ProfesionalPageLayout.tsx'
import Dashboard from '../pages/profesional/Dashboard.tsx'
import PatientActivities from '../pages/profesional/PatientActivities.tsx'
import ActivityResponses from '../pages/profesional/ActivityResponses.tsx'
import Timeline from '../pages/profesional/Timeline.tsx'
import PrivateRoute from './PrivateRoute.tsx'
import { ValidGameWrapper } from './ValidGameWrapper.tsx'
import AuditoryDiscriminationGame from '../pages/games/AuditoryDiscriminationGame.tsx'
import RecordGame from '../pages/games/RecordGame.tsx'
import { SnakeGameWrapper } from '../pages/games/snakeGame/SnakeGameWrapper.tsx'
import { LoginPage } from '../pages/LoginPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/registro',
    element: <div>Registro</div>
  },
  {
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
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
            element: <ValidGameWrapper />,
            path: '/actividad',
            children: [
              {
                path: 'audicion',
                element: <AuditoryDiscriminationGame />
              },
              {
                path: 'habla',
                element: <RecordGame />
              },
              {
                path: 'viborita',
                element: <SnakeGameWrapper />
              }
            ]
          },
          {
            path: '/felicitaciones',
            element: <CongratulationsPage />
          },
          {
            path: '/logros',
            element: <AchievementsPage />
          },
          {
            path: '*',
            element: <NotFoundPage />
          }
        ]
      },
      {
        element: <ProfesionalPageLayout />,
        path: '/profesional',
        children: [
          {
            path: '',
            element: <HomeProfesional />
          },
          {
            path: 'paciente/:patientId',
            element: <Dashboard />
          },
          {
            path: 'paciente/:patientId/timeline',
            element: <Timeline />
          },
          {
            path: 'paciente/:patientId/actividades',
            element: <PatientActivities />
          },
          {
            path: 'paciente/:patientId/actividades/:activityId',
            element: <ActivityResponses />
          }
        ]
      }
    ]
  }
])
