import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import localStorageManager from '@/localStorage/localStorageManager'
import { setUser } from '@/redux/store/userSlice'
import Header from './Header'
import ProductTour from '../ProductTour'

const PageLayout = () => {
  // to do: this has to come from backend
  const showProductTour = localStorageManager.getItem('showProductTour')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser({ id: 1 }))
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen font-comfortaa">
      <Header />
      <main className="flex flex-grow justify-center items-center">
        <Outlet />
      </main>
      {showProductTour && <ProductTour />}
    </div>
  )
}

export default PageLayout
