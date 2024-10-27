import { Outlet } from 'react-router-dom'
import AsideProfesional from '../aside/AsideProfesional'
import HeaderProfesional from '../header/HeaderProfesional'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 font-comfortaa">
      <AsideProfesional />
      <main className="flex-1 p-8 overflow-auto relative">
        <HeaderProfesional />
        <Outlet />
      </main>
    </div>
  )
}
