import localStorageManager from '../../../localStorage/localStorageManager'
import ProductTour from '../../ProductTour'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

const PageLayout: React.FC = () => {
  // to do: this has to come from backend
  const showProductTour = localStorageManager.getItem('showProductTour')

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
