import { PublicRouteLayout, Button, Input } from '@components'
import { useRegister } from '@hooks'
import { RegisterFormData } from '@interfaces'
import { ChangeEvent, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useRegister()
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    surname: '',
    email: '',
    professionalCredential: new File([], '')
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = () => {
    mutateAsync({ formData })
    navigate(`/email-verification/${formData.email}`)
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
          {formData.professionalCredential && formData.professionalCredential.name && (
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
        <Button onClick={handleRegister} className="h-10 w-52">
          Registrarse
        </Button>
      </div>
    </PublicRouteLayout>
  )
}

export default RegisterPage
