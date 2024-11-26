import { FC } from 'react'
import { useCurrentUser } from '@hooks'
import { Navigate, Outlet } from 'react-router-dom'
import { RoleEnum } from '@interfaces'

const ValidPatientGuard: FC = () => {
  console.log('ValidPatientGuard')
  const user = useCurrentUser()

  if (user.role !== RoleEnum.PATIENT) {
    return <Navigate to={'/login'} />
  }

  if (!user.hasAcceptTerms) {
    return <Navigate to={'/terminos'} />
  }

  return <Outlet />
}

export default ValidPatientGuard
