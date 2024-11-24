import { PublicRouteLayout, Button, Input } from '@components'
import { useValidateVerificationCode } from '@hooks'
import { ChangeEvent, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface EmailVerificationFormData {
  userEmail: string
  verificationCode: string
}

const EmailVerification: FC = () => {
  const { email } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<EmailVerificationFormData>({ userEmail: email!, verificationCode: '' })
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { mutateAsync } = useValidateVerificationCode()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleValidate = async () => {
    try {
      await mutateAsync({ email: formData.userEmail, code: formData.verificationCode })
      setShowModal(true)
      setErrorMessage('')
    } catch (error) {
      console.error(error)
      setErrorMessage('Error: El código de verificación es incorrecto o ha expirado.')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    navigate(`/login`)
  }

  return (
    <PublicRouteLayout>
      <h1 data-testid={'email-ver-title'} className={'text-center font-bold text-2xl mb-4'}>
        Verificación de tu Email
      </h1>
      <p data-testid={'email-ver-msg'}>Hemos enviado al correo email un código de verificación</p>
      <div className={'flex flex-col justify-center items-center gap-8'}>
        <div className="flex flex-col justify-center items-center gap-4">
          <Input
            dataTestId="email-ver-verificationCode-input"
            name={'verificationCode'}
            className="w-80 text-center"
            label={'Código de verificación'}
            onChange={handleChange}
            value={formData.verificationCode}
          />
        </div>
        <Button onClick={handleValidate} className="h-10 w-52" dataTestId="email-ver-verificationCode">
          Verificar código
        </Button>

        {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="space-y-10 w-[50%] text-center flex flex-col justify-center items-center bg-orange-50 p-6 rounded-lg shadow-lg h-96">
            <h1 className={'text-center font-bold text-3xl mb-4'}>¡Email verificado!</h1>
            <p className="w-[70%] text-xl">
              Hemos iniciado un proceso de verificación de tu credencial profesional. Te avisaremos por mail cuando
              hayamos terminado la evaluación.
            </p>
            <div className={'flex flex-col justify-center items-center gap-8'}>
              <Button onClick={closeModal} className="h-10 px-5 text-lg" dataTestId="email-ver-back-button">
                Volver a la página principal
              </Button>
            </div>
          </div>
        </div>
      )}
    </PublicRouteLayout>
  )
}

export default EmailVerification
