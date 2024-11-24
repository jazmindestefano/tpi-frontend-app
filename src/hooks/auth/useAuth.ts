import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetMe, useToken } from '@hooks'
import { setUser } from '@redux/slices'

const useAuth = () => {
  const dispatch = useDispatch()
  const { user: data, isLoading, error } = useGetMe()
  const token = useToken()
  const isAuthorized = Boolean(data && token && !error)

  useEffect(() => {
    if (isAuthorized) {
      dispatch(setUser(data!))
    } else if (error) {
      console.error('Authorization error:', error)
    }
  }, [isAuthorized, error, dispatch, data])

  return { isAuthorized, isLoading }
}

export default useAuth
