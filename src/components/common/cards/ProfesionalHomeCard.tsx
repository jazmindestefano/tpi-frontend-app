import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import Button from '../buttons/Button'
import { useNavigate } from 'react-router-dom'
import AddPatientModal from '../modals/EmailInviteModal'
import { ProfesionalPatient } from '@/interfaces'
import { getCurrentAge } from '@helpers'

interface HomeProfesionalCardProps {
  patient?: ProfesionalPatient
  isAddPatient?: boolean
  className?: string
}

const getRandomImage = () => {
  const images = ['avatar/horse-avatar.png', 'avatar/lion-avatar.png', 'avatar/rabbit-avatar.png']
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

const HomeProfesionalCard = ({ patient, isAddPatient = false, className = '' }: HomeProfesionalCardProps) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddPatientClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSubmit = () => {
    setIsModalOpen(false)
  }

  const handleClick = (id: number) => {
    // to-do: create slicer in redux
    navigate(`paciente/${id}`)
  }

  return (
    <>
      <div
        className={`"max-w-96 flex flex-col justify-center items-center rounded-3xl h-80 w-72 shadow-lg cursor-pointer transition-transform duration-300 bg-blue-100 " ${className}`}
        onClick={isAddPatient ? handleAddPatientClick : undefined} // info: Solo para la tarjeta de agregar paciente
      >
        {isAddPatient ? (
          <div className="flex flex-col items-center justify-center p-4 gap-10">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-2">
              <PlusIcon className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-blue-500 font-bold">Agregar paciente</p>
          </div>
        ) : (
          patient && (
            <div className="flex flex-col justify-center items-center w-full p-4 gap-2">
              <img src={getRandomImage()} alt={patient.name} width={64} height={64} className="rounded-full mb-2" />
              <h3 className="text-lg font-medium text-blue-800">{patient.name}</h3>
              <p className="text-blue-600">{getCurrentAge(patient.birthDate)} años</p>
              <Button variant="secondary" className="mt-2 p-3 rounded-3xl" onClick={() => handleClick(patient.id!)}>
                <p className="text-center font-bold">Ver paciente</p>
              </Button>
            </div>
          )
        )}
      </div>

      <AddPatientModal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
    </>
  )
}

export default HomeProfesionalCard
