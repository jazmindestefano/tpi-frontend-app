import React from 'react'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="px-8 py-6 max-w-3xl mx-auto font-poppins">
      <h1 className="text-4xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos tu información al utilizar nuestra
        aplicación.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Información que Recopilamos</h2>
      <p className="mb-4">
        Recopilamos datos de identificación personal, datos de uso, y en algunos casos, grabaciones de audio para
        proporcionar funcionalidades específicas. Esto incluye, entre otros, nombre, correo electrónico, y datos de
        actividad.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Uso de la Información</h2>
      <p className="mb-4">
        Utilizamos tus datos para mejorar tu experiencia en la aplicación y para realizar análisis de rendimiento. Las
        grabaciones de audio y el uso de parlantes permiten optimizar la experiencia de usuario.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Protección de la Información</h2>
      <p className="mb-4">
        Implementamos medidas de seguridad para proteger tus datos contra accesos no autorizados. Estas incluyen el uso
        de encriptación y revisiones de seguridad periódicas.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Control de tus Datos</h2>
      <p className="mb-4">
        Puedes acceder, modificar o eliminar tus datos en cualquier momento desde la configuración de la aplicación o
        contactando a nuestro soporte. También puedes revocar el acceso al micrófono y parlantes si decides dejar de
        usar ciertas funciones.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Cambios en la Política de Privacidad</h2>
      <p className="mb-4">
        Nos reservamos el derecho a actualizar esta política cuando sea necesario. Te notificaremos en caso de cambios
        importantes. El uso continuado de la aplicación implica la aceptación de la política actualizada.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contacto</h2>
      <p className="mb-4">
        Si tienes preguntas o inquietudes, contáctanos a través de los canales de soporte de la aplicación.
      </p>
    </div>
  )
}

export default PrivacyPolicyPage
