import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'
import { useNavigate } from 'react-router-dom'
import { prepareData, validateTheme, navigateToCongratulations } from '../../../pages/games/gameHelper'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

vi.mock('../../../hooks/selectors')
vi.mock('../../../hooks/queries')
vi.mock('../../../hooks/useSpeakText', () => ({
  useSpeakText: vi.fn(() => vi.fn())
}))

const mockNavigate = useNavigate as Mock

describe('Funciones auxiliares de AuditoryDiscriminationGame', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('prepareData crea la estructura de datos correctamente', () => {
    const data = prepareData({ patiendId: 1, activityId: 2, selectedOption: 3 })
    expect(data).toEqual({
      patientId: 1,
      activities: [{ activityId: 2, selectedOption: 3 }]
    })
  })

  it('validateTheme navega a "/error" si themeId es -1', () => {
    validateTheme(-1, mockNavigate)
    expect(mockNavigate).toHaveBeenCalledWith('/error')
  })

  it('navigateToCongratulations navega a "/felicitaciones" si el nivel actual es el último', () => {
    navigateToCongratulations(2, 3, mockNavigate)
    expect(mockNavigate).toHaveBeenCalledWith('/felicitaciones')
  })
})
