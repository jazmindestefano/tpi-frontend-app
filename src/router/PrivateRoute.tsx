import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PrivateRouteWrapper from './PrivateRouteWrapper.tsx'
import { useGetMe } from '../hooks/queries.ts'
import { NOT_YET_ASSIGNED_NUM } from '../config/constants.ts'
import { setUser } from '@/redux/slices'

const PrivateRoute: FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, error } = useGetMe()

  console.log(user, isLoading, error)

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
    }
  }, [user, navigate, dispatch])

  return user && user.id === NOT_YET_ASSIGNED_NUM ? (
    <Navigate to="/login" />
  ) : (
    <PrivateRouteWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
  )
}

export default PrivateRoute
