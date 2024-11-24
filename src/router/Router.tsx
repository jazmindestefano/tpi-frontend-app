import { createBrowserRouter } from 'react-router-dom'
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
  ChangePassword,
  HomeAdminPage
} from '@pages'
import { LayoutAdmin, LayoutPatient, LayoutProfesional } from '@components'
import {
  SnakeGameWrapper,
  ValidateRolePatient,
  ValidateRoleProfessional,
  ValidGameWrapper,
  PrivateRoute
} from '@wrappers'

const Router = createBrowserRouter([
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
    path: '/change-one-time-password',
    element: <ChangePassword />
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
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LayoutAdmin />,
        path: '/admin',
        children: [
          {
            path: '',
            element: <HomeAdminPage />
          }
        ]
      },
      {
        element: <LayoutPatient />,
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
                path: '/perfil',
                element: <ProfilePage />
              }
            ]
          }
        ]
      },
      {
        element: <LayoutProfesional />,
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

export default Router
