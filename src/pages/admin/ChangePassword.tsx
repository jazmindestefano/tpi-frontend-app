import { Input, Button, PublicRouteLayout } from '@components'
import { useChangeOneTimePassword, useCurrentUser, usePasswordVisibility } from '@hooks'
import { useState, ChangeEvent, FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@redux/slices'

const ChangePassword: FC = () => {
  console.log('ChangePassword')
  const [formData, setFormData] = useState<{ password: string }>({ password: '' })
  const navigate = useNavigate()
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility()
  const { mutate, isSuccess, error } = useChangeOneTimePassword()
  const user = useCurrentUser()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = () => {
    console.log('ChangePassword', 'handleChangePassword', formData)
    mutate({ newPassword: formData.password, id: user.id, role: user.role })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ ...user, hasOneTimePassword: false }))
      navigate('/hub')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, navigate, dispatch])

  return (
    <PublicRouteLayout>
      <h1 className={'text-center font-bold text-2xl mb-10'}>Cambiar contraseña de una vez</h1>
      <p className="text-xl text-center w-[80%]">
        La contraseña con la que iniciaste sesión solo se puede usar una vez, necesitamos que la cambies por una
        permanente
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
          Cambiar contraseña
        </Button>
        {error && <p className="text-red-500">Las contraseñas deben ser diferentes</p>}
      </div>
    </PublicRouteLayout>
  )
}

export default ChangePassword
