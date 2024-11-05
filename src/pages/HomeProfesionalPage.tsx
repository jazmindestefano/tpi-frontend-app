import HomeProfesionalCard from '@/components/common/cards/ProfesionalHomeCard'
import { useGetProfessionalPatients } from '@/hooks/queries'
import { useParams } from 'react-router-dom'

const HomeProfesionalPage = () => {
  const { profesionalId } = useParams()
  const { patients, error, isLoading } = useGetProfessionalPatients(parseInt(profesionalId!))

  return !error && !isLoading && patients ? (
    <div className="flex flex-col items-start justify-start gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hola, Profesional!</h1>
          <p className="text-gray-500">18 de Octubre 2024, Miércoles</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Pacientes</h2>
        <div className="flex flex-wrap gap-10 lg:px-10 lg:py-6">
          <HomeProfesionalCard isAddPatient={true} />
          {patients.map((patient) => (
            <HomeProfesionalCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-2xl font-bold">No hay pacientes asignados</p>
      <p className="text-gray-500">Agrega pacientes para comenzar a trabajar</p>
    </div>
  )
}

export default HomeProfesionalPage
