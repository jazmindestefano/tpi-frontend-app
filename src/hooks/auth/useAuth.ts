import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetMe } from '@hooks'
import { setUser } from '@redux/slices'

const useAuth = () => {
  console.log('useAuth')
  const dispatch = useDispatch()
  const { mutate, isPending } = useGetMe()
  const [authState, setAuthState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading')

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (user) => {
        dispatch(setUser(user))
        setAuthState('authorized')
      },
      onError: (e) => {
        console.error('Authorization error', e)
        setAuthState('unauthorized')
      }
    })
  }, [dispatch, mutate])

  console.log('useAuth', {
    isLoading: authState === 'loading' || isPending,
    isAuthorized: authState === 'authorized'
  })

  return {
    isLoading: authState === 'loading' || isPending,
    isAuthorized: authState === 'authorized'
  }
}

export default useAuth
