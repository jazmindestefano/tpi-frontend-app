import { Button, HomeProfesionalCard } from '@components'
import { getCurrentDate } from '@helpers'
import { useCurrentUser, useGetProfessionalPatients } from '@hooks'
import { RefreshCcw } from 'lucide-react'
import { FC } from 'react'

const HomeProfesionalPage: FC = () => {
  const user = useCurrentUser()
  const { patients, error, isLoading, refetch } = useGetProfessionalPatients(user.id)

  return !error && !isLoading && patients ? (
    <div className="flex flex-col items-start justify-start gap-4 p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hola, {user.username.substring(0, user.username.indexOf('@'))}!</h1>
          <p className="text-gray-500 font-semibold">{getCurrentDate().toUpperCase()}</p>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-start items-center gap-4">
          <h2 className="text-2xl font-semibold">Pacientes</h2>
          <Button className="bg-transparent hover:bg-transparent" onClick={() => refetch()}>
            <RefreshCcw size={'30'} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-10 lg:px-10 lg:py-6">
          <HomeProfesionalCard isAddPatient={true} />
          {patients.map((patient) => (
            <HomeProfesionalCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-full mt-5">
      <p className="text-2xl font-bold">No hay pacientes asignados</p>
      <p className="text-gray-500">Agrega pacientes para comenzar a trabajar</p>
    </div>
  )
}

export default HomeProfesionalPage
