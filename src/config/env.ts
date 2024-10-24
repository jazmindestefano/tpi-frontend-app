const env = {
  apiUrl: (() => {
    // Imprimir todas las variables de entorno disponibles
    console.log('Todas las variables de entorno:', import.meta.env)

    // Verificar si estamos en producción
    console.log('¿Es producción?:', import.meta.env.PROD)

    // Ver el valor específico de VITE_API_URL
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL)

    return import.meta.env.VITE_API_URL as string
  })()
}

export default env
