import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Header } from '@components'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    global.localStorage = {
      clear: vi.fn(),
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    } as unknown as Storage
  })

  it('should navigate to /logros when logros button is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const logrosButton = screen.getByTestId('logros-button')
    fireEvent.click(logrosButton)

    expect(mockNavigate).toHaveBeenCalledWith('/logros')
  })

  it('should navigate to /perfil when profile button is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const profileButton = screen.getByTestId('perfil-button')
    fireEvent.click(profileButton)

    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  it('should clear localStorage and navigate to /login when logout button is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const logoutButton = screen.getByTestId('logout-button')
    fireEvent.click(logoutButton)

    expect(localStorage.clear).toHaveBeenCalled()

    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
