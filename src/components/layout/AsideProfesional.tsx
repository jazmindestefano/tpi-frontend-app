import { LucideIcon, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components'

interface SidebarItemProps {
  icon: LucideIcon
  href: string
}

function SidebarItem({ icon: Icon, href }: SidebarItemProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(href)
  }

  return (
    <button
      onClick={handleClick}
      className="p-4 hover:bg-blue-600 rounded-lg transition-colors"
      data-testid="sidebar-item"
    >
      <Icon className="text-white" size={24} />
    </button>
  )
}

const AsideProfesional = () => {
  const navigate = useNavigate()
  return (
    <aside className="w-32 bg-blue-500 flex flex-col items-center pt-20 pb-10">
      <div className="flex flex-col items-center space-y-4">
        <div onClick={() => navigate('/profesional')} className="cursor-pointer">
          <img src="/clara-logo-white.png" alt="Logo" className="h-8 transform rotate-[-90deg]" />
        </div>
      </div>
      <nav className="flex-1 flex flex-col items-center justify-center space-y-4">
        <SidebarItem icon={Home} href="/profesional" />
      </nav>
      <Button
        dataTestId="avatar-button"
        variant={'tertiary'}
        className="mt-auto p-4 hover:bg-blue-500 rounded-lg transition-colors"
        onClick={() => navigate('/profesional/perfil')}
      >
        <img src="/avatar/lion-avatar.png" alt="Avatar" className="object-cover h-10" />
      </Button>
    </aside>
  )
}

export default AsideProfesional
