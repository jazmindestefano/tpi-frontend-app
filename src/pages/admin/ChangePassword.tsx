import Button from '@components/common/buttons/Button'
import { Input } from '@components/common/inputs/Input'
import { usePasswordVisbility } from '@hooks'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const [formData, setFormData] = useState<{ password: string }>({ password: '' })
  const navigate = useNavigate()
  const { showPassword, togglePasswordVisibility } = usePasswordVisbility()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col justify-start pt-20 space-y-28 items-center font-comfortaa bg-orange-100">
      <div>
        <img src={'/clara-logo.svg'} alt="Logo" className="h-32 cursor-pointer" />
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-10">
        <h1 className={'text-center font-bold text-2xl mb-4'}>Cambiar contraseña de una vez</h1>
        <p>
          Te hemos enviado una contraseña de una vez a tu mail, necesitamos que la cambies para poder iniciar sesión
        </p>
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
            />
          </div>
          <Button onClick={() => navigate('/login')} className="h-10 px-4">
            Cambiar contraseña e Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
