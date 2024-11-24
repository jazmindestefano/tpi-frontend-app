import { FC, useEffect } from 'react'
import { useCurrentUser } from '@hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import { RoleEnum } from '@interfaces'

const ValidatePatient: FC = () => {
  const user = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    if (user.role === RoleEnum.PROFESSIONAL || user.role === RoleEnum.ADMIN) {
      localStorage.clear()
      navigate('/login')
    }

    if (!user.hasAcceptTerms) {
      navigate('/terminos')
    }
  }, [navigate, user])

  return <Outlet />
}

export default ValidatePatient
