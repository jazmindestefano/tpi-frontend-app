export const getCurrentDate = () => {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export const getCurrentAge = (birthDate: Date) => {
  const today = new Date()
  return today.getFullYear() - birthDate.getFullYear()
}
