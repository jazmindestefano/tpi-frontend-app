import { PublicRouteLayout } from '@components'
import Button from '@components/common/buttons/Button'
import { useNavigate } from 'react-router-dom'

const ProfesionalCredentialVerification = () => {
  const navigate = useNavigate()
  return (
    <PublicRouteLayout>
      <div className="space-y-10">
        <h1 className={'text-center font-bold text-2xl mb-4'}>Email verificado!</h1>
        <p>
          Hemos iniciado un proceso de verificación de tu credencial profesional. Te avisaremos por mail cuando hayamos
          terminado la evaluación!
        </p>
        <div className={'flex flex-col justify-center items-center gap-8'}>
          <Button onClick={() => navigate(`/login`)} className="h-10 px-5">
            Volver a la pagina principal
          </Button>
        </div>
      </div>
    </PublicRouteLayout>
  )
}

export default ProfesionalCredentialVerification
