import { createBrowserRouter } from 'react-router-dom'
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
  TimelinePage,
  LoginPage,
  HomePage,
  PatientActivitiesPage
} from '@/pages'
import { PageLayout, ProfesionalPageLayout } from '@/components'
import { ValidGameWrapper } from '@/router/ValidGameWrapper.tsx'
import { SnakeGameWrapper } from '../../wrappers'

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
            element: <HomePage />
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
