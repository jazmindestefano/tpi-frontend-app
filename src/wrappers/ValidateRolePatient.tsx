import { FC } from 'react'
import { useUser } from '@hooks'
import { Outlet, useNavigate } from 'react-router-dom'

const ValidateRolePatient: FC = () => {
  const user = useUser()
  const navigate = useNavigate()

  if (user.role === 'PATIENT') {
    navigate('/')
  }

  return <Outlet />
}

export default ValidateRolePatient
