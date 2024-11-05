import { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetMe } from '@hooks/queries.ts'
import { setUser } from '@redux/slices'
import SpinnerLoader from '@components/common/SpinnerLoader.tsx'
import { useToken } from '@hooks/selectors.ts'

const PrivateRoute: FC = () => {
  const dispatch = useDispatch()
  const { user: data, isLoading, error } = useGetMe()
  const token = useToken()
  // Check if the user is authorized based on the presence of `data`
  const isAuthorized = Boolean(data && token)
  useEffect(() => {
    if (isAuthorized) {
      dispatch(setUser(data))
    } else if (error) {
      console.error('Authorization error:', error)
    }
  }, [isAuthorized, error, dispatch, data])

  return isLoading ? <SpinnerLoader /> : isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
