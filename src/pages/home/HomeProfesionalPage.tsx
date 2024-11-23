import { HomeProfesionalCard } from '@components'
import { getCurrentDate } from '@helpers'
import { useUser, useGetProfessionalPatients } from '@hooks'
import { FC } from 'react'

const HomeProfesionalPage: FC = () => {
  const user = useUser()
  const { patients, error, isLoading } = useGetProfessionalPatients(user.id)

  return !error && !isLoading && patients ? (
    <div className="flex flex-col items-start justify-start gap-4 pt-20 px-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hola, {user.username.substring(0, user.username.indexOf('@'))}!</h1>
          <p className="text-gray-500 font-semibold">{getCurrentDate().toUpperCase()}</p>
        </div>
      </div>
      <div className="mt-5">
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
    <div className="flex flex-col items-center justify-center w-full h-full mt-5">
      <p className="text-2xl font-bold">No hay pacientes asignados</p>
      <p className="text-gray-500">Agrega pacientes para comenzar a trabajar</p>
    </div>
  )
}

export default HomeProfesionalPage
