import { Download, FolderDot, LogOut } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../common/buttons/Button'
import { useExportPdf } from '@/hooks/queries'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'

const HeaderProfesional = () => {
  const { patientId } = useParams()
  const [readyToFetch, setReadyToFetch] = useState(false)
  const { pdf, error, isLoading } = useExportPdf(readyToFetch ? Number(patientId) : 0)
  const navigate = useNavigate()

  useEffect(() => {
    if (patientId) {
      setReadyToFetch(true)
    }
  }, [patientId])

  // to-do: move to custom hook
  const handleDownload = () => {
    if (pdf && !error && !isLoading) {
      const blob = pdf instanceof Blob ? pdf : new Blob([pdf], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setTimeout(() => URL.revokeObjectURL(url), 100)
    }
  }

  return (
    <header className="top-4 right-4 flex gap-4 fixed z-50">
      <div data-tooltip-id="pdf">
        <Button size={'square'} variant={'fourth'} onClick={handleDownload} dataTestId="download-button">
          <Download className="text-white" />
        </Button>
        <Tooltip id="pdf" content="Generar reporte de gráficos" variant="dark" place="bottom" />
      </div>
      <div data-tooltip-id="actividades">
        <Button
          dataTestId="folder-button"
          size={'square'}
          variant={'secondary'}
          onClick={() => navigate('/profesional/paciente/1/actividades')}
        >
          <FolderDot className="text-white" />
        </Button>
        <Tooltip id="actividades" content="Ir a respuestas de actividades" variant="dark" place="bottom" />
      </div>
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
    </header>
  )
}

export default HeaderProfesional
