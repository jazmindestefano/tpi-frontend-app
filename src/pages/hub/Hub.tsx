import { useCurrentUser } from '@hooks'
import { Navigate, Outlet } from 'react-router-dom'
import { RoleEnum } from '@interfaces'

const Hub = () => {
  console.log('Hub')
  const user = useCurrentUser()
  console.log('Hub', 'useCurrentUser', user)

  if (user.role === RoleEnum.ADMIN) {
    console.log('Hub', 'admin redirection')
    return <Navigate to={'/admin'} />
  }

  if (user.hasOneTimePassword) {
    console.log('Hub', 'oneTimePassword redirection')
    return <Navigate to={'/reinicio-contraseña'} />
  }

  if (user.role === RoleEnum.PROFESSIONAL) {
    console.log('Hub', 'profesional redirection')
    return <Navigate to={'/profesional'} />
  }

  if (user.role === RoleEnum.PATIENT) {
    if (!user.hasAcceptTerms) {
      console.log('Hub', 'terminos redirection')
      return <Navigate to={'/terminos'} />
    }
    console.log('Hub', 'patient redirection')
    return <Navigate to={'/'} />
  }

  return <Outlet />
}

export default Hub
