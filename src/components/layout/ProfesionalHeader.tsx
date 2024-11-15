import { useParams } from 'react-router-dom'
import { FC } from 'react'
import { Header } from '@components'

const ProfesionalHeader: FC = () => {
  const { patientId } = useParams()
  return <Header isProfessional={true} patientId={patientId ? Number(patientId) : undefined} />
}

export default ProfesionalHeader
