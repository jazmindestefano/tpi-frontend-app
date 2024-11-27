import { FC } from 'react'
import { X } from 'lucide-react'
import { useGetAvatars } from '@hooks'
import { Loader } from '@components'
import { useDispatch } from 'react-redux'
import { setAvatar } from '@redux/slices'

interface ImageSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (avatarId: number) => void
  patientId: number
}

const ImageSelectionModal: FC<ImageSelectionModalProps> = ({ isOpen, onClose, onSelectImage, patientId }) => {
  const { avatars, isLoading, error } = useGetAvatars(patientId)
  const dispatch = useDispatch()

  if (!isOpen) return null

  if (isLoading) return <Loader />

  if (error) return <div>Error al cargar los avatares</div>

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seleccionar Avatar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {!error &&
            !isLoading &&
            avatars &&
            avatars.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelectImage(image.id)
                  dispatch(setAvatar(image.achievementName))
                }}
                className="p-2 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src={image.achievementName}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-auto rounded-full"
                  style={{ filter: image.unlocked ? 'none' : 'grayscale(100%)' }}
                />
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSelectionModal
