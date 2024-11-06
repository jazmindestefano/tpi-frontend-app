export const getCurrentDate = () => {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export const getCurrentAge = (birthDate: string) => {
  const birth = new Date(birthDate)
  const today = new Date()
  return today.getFullYear() - birth.getFullYear()
}
