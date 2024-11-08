import Button from '@components/common/buttons/Button'
import { useNavigate } from 'react-router-dom'

const ProfesionalCredentialVerification = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-comfortaa bg-orange-100">
      <div className={'mb-16'}>
        <img src={'/clara-logo.svg'} alt="Logo" className="h-32 cursor-pointer" />
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-16">
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
    </div>
  )
}

export default ProfesionalCredentialVerification
