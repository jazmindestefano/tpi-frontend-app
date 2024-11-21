import { FC } from 'react'
import { useUser } from '@hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import { RoleEnum } from '@interfaces'

const ValidateRolePatient: FC = () => {
  const user = useUser()
  const navigate = useNavigate()

  if (user.role === RoleEnum.PATIENT) {
    navigate('/')
  }

  return <Outlet />
}

export default ValidateRolePatient
