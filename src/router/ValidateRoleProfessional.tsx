import { FC } from 'react'
import { useUser } from '@hooks'
import { Outlet, useNavigate } from 'react-router-dom'

const ValidateRoleProfessional: FC = () => {
  const user = useUser()
  const navigate = useNavigate()

  if (user.role === 'PROFESSIONAL') {
    navigate('/profesional')
  }

  return <Outlet />
}

export default ValidateRoleProfessional
