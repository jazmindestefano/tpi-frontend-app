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
  PatientActivitiesPage,
  RegisterPage,
  EmailVerification,
  ProfesionalCredentialVerification
} from '@/pages'
import { PageLayout, ProfesionalPageLayout } from '@/components'
import { ValidGameWrapper } from '@/router/ValidGameWrapper.tsx'
import { SnakeGameWrapper } from '../../wrappers'
import ValidateRoleProfessional from './ValidateRoleProfessional.tsx'
import ValidateRolePatient from './ValidateRolePatient.tsx'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/email-verification/:email',
    element: <EmailVerification />
  },
  {
    path: '/professional-credential-verification',
    element: <ProfesionalCredentialVerification />
  },
  {
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            element: <ValidateRoleProfessional />,
            children: [
              {
                path: '/',
                element: <HomePage />
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
                    path: 'letras',
                    element: <AuditoryDiscriminationGamePage />
                  },
                  {
                    path: 'palabras',
                    element: <RecordGamePage />
                  },
                  {
                    path: 'la-viborita',
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
                path: '/perfil',
                element: <ProfilePage />
              }
            ]
          }
        ]
      },
      {
        element: <ProfesionalPageLayout />,
        path: '/profesional',
        children: [
          {
            element: <ValidateRolePatient />,
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
              },
              {
                path: 'paciente/:patientId/actividades/:activityId/:date',
                element: <ActivityResponsesPage />
              },
              {
                path: 'perfil',
                element: <ProfilePage />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])
