import { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetMe, useToken } from '@hooks'
import { setUser } from '@redux/slices'
import { Loader } from '@components'

const PrivateRoute: FC = () => {
  const dispatch = useDispatch()
  const { user: data, isLoading, error } = useGetMe()
  const token = useToken()
  // Check if the user is authorized based on the presence of `data`
  const isAuthorized = Boolean(data && token)
  useEffect(() => {
    if (isAuthorized && data) {
      dispatch(setUser(data))
    } else if (error) {
      console.error('Authorization error:', error)
    }
  }, [isAuthorized, error, dispatch, data])

  return isLoading ? <Loader /> : isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
