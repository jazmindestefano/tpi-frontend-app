import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import ThemeSelectorPage from '../pages/ThemeSelector.tsx'
import ErrorPage from '../pages/Error.tsx'
import GameSelectorPage from '../pages/GameSelector.tsx'
import NotFoundPage from '../pages/NotFound.tsx'
import CongratulationsPage from '../pages/Congratulations.tsx'
import AchievementsPage from '../pages/Achievements.tsx'
import HomeProfesional from '../pages/profesional/HomeProfesional.tsx'
import PatientActivities from '../pages/profesional/PatientActivities.tsx'
import ActivityResponses from '../pages/profesional/ActivityResponses.tsx'
import Timeline from '../pages/profesional/TimelinePage.tsx'
import DashboardPage from '@/pages/DashboardPage.tsx'
import { PrivacyPolicyPage, TermsAndConditionsPage } from '@/pages/index.ts'
import { PageLayout, ProfesionalPageLayout } from '@/components/index.ts'

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
        element: <HomeProfesional />
      },
      {
        path: '/profesional/paciente/:patientId',
        element: <DashboardPage />
      },
      {
        path: '/profesional/paciente/:patientId/timeline',
        element: <Timeline />
      },
      {
        path: '/profesional/paciente/:patientId/actividades',
        element: <PatientActivities />
      },
      {
        path: '/profesional/paciente/:patientId/actividades/:activityId',
        element: <ActivityResponses />
      }
    ]
  }
])
