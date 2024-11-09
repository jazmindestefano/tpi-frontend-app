import { AsideProfesional, HeaderProfesional } from '@components'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 font-poppins">
      <AsideProfesional />
      <main className="flex-1 flex justify-start items-start p-8 overflow-y-auto h-screen">
        <HeaderProfesional />
        <Outlet />
      </main>
    </div>
  )
}
