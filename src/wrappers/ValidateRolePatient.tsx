import { FC } from 'react'
import { useCurrentUser } from '@hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import { RoleEnum } from '@interfaces'

const ValidateRolePatient: FC = () => {
  const user = useCurrentUser()
  const navigate = useNavigate()

  if (user.role === RoleEnum.PATIENT) {
    navigate('/')
  }

  return <Outlet />
}

export default ValidateRolePatient
