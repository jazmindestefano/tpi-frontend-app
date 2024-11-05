import { useNavigate } from 'react-router-dom'
import { House, LogOut, UserRound } from 'lucide-react'
import Button from '../common/buttons/Button'
import { useSpeakText } from '@/hooks/useSpeakText'

const Header = () => {
  const navigate = useNavigate()
  const speakText = useSpeakText()

  if (location.pathname === '/felicitaciones') {
    return null
  }

  return (
    <header className="flex justify-between items-start p-4 bg-gradient-to-b from-orange-100 to-transparent fixed w-full">
      {!location.pathname.includes('actividad') && (
        <div className="flex flex-col justify-center items-start gap-4" onClick={() => navigate('/')}>
          <img src={'/clara-logo.svg'} alt="Logo" className="h-16 cursor-pointer" />
        </div>
      )}
      {!location.pathname.includes('terminos-y-condiciones') &&
        !location.pathname.includes('politica-de-privacidad') && (
          <div className={`flex flex-row gap-4 ${location.pathname.includes('actividad') ? 'ml-auto' : ''}`}>
            {/* Resto de los botones */}
            <Button
              size={'square'}
              variant={'fourth'}
              onClick={() => navigate('/profesional')}
              onMouseEnter={() => speakText('Ir al Perfil Profesional')}
            >
              <UserRound color="white" />
            </Button>
            <Button
              size={'square'}
              variant={'secondary'}
              onClick={() => navigate('/logros')}
              onMouseEnter={() => speakText('Ir a Mis Logros')}
              className="achievements-button"
            >
              <img src="/pines/medalla.png" alt="Avatar" className="object-cover h-10" />
            </Button>
            {location.pathname !== '/perfil' && (
              <Button
                size={'square'}
                variant={'tertiary'}
                onClick={() => navigate(location.pathname !== '/perfil' ? '/perfil' : '/')}
                onMouseEnter={() => speakText('Ir a Mi Perfil')}
                className="profile-button"
              >
                <img src="/avatar/lion-avatar.png" alt="Avatar" className="object-cover h-10" />
              </Button>
            )}
            {location.pathname === '/' ? (
              <Button
                size={'square'}
                variant={'primary'}
                onMouseEnter={() => speakText('Salir de la Aplicación')}
                className="logout-button"
                onClick={() => {
                  localStorage.clear()
                  navigate('/login')
                }}
              >
                <LogOut className="text-white" />
              </Button>
            ) : (
              <Button
                size={'square'}
                variant={'tertiary'}
                onClick={() => navigate('/')}
                onMouseEnter={() => speakText('Ir a Mi Inicio')}
              >
                <House />
              </Button>
            )}
          </div>
        )}
    </header>
  )
}

export default Header
