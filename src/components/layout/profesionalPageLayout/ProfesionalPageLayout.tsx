import { LucideIcon, Users, LogOut, Download, FolderDot } from 'lucide-react' // Asegúrate de importar LogOut
import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../../common/buttons/Button'

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
    <button onClick={handleClick} className="p-4 hover:bg-blue-600 rounded-lg transition-colors">
      <Icon className="text-white" size={24} />
    </button>
  )
}

export default function Layout() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-100 font-comfortaa">
      <aside className="w-32 bg-blue-500 flex flex-col items-center pt-20 pb-10">
        <div className="flex flex-col items-center space-y-4">
          <div onClick={() => navigate('/profesional')} className="cursor-pointer">
            <img src="/clara-logo-white.png" alt="Logo" className="h-8 transform rotate-[-90deg]" />
          </div>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center space-y-4">
          <SidebarItem icon={Users} href="/profesional" />
        </nav>
        <Button variant={'tertiary'} className="mt-auto p-4 hover:bg-blue-500 rounded-lg transition-colors">
          <img src="/avatar/lion-avatar.png" alt="Avatar" className="object-cover h-10" />
        </Button>
      </aside>
      <main className="flex-1 p-8 overflow-auto relative">
        <div className="absolute top-4 right-4 flex gap-4">
          <Button size={'square'} variant={'tertiary'}>
            {/* exportar */}
            <Download className="text-white" />
          </Button>
          <Button size={'square'} variant={'secondary'} onClick={() => navigate('/profesional/paciente/1/actividades')}>
            {/* actividades */}
            <FolderDot className="text-white" />
          </Button>
          <Button size={'square'} variant={'primary'}>
            <LogOut className="text-white" />
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
