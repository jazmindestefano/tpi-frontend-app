import { createBrowserRouter } from 'react-router-dom'
import {
  AchievementsPage,
  ActivityResponsesPage,
  AuditoryDiscriminationGamePage,
  CongratulationsPage,
  DashboardPage,
  ErrorPage,
  HomeProfesionalPage,
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
  HomeAdminPage,
  Hub,
  ChangeBackgroundPage
} from '@pages'
import { LayoutAdmin, LayoutPatient, LayoutProfesional } from '@components'
import {
  SnakeGameWrapper,
  ValidateRolePatient,
  ValidPatientGuard,
  ValidGameWrapper,
  AuthenticatedRouteGuard
} from '@wrappers'

const Router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/registro',
    element: <RegisterPage />
  },
  {
    path: '/verificacion/:email',
    element: <EmailVerification />
  },
  {
    element: <AuthenticatedRouteGuard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/hub',
        element: <Hub />
      },
      {
        path: '/reinicio-contraseña',
        element: <ChangePassword />
      },
      // inicio router admin
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
      // fin router admin
      // inicio router paciente
      {
        path: '/terminos',
        element: <TermsAndConditionsPage />
      },
      {
        element: <LayoutPatient />,
        children: [
          {
            element: <ValidPatientGuard />,
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
                path: '/cambiar-fondo',
                element: <ChangeBackgroundPage />
              },
              {
                path: '/perfil',
                element: <ProfilePage />
              }
            ]
          }
        ]
      },
      // fin router paciente
      // inicio router profesional
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
      // fin router profesional
    ]
  }
])

export default Router
