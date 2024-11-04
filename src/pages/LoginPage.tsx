import { ChangeEvent, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@components/common/inputs/Input.tsx'
import Button from '@components/common/buttons/Button.tsx'
import { useLogin } from '@hooks/queries.ts'

interface LoginFormData {
  username: string
  password: string
}

const LoginPage: FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ password: '', username: '' })
  const { mutateAsync } = useLogin()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
    mutateAsync(formData)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res)
          navigate('/')
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <div className={'flex flex-col gap-4 w-1/2'}>
        <Input name={'username'} label={'Nombre de usuario'} onChange={handleChange} value={formData.username} />
        <Input name={'password'} label={'Contraseña'} onChange={handleChange} value={formData.password} />
        <Button onClick={handleLogin}>Iniciar sesión</Button>
      </div>
    </div>
  )
}

export default LoginPage
