import { PublicRouteLayout } from '@components'
import Button from '@components/common/buttons/Button'
import { Input } from '@components/common/inputs/Input'
import { ChangeEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface EmailVerificationFormData {
  userEmail: string
  verificationCode: string
}

const EmailVerification = () => {
  const { email } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<EmailVerificationFormData>({ userEmail: email!, verificationCode: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        <Button onClick={() => navigate(`/professional-credential-verification`)} className="h-10 w-52">
          Verificar código
        </Button>
      </div>
    </PublicRouteLayout>
  )
}

export default EmailVerification
