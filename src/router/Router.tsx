import { createBrowserRouter } from 'react-router-dom'
import { PageLayout, ProfesionalPageLayout } from '@/components/index.ts'
import {
  AchievementsPage,
  ActivityResponsesPage,
  CongratulationsPage,
  DashboardPage,
  ErrorPage,
  GameSelectorPage,
  HomePage,
  HomeProfesionalPage,
  NotFoundPage,
  PrivacyPolicyPage,
  ProfilePage,
  TermsAndConditionsPage,
  ThemeSelectorPage,
  TimelinePage
} from '@/pages/index.ts'
import PatientActivitiesPage from '@/pages/PatientActivitiesPage'

export const router = createBrowserRouter([
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
      }
    ]
  },
  {
    element: <ProfesionalPageLayout />,
    children: [
      {
        path: '/profesional',
        element: <HomeProfesionalPage />
      },
      {
        path: '/profesional/perfil/',
        element: <ProfilePage />
      },
      {
        path: '/profesional/paciente/:patientId',
        element: <DashboardPage />
      },
      {
        path: '/profesional/paciente/:patientId/timeline',
        element: <TimelinePage />
      },
      {
        path: '/profesional/paciente/:patientId/actividades',
        element: <PatientActivitiesPage />
      },
      {
        path: '/profesional/paciente/:patientId/actividades/:gameId',
        element: <ActivityResponsesPage />
      }
    ]
  }
])
