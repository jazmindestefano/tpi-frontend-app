import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@hooks'
import { Loader } from '@components'

const AuthenticatedRouteGuard: FC = () => {
  console.log('AuthenticatedRouteGuard')
  const { isLoading, isAuthorized } = useAuth()

  return isLoading ? <Loader /> : isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
}

export default AuthenticatedRouteGuard
