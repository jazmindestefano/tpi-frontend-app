import { Download, FolderDot, LogOut } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../common/buttons/Button'
import { useExportPdf } from '@/hooks/queries'
import { useEffect, useState } from 'react'

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
      <Button size={'square'} variant={'tertiary'} onClick={handleDownload}>
        <Download className="text-white" />
      </Button>
      <Button size={'square'} variant={'secondary'} onClick={() => navigate('/profesional/paciente/1/actividades')}>
        <FolderDot className="text-white" />
      </Button>
      <Button
        size={'square'}
        variant={'primary'}
        onClick={() => {
          localStorage.clear()
          navigate('/login')
        }}
      >
        <LogOut className="text-white" />
      </Button>
    </header>
  )
}

export default HeaderProfesional
