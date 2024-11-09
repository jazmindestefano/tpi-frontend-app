import { useState } from 'react'

const usePasswordVisbility = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return {
    showPassword,
    togglePasswordVisibility
  }
}

export default usePasswordVisbility
