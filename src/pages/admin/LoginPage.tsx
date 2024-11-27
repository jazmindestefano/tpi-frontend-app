import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBackground, setToken } from '@redux/slices'
import { usePasswordVisibility, useLogin } from '@hooks'
import { PublicRouteLayout, Button, Input } from '@components'

interface LoginFormData {
  username: string
  password: string
}

const LoginPage: FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ password: '', username: '' })
  const { mutate, error, token, isSuccess } = useLogin()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
    console.log('LoginPage', 'handleLogin', formData)
    mutate(formData)
  }

  useEffect(() => {
    if (isSuccess && token) {
      console.log('LoginPage', 'useEffect', 'isSuccess && token', token)
      dispatch(setToken(token))
      dispatch(setBackground('/fondo_clara.png'))
      navigate('/hub')
    }
  }, [dispatch, isSuccess, navigate, token])

  return (
    <PublicRouteLayout>
      <h1 data-testid="login-title" className="text-center font-bold text-2xl mb-4">
        Iniciar sesión
      </h1>
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <Input
            name="username"
            dataTestId="username-input"
            className="w-80"
            label="Nombre de usuario"
            onChange={handleChange}
            value={formData.username}
          />
          <Input
            name="password"
            dataTestId="password-input"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            value={formData.password}
            className="w-80"
            showToggle
            onToggleClick={togglePasswordVisibility}
            toggleState={showPassword}
          />
        </div>
        {error && (
          <p data-testid="error-message" className="text-red-500 text-sm">
            {'Credenciales inválidas. Por favor, intenta nuevamente.'}
          </p>
        )}
        <Button dataTestId="login-button" onClick={handleLogin} className="h-10 w-52">
          Iniciar sesión
        </Button>
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="text-sm">¿Todavía no tenés una cuenta?</p>
          <Button
            dataTestId="register-button"
            onClick={() => navigate('/registro')}
            className="font-semibold underline bg-transparent hover:bg-transparent"
          >
            Registrate acá!
          </Button>
        </div>
      </div>
    </PublicRouteLayout>
  )
}

export default LoginPage
