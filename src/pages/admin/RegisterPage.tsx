import { PublicRouteLayout } from '@components'
import Button from '@components/common/buttons/Button'
import { Input } from '@components/common/inputs/Input'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface RegisterFormData {
  name: string
  surname: string
  email: string
  professionalCredential: File | null
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    surname: '',
    email: '',
    professionalCredential: null
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <PublicRouteLayout>
      <h1 className={'text-center font-bold text-2xl mb-4'}>Registrarse</h1>
      <div className={'flex flex-col justify-center items-center gap-8'}>
        <div className="flex flex-col justify-center items-center gap-4">
          <Input name={'name'} className="w-80" label={'Nombre'} onChange={handleChange} value={formData.name} />
          <Input
            name={'surname'}
            className="w-80"
            label={'Apellido'}
            onChange={handleChange}
            value={formData.surname}
          />
          <Input
            name={'email'}
            label={'Email'}
            type={'email'}
            onChange={handleChange}
            value={formData.email}
            className="w-80"
          />
          <Input
            name={'professionalCredential'}
            label={'Credencial Profesional'}
            type={'file'}
            className={'bg-transparent border-none'}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, professionalCredential: e.target.files ? e.target.files[0] : null }))
            }
          />
          {formData.professionalCredential && (
            <div className="flex flex-col items-center">
              <span>{formData.professionalCredential.name}</span>
              <Button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, professionalCredential: null }))
                  const fileInput = document.querySelector('input[name="professionalCredential"]') as HTMLInputElement
                  if (fileInput) {
                    fileInput.value = ''
                  }
                }}
                className="h-10 w-52"
              >
                Eliminar archivo
              </Button>
            </div>
          )}
        </div>
        <Button
          onClick={() => formData.email && navigate(`/email-verification/${formData.email}`)}
          className="h-10 w-52"
        >
          Registrarse
        </Button>
      </div>
    </PublicRouteLayout>
  )
}

export default RegisterPage
