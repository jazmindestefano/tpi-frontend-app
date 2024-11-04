export const getCurrentDate = () => {
  return new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export const getCurrentAge = (birthDate: string) => {
  const today = new Date()
  const birth = new Date(birthDate)
  return today.getFullYear() - birth.getFullYear()
}
