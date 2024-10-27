import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import ProductTour from '../../productTour/ProductTour'

const PageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-comfortaa">
      <Header />
      <main className="flex flex-grow justify-center items-center">
        <Outlet />
      </main>
      <ProductTour />
    </div>
  )
}

export default PageLayout
