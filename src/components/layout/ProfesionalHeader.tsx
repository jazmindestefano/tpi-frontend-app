import { useParams } from 'react-router-dom'
import Header from './Header'

const ProfesionalHeader = () => {
  const { patientId } = useParams()
  return <Header isProfessional={true} patientId={patientId} />
}

export default ProfesionalHeader