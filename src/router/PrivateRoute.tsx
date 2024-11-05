import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrivateRouteWrapper from './PrivateRouteWrapper'
import { useGetMe } from '../hooks/queries'
import { useDispatch } from 'react-redux'
import { setUser } from '@redux/slices'
import { useToken } from '@hooks/selectors'

const PrivateRoute: FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const { user, isLoading, error } = useGetMe()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useToken()

  console.log({ user, isAuthorized, token, isLoading, error })

  useEffect(() => {
    if (!isLoading && user && token) {
      setIsAuthorized(true)
      dispatch(setUser(user))
    }
  }, [user, isLoading, token, dispatch, navigate])

  if (isLoading) {
    return <PrivateRouteWrapper isLoading={true} isAuthorized={false} />
  }

  return <PrivateRouteWrapper isLoading={false} isAuthorized={true} />
}

export default PrivateRoute
