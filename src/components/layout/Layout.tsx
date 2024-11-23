import { Outlet } from 'react-router-dom'
import { FC, ReactNode } from 'react'

interface LayoutProps {
  header: ReactNode
  aside: ReactNode
  className: string
}

const Layout: FC<LayoutProps> = ({ header, aside, className }) => {
  return (
    <div className={`flex h-screen bg-gray-100 ${className}`}>
      {aside}
      <main className="flex-1 flex justify-start items-start overflow-y-auto h-screen">
        {header}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
