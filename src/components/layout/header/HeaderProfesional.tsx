import { UserRound, Download, FolderDot, LogOut } from 'lucide-react'
import Button from '../../common/buttons/Button'
import { useNavigate } from 'react-router-dom'

const HeaderProfesional = () => {
  const navigate = useNavigate()
  return (
    <header className="top-4 right-4 flex gap-4 fixed z-50">
      <Button size={'square'} variant={'fourth'} onClick={() => navigate('/')}>
        <UserRound color="white" />
      </Button>
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
    </header>
  )
}

export default HeaderProfesional
