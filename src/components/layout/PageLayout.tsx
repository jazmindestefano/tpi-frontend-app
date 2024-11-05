import { Outlet } from 'react-router-dom'
import Header from './Header'
import ProductTour from '../ProductTour'
import { useShowProductTour } from '@hooks/selectors.ts'

const PageLayout = () => {
  const showProductTour = useShowProductTour()

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
