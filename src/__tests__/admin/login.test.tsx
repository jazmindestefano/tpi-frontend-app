import { useLogin } from '@hooks'
import { LoginPage } from '@pages'
import store from '@redux/store'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

vi.mock('@hooks', () => ({
  useLogin: vi.fn(() => ({
    mutateAsync: vi.fn()
  })),
  usePasswordVisibility: vi.fn(() => ({
    showPassword: false,
    togglePasswordVisibility: vi.fn()
  }))
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const navigateMock = vi.fn()
vi.mocked(useNavigate).mockReturnValue(navigateMock)

describe('Login Page', () => {
  it('show login form when page render', () => {
    renderLoginPage()

    ExpectInputsAndButtonToBeInTheDocument()
  })

  it('user can type username and password', () => {
    renderLoginPage()

    const usernameInput = screen.getByTestId('username-input')
    const passwordInput = screen.getByTestId('password-input')

    WhenUpdate(usernameInput, passwordInput)

    ExpectToHaveUpdatedValues(usernameInput, passwordInput)
  })

  it('show invalid credentials error message when credentials are invalid', async () => {
    mockUseLoginWithInvalidCredentials()
    renderLoginPage()

    const loginButton = screen.getByTestId('login-button')

    WhenIsClicked(loginButton)

    await waitFor(() => {
      ExpectInvalidCredentialsMessage()
    })
  })

  it('navigate to register page when Register button is clicked', () => {
    renderLoginPage()

    const registerButton = screen.getByTestId('register-button')
    WhenIsClicked(registerButton)

    expectNavigationToRegisterPage()
  })
})

const renderLoginPage = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  )

const mockUseLoginWithInvalidCredentials = () => {
  vi.mocked(useLogin).mockReturnValue({
    mutateAsync: vi.fn().mockRejectedValue(new Error('Invalid credentials')),
    error: null,
    isPending: false
  })
}

function expectNavigationToRegisterPage() {
  expect(navigateMock).toHaveBeenCalledWith('/registro')
}

function ExpectInvalidCredentialsMessage() {
  expect(screen.getByTestId('error-message')).toHaveTextContent(
    'Credenciales inválidas. Por favor, intenta nuevamente.'
  )
}

function WhenIsClicked(button: HTMLElement) {
  fireEvent.click(button)
}

function ExpectToHaveUpdatedValues(usernameInput: HTMLElement, passwordInput: HTMLElement) {
  expect(usernameInput).toHaveValue('testuser')
  expect(passwordInput).toHaveValue('mypassword')
}

function WhenUpdate(usernameInput: HTMLElement, passwordInput: HTMLElement) {
  fireEvent.change(usernameInput, { target: { value: 'testuser' } })
  fireEvent.change(passwordInput, { target: { value: 'mypassword' } })
}

function ExpectInputsAndButtonToBeInTheDocument() {
  expect(screen.getByTestId('username-input')).toBeInTheDocument()
  expect(screen.getByTestId('password-input')).toBeInTheDocument()
  expect(screen.getByTestId('login-button')).toBeInTheDocument()
}
