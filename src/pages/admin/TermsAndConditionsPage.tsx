import { Button } from '@components'
import { useCurrentUser, usePatchTermsAndConditions } from '@hooks'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setUser } from '@redux/slices'

const TermsAndConditionsPage = () => {
  const navigate = useNavigate()
  const { mutate, isSuccess, isPending, error } = usePatchTermsAndConditions()
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const user = useCurrentUser()
  const dispatch = useDispatch()

  const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
    setButtonEnabled(event.target.checked)
  }

  const handleButtonClick = () => {
    if (buttonEnabled) {
      mutate({ patientId: user.id })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ ...user, hasAcceptTerms: true }))
      navigate('/hub')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isSuccess, navigate])

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      <div className="px-8 py-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Política de Privacidad</h1>
        <p className="mb-4 text-justify">
          Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos tu información al utilizar nuestra
          aplicación.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Información que recopilamos</h2>
        <p className="mb-4 text-justify">
          Recopilamos datos de identificación personal, datos de uso, y en algunos casos, grabaciones de audio para
          proporcionar funcionalidades específicas. Esto incluye, entre otros, nombre, correo electrónico, y datos de
          actividad.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Uso de la Información</h2>
        <p className="mb-4 text-justify">
          Utilizamos tus datos para mejorar tu experiencia en la aplicación y para realizar análisis de rendimiento. Las
          grabaciones de audio y el uso de parlantes permiten optimizar la experiencia de usuario.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Protección de la Información</h2>
        <p className="mb-4 text-justify">
          Implementamos medidas de seguridad para proteger tus datos contra accesos no autorizados. Estas incluyen el
          uso de encriptación y revisiones de seguridad periódicas.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Control de tus datos</h2>
        <p className="mb-4 text-justify">
          Puedes acceder, modificar o eliminar tus datos en cualquier momento desde la configuración de la aplicación o
          contactando a nuestro soporte. También puedes revocar el acceso al micrófono y parlantes si decides dejar de
          usar ciertas funciones.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Cambios en la Política de Privacidad</h2>
        <p className="mb-4 text-justify">
          Nos reservamos el derecho a actualizar esta política cuando sea necesario. Te notificaremos en caso de cambios
          importantes. El uso continuado de la aplicación implica la aceptación de la política actualizada.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contacto</h2>
        <p className="mb-4 text-justify">
          Si tienes preguntas o inquietudes, contáctanos a través de los canales de soporte de la aplicación.
        </p>
      </div>
      <div className="px-8 py-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Términos y Condiciones</h1>
        <p className="mb-4 text-justify">
          Al utilizar esta aplicación, aceptas los siguientes términos y condiciones. Asegúrate de leerlos detenidamente
          antes de continuar.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Grabación de audio y uso de parlantes</h2>
        <p className="mb-4 text-justify">
          Al aceptar estos términos, consientes que la aplicación acceda a tu micrófono y a tus parlantes para grabar y
          reproducir sonidos cuando sea necesario para la funcionalidad del servicio.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Captura de datos</h2>
        <p className="mb-4 text-justify">
          La aplicación puede recopilar datos relacionados con tu interacción y uso de las funcionalidades, incluyendo
          información de actividad y respuestas. Estos datos se utilizan para mejorar tu experiencia y optimizar el
          rendimiento de la aplicación.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Modificaciones</h2>
        <p className="mb-4 text-justify">
          Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento. Te notificaremos en
          caso de cambios significativos. Al continuar usando la aplicación después de cualquier actualización, aceptas
          los nuevos términos.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Contacto</h2>
        <p className="mb-4 text-justify">
          Si tienes preguntas o inquietudes sobre estos términos, no dudes en contactarnos a través de los canales de
          soporte proporcionados en la aplicación.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <label className="flex items-center">
            <input
              data-testid="terms-and-conditions-checkbox"
              type="checkbox"
              className="mr-2 w-5 h-5"
              required
              onChange={handleCheckboxClick}
            />
            <span>
              He leído y acepto los términos y condiciones <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            dataTestId="terms-and-condition-button"
            onClick={handleButtonClick}
            disabled={!buttonEnabled}
            className={`p-4 ${buttonEnabled ? 'bg-blue-600' : 'bg-gray-400'}`}
          >
            {isPending ? <LoaderCircle className="animate-spin mr-2" /> : null}
            Continuar
          </Button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">Hubo un error, intente nuevamente!</p>}
      </div>
    </div>
  )
}

export default TermsAndConditionsPage
