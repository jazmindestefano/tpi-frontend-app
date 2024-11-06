import { ChangeEvent, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@components/common/inputs/Input.tsx'
import Button from '@components/common/buttons/Button.tsx'
import { useLogin } from '@hooks/queries.ts'
import { useDispatch } from 'react-redux'
import { setToken } from '@redux/slices'
import { getMe } from '../http/queries.ts'

interface LoginFormData {
  username: string
  password: string
}

const LoginPage: FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ password: '', username: '' })
  const { mutateAsync } = useLogin()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
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
          } else {
            navigate('/')
          }
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-comfortaa bg-orange-100">
      <div className={'mb-6'}>
        <img src={'/clara-logo.svg'} alt="Logo" className="h-16 cursor-pointer" />
      </div>
      <div>
        <h1 className={'text-center font-bold text-2xl mb-4'}>Iniciar sesión</h1>
        <div className={'flex flex-col gap-4'}>
          <Input name={'username'} label={'Nombre de usuario'} onChange={handleChange} value={formData.username} />
          <Input
            name={'password'}
            label={'Contraseña'}
            type={'password'}
            onChange={handleChange}
            value={formData.password}
          />
          <Button onClick={handleLogin}>Iniciar sesión</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
