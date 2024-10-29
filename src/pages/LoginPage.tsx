import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/buttons/Button.tsx'

export const LoginPage: FC = () => {
  const navigate = useNavigate()

  return <Button onClick={() => navigate('/')}>Login</Button>
}
