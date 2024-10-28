import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RecordGame from '../../../pages/games/RecordGame'
import { validateThemeAndNavigate, goToNextLevel, getContainerClass } from '../../../pages/games/gameHelper.ts'
import { BrowserRouter } from 'react-router-dom'

vi.mock('../../../hooks/useRecordGame.hook', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    isLoading: false,
    levels: [{ id: 1 }, { id: 2 }],
    currentLevel: 0,
    levelOptions: [{ id: '1', name: 'option1' }],
    setCurrentLevel: vi.fn(),
    isRecording: false,
    stopRecording: vi.fn(),
    startRecording: vi.fn()
  }))
}))

vi.mock('../../../hooks/selectors.ts', () => ({
  useSelectedTheme: vi.fn(() => ({ id: 1 }))
}))

vi.mock('../../../hooks/useMediaQuery.ts', () => ({
  default: vi.fn(() => ({ isDesktop: true }))
}))

describe('Auxiliary Functions', () => {
  it('validateThemeAndNavigate redirects to "/error" if themeId is -1', () => {
    const mockNavigate = vi.fn()
    validateThemeAndNavigate(-1, mockNavigate)
    expect(mockNavigate).toHaveBeenCalledWith('/error')
  })

  it('validateThemeAndNavigate does not redirect if themeId is valid', () => {
    const mockNavigate = vi.fn()
    validateThemeAndNavigate(1, mockNavigate)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('goToNextLevel increments level when not at last level', () => {
    const mockSetCurrentLevel = vi.fn()
    const mockNavigate = vi.fn()
    goToNextLevel(0, 2, mockSetCurrentLevel, mockNavigate)
    expect(mockSetCurrentLevel).toHaveBeenCalledWith(1)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('goToNextLevel navigates to "/felicitaciones" if at last level', () => {
    const mockSetCurrentLevel = vi.fn()
    const mockNavigate = vi.fn()
    goToNextLevel(1, 2, mockSetCurrentLevel, mockNavigate)
    expect(mockNavigate).toHaveBeenCalledWith('/felicitaciones')
  })

  it('getContainerClass returns correct class for desktop and mobile', () => {
    expect(getContainerClass(true)).toBe('w-9/10 flex-center')
    expect(getContainerClass(false)).toBe('flex-col-center gap-10')
  })
})

describe('RecordGame Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RecordGame />
      </BrowserRouter>
    )
    expect(screen.getByText('¿Cómo dirías la palabra?')).toBeInTheDocument()
  })
})
