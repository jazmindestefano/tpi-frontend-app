import { useState } from 'react'
import { LogOut, Search, X } from 'lucide-react'
import { useGetProfessionals } from '@hooks/queries'
import SpinnerLoader from '@components/common/SpinnerLoader'
import Button from '@components/common/buttons/Button'
import { useNavigate } from 'react-router-dom'

type Statuses = {
  [key: number]: { text: string; color: string }
}

const getVerificationStatus = (id: number) => {
  const statuses: Statuses = {
    1: { text: 'Sin verificar', color: 'bg-gray-200' },
    2: { text: 'Pendiente', color: 'bg-yellow-200' },
    3: { text: 'Rechazado', color: 'bg-red-200' },
    4: { text: 'Verificado', color: 'bg-green-200' }
  }
  return statuses[id] || statuses[1]
}

const HomeAdminPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [stateIdFilter, setStateIdFilter] = useState<number | null>(null)
  const { data: professionals, isLoading, error } = useGetProfessionals(stateIdFilter)

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateIdFilter(Number(e.target.value) || null)
  }

  const filteredProfessionals = professionals?.filter((prof) =>
    prof.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 w-full flex justify-center items-center flex-col">
      <Button
        size={'square'}
        variant={'primary'}
        className="logout-button self-end"
        onClick={() => {
          localStorage.clear()
          navigate('/login')
        }}
      >
        <LogOut className="text-white" />
      </Button>
      <h1 className="text-2xl font-bold mb-6">Clara Admin</h1>

      <div className="mb-4 w-[50%]">
        <select className="w-full p-2 border rounded-lg" value={stateIdFilter || ''} onChange={handleStateChange}>
          <option value="">Selecciona un estado</option>
          <option value={1}>Sin verificar</option>
          <option value={2}>Pendiente</option>
          <option value={3}>Rechazado</option>
          <option value={4}>Verificado</option>
        </select>
      </div>

      <div className="mb-4 relative w-[50%]">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {error && <div className="w-full bg-red-200 text-red-800 p-2 mb-4 rounded-md">Error: {error.message}</div>}

      {isLoading && <SpinnerLoader />}

      {!isLoading && !error && filteredProfessionals && (
        <div className="overflow-x-auto w-[80%]">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apellido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProfessionals.map((professional) => (
                <tr key={professional.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{professional.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{professional.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{professional.surname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{professional.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getVerificationStatus(professional.stateId).color}`}
                    >
                      {getVerificationStatus(professional.stateId).text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={`/api/placeholder/50/50`}
                      alt={`Perfil de ${professional.name}`}
                      className="h-10 w-10 rounded-full cursor-pointer"
                      onClick={() => setSelectedImage(professional.image)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-medium">Imagen de perfil</h3>
              <button onClick={() => setSelectedImage(null)} className="text-gray-400 hover:text-gray-500">
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <img src={`/api/placeholder/400/400`} alt="Perfil ampliado" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeAdminPage