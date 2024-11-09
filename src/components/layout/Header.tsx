import { useNavigate } from 'react-router-dom'
import { House, LogOut } from 'lucide-react'
import Button from '../common/buttons/Button'
import { Tooltip } from 'react-tooltip'

const Header = () => {
  const navigate = useNavigate()

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
            <div data-tooltip-id="logros">
              <Button
                dataTestId="logros-button"
                size={'square'}
                variant={'secondary'}
                onClick={() => navigate('/logros')}
                className="achievements-button"
                data-tip="Ir a Mis Logros"
              >
                <img src="/pines/medalla.png" alt="Medalla" className="object-cover h-10" />
              </Button>
              <Tooltip id="logros" content="Ir a mis Logros" variant="dark" place="bottom" />
            </div>
            {location.pathname !== '/perfil' && (
              <div data-tooltip-id="perfil">
                <Button
                  dataTestId="perfil-button"
                  size={'square'}
                  variant={'tertiary'}
                  onClick={() => navigate(location.pathname !== '/perfil' ? '/perfil' : '/')}
                  className="profile-button"
                  data-tip="Ir a Mi Perfil"
                >
                  <img src="/avatar/lion-avatar.png" alt="Avatar" className="object-cover h-10" />
                </Button>
                <Tooltip id="perfil" content="Ir a mi Perfil" variant="dark" place="bottom" />
              </div>
            )}
            {location.pathname === '/' && (
              <div data-tooltip-id="logout">
                <Button
                  dataTestId="logout-button"
                  size={'square'}
                  variant={'primary'}
                  className="logout-button"
                  onClick={() => {
                    localStorage.clear()
                    navigate('/login')
                  }}
                  data-tip="Salir de la aplicación"
                >
                  <LogOut className="text-white" />
                </Button>
                <Tooltip id="logout" content="Salir de la aplicación" variant="dark" place="bottom" />
              </div>
            )}
            {location.pathname !== '/' && (
              <div data-tooltip-id="house">
                <Button
                  dataTestId="home-button"
                  size={'square'}
                  variant={'tertiary'}
                  onClick={() => navigate('/')}
                  data-tip="Ir a Mi Inicio"
                >
                  <House />
                </Button>
                <Tooltip id="house" content="Ir a Mi Inicio" variant="dark" place="bottom" />
              </div>
            )}
          </div>
        )}
    </header>
  )
}

export default Header
