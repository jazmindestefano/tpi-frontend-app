import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'

interface BackButtonProps {
  text: string
  route: string
  dataTestId?: string
}

const BackButton: FC<BackButtonProps> = ({ text, route, dataTestId }) => {
  const navigate = useNavigate()
  return (
    <button
      data-testid={dataTestId}
      onClick={() => navigate(route)}
      className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
      aria-label={text}
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      <span className="text-xl">{text}</span>
    </button>
  )
}

export default BackButton
