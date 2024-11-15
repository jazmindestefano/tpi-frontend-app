import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ChangePassword } from '@pages'
import { ReactNode } from 'react'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    BrowserRouter: ({ children }: { children: ReactNode }) => <div>{children}</div>
  }
})

vi.mock('../../hooks/common/usePasswordVisibility', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    showPassword: false,
    togglePasswordVisibility: vi.fn()
  }))
}))

describe('ChangePassword Component', () => {
  it('changes password input value', () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )

    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement
    fireEvent.change(passwordInput, { target: { value: 'nuevacontraseña' } })
    expect(passwordInput.value).toBe('nuevacontraseña')
  })

  it('navigates to login on button click', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByTestId('logout-button'))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
