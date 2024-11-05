import { FC, useEffect, useState } from 'react'
import PrivateRouteWrapper from './PrivateRouteWrapper'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetMe } from '@hooks/queries.ts'
import { setUser } from '@redux/slices'

const PrivateRoute: FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user: data, isLoading, error } = useGetMe()
  // ?, true
  // {...}, false
  console.log('(PrivateRoute) 1', data)

  useEffect(() => {
    if (error) {
      setIsAuthorized(false)
      console.error(error)
    }
  }, [error, navigate])

  useEffect(() => {
    if (data) {
      setIsAuthorized(true)
      dispatch(setUser(data))
      console.log('pasa 1')
      // console.log(isAuthorized)
    }
  }, [data, navigate, dispatch])
  console.log('(PrivateRoute) 2', { isAuthorized })
  return <PrivateRouteWrapper isLoading={isLoading} isAuthorized={isAuthorized} />
}

export default PrivateRoute
