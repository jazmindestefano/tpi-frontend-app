import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PrivateRouteWrapper from './PrivateRouteWrapper.tsx'
import { NOT_YET_ASSIGNED_NUM } from '../config/constants.ts'
import { useUser } from '@hooks/selectors.ts'

const PrivateRoute: FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useUser()

  useEffect(() => {
    if (user.id !== NOT_YET_ASSIGNED_NUM) {
      setIsAuthorized(true)
    } else if (!user) {
      console.log('no hay user')
      setIsAuthorized(false)
    }
  }, [user, navigate, dispatch])

  return user.id === NOT_YET_ASSIGNED_NUM ? (
    <Navigate to="/login" />
  ) : (
    <PrivateRouteWrapper isAuthorized={isAuthorized} />
  )
}

export default PrivateRoute
