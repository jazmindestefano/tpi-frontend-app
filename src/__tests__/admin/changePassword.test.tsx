import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
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

vi.mock('../../hooks/queries.ts', () => ({
  __esModule: true,
  useChangeOneTimePassword: vi.fn(() => ({
    mutateAsync: vi.fn(),
    isSuccess: false
  }))
}))

describe('ChangePassword Component', () => {
  it('changes password input value when enter a new password value', () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    )
    const passwordInput = WhenEnterANewPasswordValue()
    ExpectNewPasswordValueToBe(passwordInput)
  })
})

function ExpectNewPasswordValueToBe(passwordInput: HTMLInputElement) {
  expect(passwordInput.value).toBe('nuevacontraseña')
}

function WhenEnterANewPasswordValue() {
  const passwordInput = screen.getByTestId('password-input') as HTMLInputElement
  fireEvent.change(passwordInput, { target: { value: 'nuevacontraseña' } })
  return passwordInput
}
