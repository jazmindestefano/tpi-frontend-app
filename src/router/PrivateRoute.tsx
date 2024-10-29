import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/store/userSlice.ts'
import PrivateRouteWrapper from './PrivateRouteWrapper.tsx'
import { useGetMe } from '../hooks/queries.ts'
import { NOT_YET_ASSIGNED_NUM } from '../config/constants.ts'

const PrivateRoute: FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, error } = useGetMe()

  useEffect(() => {
    if (error) {
      setIsAuthorized(false)
      navigate('/login')
    }
  }, [error, navigate])

  useEffect(() => {
    if (user && user.id !== NOT_YET_ASSIGNED_NUM) {
      dispatch(setUser(user))
      setIsAuthorized(true)
    } else if (!user) {
      setIsAuthorized(false)
      navigate('/login')
    }
  }, [user, navigate, dispatch])

  return user && user.id === NOT_YET_ASSIGNED_NUM ? (
    <Navigate to="/login" />
  ) : (
    <PrivateRouteWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
  )
}

export default PrivateRoute
