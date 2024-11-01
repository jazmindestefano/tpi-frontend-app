import { Outlet } from 'react-router-dom'
import AsideProfesional from './AsideProfesional'
import HeaderProfesional from './HeaderProfesional'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 font-poppins">
      <AsideProfesional />
      <main className="flex-1 p-8 overflow-auto relative">
        <HeaderProfesional />
        <Outlet />
      </main>
    </div>
  )
}
