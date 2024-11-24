import { Download, FolderDot, House, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { useGetPacientReportPdf, useGetPacientReportTimeline } from '@hooks'
import { FC, useEffect, useState } from 'react'
import { Button } from '@components'

interface HeaderProps {
  isProfessional: boolean
  patientId?: number
}

const Header: FC<HeaderProps> = ({ isProfessional, patientId }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { reportPdf, error: pdfError, isLoading: pdfLoading } = useGetPacientReportPdf(patientId)
  const { reportTimeline, error: timelineError, isLoading: timelineLoading } = useGetPacientReportTimeline(patientId)

  const [reportUrl, setReportUrl] = useState<string>('')

  useEffect(() => {
    const isTimeline = location.pathname.includes('/timeline')

    if (isTimeline && reportTimeline && !timelineError && !timelineLoading) {
      setReportUrl(URL.createObjectURL(reportTimeline))
    } else if (!isTimeline && reportPdf && !pdfError && !pdfLoading) {
      setReportUrl(URL.createObjectURL(reportPdf))
    }
  }, [location.pathname, pdfError, pdfLoading, reportPdf, timelineError, timelineLoading, reportTimeline])

  if (location.pathname === '/felicitaciones') {
    return null
  }

  return (
    <header className="flex justify-between items-start p-4 bg-gradient-to-b from-orange-100 to-transparent fixed w-full z-50">
      {!location.pathname.includes('actividad') && !isProfessional && (
        <div className="flex flex-col justify-center items-start gap-4" onClick={() => navigate('/')}>
          <img src={'/clara-logo.svg'} alt="Logo" className="h-16 cursor-pointer" />
        </div>
      )}

      {!location.pathname.includes('terminos-y-condiciones') &&
        !location.pathname.includes('politica-de-privacidad') && (
          <div className={`flex flex-row gap-4 ${location.pathname.includes('actividad') ? 'ml-auto' : ''}`}>
            {!isProfessional && (
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
            )}
            {!isProfessional && location.pathname !== '/perfil' && (
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
            {!isProfessional && location.pathname === '/' && (
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
            {location.pathname !== '/' && !isProfessional && (
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

      {isProfessional && (
        <div className="top-4 right-4 flex gap-4 fixed z-50">
          {location.pathname.match(/\/profesional\/paciente\/(\d+)(\/timeline)?$/)?.[1] && (
            <div data-tooltip-id="pdf">
              <a href={reportUrl} download={`reporte-paciente-${patientId}.pdf`}>
                <Button size={'square'} variant={'fourth'} dataTestId="download-button">
                  <Download className="text-white" />
                </Button>
              </a>
              <Tooltip id="pdf" content="Generar reporte de gráficos" variant="dark" place="bottom" />
            </div>
          )}
          {location.pathname !== '/profesional' && (
            <div data-tooltip-id="actividades">
              <Button
                dataTestId="folder-button"
                size={'square'}
                variant={'secondary'}
                onClick={() => navigate(`/profesional/paciente/${patientId}/actividades`)}
              >
                <FolderDot className="text-white" />
              </Button>
              <Tooltip id="actividades" content="Ir a respuestas de actividades" variant="dark" place="bottom" />
            </div>
          )}
          <div data-tooltip-id="logout">
            <Button
              dataTestId="professional-logout-button"
              size={'square'}
              variant={'primary'}
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
            >
              <LogOut className="text-white" />
            </Button>
            <Tooltip id="logout" content="Salir de la aplicación" variant="dark" place="bottom" />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
