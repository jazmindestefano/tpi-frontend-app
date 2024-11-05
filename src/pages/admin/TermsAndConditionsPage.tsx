import { useTermsAndConditions } from '@/hooks/queries'
import { useUser } from '@/hooks/selectors'

const TermsAndConditionsPage = () => {
  const { mutateAsync } = useTermsAndConditions()
  const { id } = useUser()

  const handleUpdateTerms = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      try {
        const result = await mutateAsync(id)
        console.log('Updated successfully:', result ? 'Yes' : 'No')
      } catch (error) {
        console.error('Error updating terms:', error)
      }
    }
  }

  return (
    <div className="px-8 py-6 max-w-3xl mx-auto font-poppins">
      <h1 className="text-4xl font-bold mb-6">Términos y Condiciones</h1>
      <p className="mb-4">
        Al utilizar esta aplicación, aceptas los siguientes términos y condiciones. Asegúrate de leerlos detenidamente
        antes de continuar.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Grabación de Audio y Uso de Parlantes</h2>
      <p className="mb-4">
        Al aceptar estos términos, consientes que la aplicación acceda a tu micrófono y a tus parlantes para grabar y
        reproducir sonidos cuando sea necesario para la funcionalidad del servicio.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Captura de Datos</h2>
      <p className="mb-4">
        La aplicación puede recopilar datos relacionados con tu interacción y uso de las funcionalidades, incluyendo
        información de actividad y respuestas. Estos datos se utilizan para mejorar tu experiencia y optimizar el
        rendimiento de la aplicación.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Modificaciones</h2>
      <p className="mb-4">
        Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento. Te notificaremos en
        caso de cambios significativos. Al continuar usando la aplicación después de cualquier actualización, aceptas
        los nuevos términos.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Contacto</h2>
      <p className="mb-4">
        Si tienes preguntas o inquietudes sobre estos términos, no dudes en contactarnos a través de los canales de
        soporte proporcionados en la aplicación.
      </p>
      <div className="mt-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 w-5 h-5"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateTerms(e)}
          />
          <span>
            He leído y acepto los términos y condiciones <span className="text-red-500">*</span>
          </span>
        </label>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage
