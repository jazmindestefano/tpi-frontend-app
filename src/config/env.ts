const env = {
  apiUrl: (() => {
    return import.meta.env.VITE_API_URL as string
  })(),
  profile: (import.meta.env.VERCEL_ENV as string) || 'dev'
}

export default env
