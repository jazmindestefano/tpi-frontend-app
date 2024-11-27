import { Outlet } from 'react-router-dom'
import { FC, ReactNode } from 'react'

interface LayoutProps {
  header: ReactNode
  aside: ReactNode
  className: string
  style?: React.CSSProperties
  children?: ReactNode
}

const Layout: FC<LayoutProps> = ({ header, aside, className, style, children }) => {
  return (
    <div className={`flex h-screen bg-gray-100 ${className}`} style={style}>
      {aside}
      <main className="flex-1 flex justify-start items-start overflow-y-auto h-screen">
        {header}
        {children}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
