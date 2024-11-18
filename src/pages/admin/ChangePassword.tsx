import { Input, Button, PublicRouteLayout } from '@components'
import { useChangeOneTimePassword, usePasswordVisibility } from '@hooks'
import { getMe } from '@http'
import { useState, ChangeEvent, FC } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword: FC = () => {
  const [formData, setFormData] = useState<{ password: string }>({ password: '' })
  const navigate = useNavigate()
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility()
  const { mutateAsync, isSuccess } = useChangeOneTimePassword()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = async () => {
    const user = await getMe()
    console.log({ user })
    await mutateAsync({ newPassword: formData.password, id: user.id, role: user.role })
    if (isSuccess) {
      if (user.role === 'PROFESSIONAL') {
        navigate('/profesional')
      } else if (user.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/terminos-y-condiciones')
      }
    }
  }

  return (
    <PublicRouteLayout>
      <h1 className={'text-center font-bold text-2xl mb-10'}>Cambiar contraseña de una vez</h1>
      <p>Te hemos enviado una contraseña de una vez a tu mail, necesitamos que la cambies para poder iniciar sesión</p>
      <div className={'flex flex-col justify-center items-center gap-4'}>
        <div className="flex flex-col justify-center items-center gap-4">
          <Input
            name={'password'}
            label={'Nueva Contraseña'}
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={formData.password}
            className="w-80"
            showToggle
            onToggleClick={togglePasswordVisibility}
            toggleState={showPassword}
            dataTestId="password-input"
          />
        </div>
        <Button onClick={handleChangePassword} className="h-10 px-4" dataTestId="logout-button">
          Cambiar contraseña e Iniciar Sesión
        </Button>
      </div>
    </PublicRouteLayout>
  )
}

export default ChangePassword
