import { Input, Button, PublicRouteLayout } from '@components'
import { useChangeOneTimePassword, usePasswordVisibility } from '@hooks'
import { getMe } from '@http'
import { useState, ChangeEvent, FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword: FC = () => {
  const [formData, setFormData] = useState<{ password: string }>({ password: '' })
  const navigate = useNavigate()
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility()
  const { mutateAsync, isSuccess, error } = useChangeOneTimePassword()
  const [userRole, setUserRole] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = async () => {
    const user = await getMe()
    console.log({ user })
    setUserRole(user.role)
    await mutateAsync({ newPassword: formData.password, id: user.id, role: user.role })
  }

  useEffect(() => {
    if (isSuccess) {
      if (userRole === 'PROFESSIONAL') {
        navigate('/profesional')
      } else if (userRole === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/terminos-y-condiciones')
      }
      setFormData({ password: '' })
    }
  }, [isSuccess, userRole, navigate])

  return (
    <PublicRouteLayout>
      <h1 className={'text-center font-bold text-2xl mb-10'}>Cambiar contraseña de una vez</h1>
      <p className="text-xl text-center w-[80%]">
        La contraseña con la que te acabas de logguear es una contraseña para una vez, necesitamos que la cambies para
        poder completar el inicio de sesión
      </p>
      <div className={'flex flex-col justify-center items-center gap-4'}>
        <div className="flex flex-col justify-center items-center gap-4 my-10">
          <Input
            name={'password'}
            label={'Ingresa una nueva contraseña'}
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={formData.password}
            className="w-80 px-4"
            showToggle
            onToggleClick={togglePasswordVisibility}
            toggleState={showPassword}
            dataTestId="password-input"
          />
        </div>
        <Button onClick={handleChangePassword} className="h-10 px-4" dataTestId="logout-button">
          Cambiar contraseña e Iniciar Sesión
        </Button>
        {error && <p className="text-red-500">Las contraseñas deben ser diferentes</p>}
      </div>
    </PublicRouteLayout>
  )
}

export default ChangePassword
