import { Step } from 'react-joyride'

export const steps: Step[] = [
  {
    target: '.logout-button',
    content: 'Puedes salir de la aplicación con este botón',
    placement: 'bottom',
    disableBeacon: true
  },
  {
    target: '.profile-button',
    content: 'Puedes ir a tu perfil con este botón',
    placement: 'bottom',
    disableBeacon: true
  },
  {
    target: '.achievements-button',
    content: 'Puedes ir a tus logros con este botón',
    placement: 'bottom',
    disableBeacon: true
  },
  {
    target: '.volume-icon',
    content: 'Puedes escuchar el nombre de los juegos con este botón',
    placement: 'bottom',
    disableBeacon: true
  }
  // Agrega más pasos si es necesario
]
