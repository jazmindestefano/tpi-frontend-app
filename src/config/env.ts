const env = {
  apiUrl: (() => {
    return import.meta.env.VITE_API_URL as string
  })()
}

export default env
