import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@pages/LoginPage.tsx'
import PrivateRoute from '@/router/PrivateRoute.tsx'
import {
  AchievementsPage,
  ActivityResponsesPage,
  AuditoryDiscriminationGamePage,
  CongratulationsPage,
  DashboardPage,
  ErrorPage,
  HomeProfesionalPage,
  NotFoundPage,
  PrivacyPolicyPage,
  ProfilePage,
  RecordGamePage,
  TermsAndConditionsPage,
  ThemeSelectorPage,
  TimelinePage
} from '@/pages'
import { PageLayout, ProfesionalPageLayout } from '@/components'
import Home from '@pages/HomePage.tsx'
import { ValidGameWrapper } from '@/router/ValidGameWrapper.tsx'
import { SnakeGameWrapper } from '../../wrappers'
import PatientActivitiesPage from '@pages/PatientActivitiesPage.tsx'

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
            element: <ProfilePage />
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
                element: <AuditoryDiscriminationGamePage />
              },
              {
                path: 'habla',
                element: <RecordGamePage />
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
            path: '/terminos-y-condiciones',
            element: <TermsAndConditionsPage />
          },
          {
            path: '/politica-de-privacidad',
            element: <PrivacyPolicyPage />
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
            element: <HomeProfesionalPage />
          },
          {
            path: 'paciente/:patientId',
            element: <DashboardPage />
          },
          {
            path: 'paciente/:patientId/timeline',
            element: <TimelinePage />
          },
          {
            path: 'paciente/:patientId/actividades',
            element: <PatientActivitiesPage />
          },
          {
            path: 'paciente/:patientId/actividades/:activityId',
            element: <ActivityResponsesPage />
          }
        ]
      }
    ]
  }
])
