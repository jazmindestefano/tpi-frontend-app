import { ChangeEvent, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '@redux/slices'
import { usePasswordVisibility, useLogin } from '@hooks'
import { getMe } from '@http'
import { PublicRouteLayout, Button, Input } from '@components'

interface LoginFormData {
  username: string
  password: string
}

const LoginPage: FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ password: '', username: '' })
  const [error, setError] = useState<string | null>(null)
  const { mutateAsync } = useLogin()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
    setError(null)
    mutateAsync(formData)
      .then((token) => {
        if (token) {
          dispatch(setToken(token))
        }
      })
      .then(async () => {
        const user = await getMe()
        if (user) {
          if (user.role === 'PROFESSIONAL') {
            navigate('/profesional')
          } else if (user.role === 'ADMIN') {
            navigate('/admin')
          } else {
            navigate('/')
          }
        }
      })
      .catch((e) => {
        setError('Credenciales inválidas. Por favor, intenta nuevamente.')
        console.error(e)
      })
  }

  return (
    <PublicRouteLayout>
      <h1 className={'text-center font-bold text-2xl mb-4'}>Iniciar sesión</h1>
      <div className={'flex flex-col justify-center items-center gap-8'}>
        <div className="flex flex-col justify-center items-center gap-4">
          <Input
            name={'username'}
            className="w-80"
            label={'Nombre de usuario'}
            onChange={handleChange}
            value={formData.username}
          />
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
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleLogin} className="h-10 w-52">
          Iniciar sesión
        </Button>
        <p className="text-sm">
          ¿Todavia no tenes una cuenta?{' '}
          <a href="/register" className="font-semibold underline">
            Registrate acá!
          </a>
        </p>
      </div>
    </PublicRouteLayout>
  )
}

export default LoginPage
