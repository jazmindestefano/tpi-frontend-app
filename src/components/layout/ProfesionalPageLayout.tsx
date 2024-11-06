import { Outlet } from 'react-router-dom'
import AsideProfesional from './AsideProfesional'
import HeaderProfesional from './HeaderProfesional'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 font-poppins">
      <AsideProfesional />
      <main className="flex-1 flex justify-start items-start p-8 overflow-hidden">
        <HeaderProfesional />
        <Outlet />
      </main>
    </div>
  )
}
