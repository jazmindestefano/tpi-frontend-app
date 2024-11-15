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
  const { mutateAsync } = useValidateVerificationCode()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleValidate = () => {
    mutateAsync({ email: formData.userEmail, code: formData.verificationCode })
    navigate(`/professional-credential-verification`)
  }

  return (
    <PublicRouteLayout>
      <h1 className={'text-center font-bold text-2xl mb-4'}>Verificación de tu Email</h1>
      <p>Hemos enviado al correo email un codigo de verificación</p>
      <div className={'flex flex-col justify-center items-center gap-8'}>
        <div className="flex flex-col justify-center items-center gap-4">
          <Input
            name={'verificationCode'}
            className="w-80 text-center"
            label={'Codigo de verificación'}
            onChange={handleChange}
            value={formData.verificationCode}
          />
        </div>
        <Button onClick={handleValidate} className="h-10 w-52">
          Verificar código
        </Button>
      </div>
    </PublicRouteLayout>
  )
}

export default EmailVerification
