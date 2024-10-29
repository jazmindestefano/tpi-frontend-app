import Button from '../buttons/Button'
import { useNavigate } from 'react-router-dom'

export interface Activity {
  id: number
  name: string
}

interface ActivityCardProps {
  activity: Activity
  className?: string
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, className = '' }) => {
  const navigate = useNavigate()

  return (
    <div
      className={`max-w-96 flex flex-col justify-center items-center w-full rounded-3xl h-80 w-72 shadow-lg cursor-pointer transition-transform duration-300 bg-blue-100 ${className}`}
    >
      <div className="flex flex-col items-center justify-around h-full p-4">
        <h3 className="text-3xl font-extrabold text-blue-800">{activity.name}</h3>
        <Button
          variant="secondary"
          className="mt-2 p-3 rounded-3xl"
          onClick={() => navigate(`/profesional/paciente/1/actividades/${activity.id}`)}
          ariaLabel="Ver respuestas"
        >
          <p className="text-center font-bold">Ver respuestas</p>
        </Button>
      </div>
    </div>
  )
}
