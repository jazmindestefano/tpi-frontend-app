import { FC, ReactNode } from 'react'

interface PublicRouteLayoutProps {
  children: ReactNode
}

const PublicRouteLayout: FC<PublicRouteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-start pt-20 space-y-28 items-center font-comfortaa bg-orange-100">
      <div>
        <img src={'/clarita.svg'} alt="Logo" className="h-32 cursor-pointer" />
      </div>
      <div className="w-full flex flex-col justify-start items-center">{children}</div>
    </div>
  )
}

export default PublicRouteLayout
