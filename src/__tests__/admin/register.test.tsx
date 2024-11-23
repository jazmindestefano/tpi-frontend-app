import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { useRegister } from '@hooks'
import store from '@redux/store'
import { RegisterPage } from '@pages'

vi.mock('@hooks', () => ({
  useRegister: vi.fn(() => ({
    mutateAsync: vi.fn()
  }))
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const mutateAsyncMock = vi.fn()
vi.mocked(useRegister).mockReturnValue({
  mutateAsync: mutateAsyncMock,
  reset: function (): void {
    throw new Error('Function not implemented.')
  },
  error: null,
  isPending: false,
  isSuccess: false
})

const navigateMock = vi.fn()
vi.mocked(useNavigate).mockReturnValue(navigateMock)

describe('RegisterPage', () => {
  const renderRegisterPage = RenderRegisterPage()

  it('renders the registration form', () => {
    renderRegisterPage()

    ExpectElementsFromRegisterPageToBeInTheDocument()
  })

  it('allows users to type in their details', () => {
    renderRegisterPage()

    WhenUserFillsNameSurnameAndEmailInputs()

    ExpectInputsValuesToChange()
  })

  it('allows users to upload and delete a credential file', () => {
    renderRegisterPage()

    const file = new File(['content'], 'credential.pdf', { type: 'application/pdf' })
    const fileInput = screen.getByTestId('register-credential-input')

    WhenUserUploadsFile(fileInput, file)
    ExpectFileToBeInTheDocument()

    const deleteButton = screen.getByTestId('delete-credential-button')
    WhenUserDeletesUploadedFile(deleteButton)
    ExpectFileNotToBeInTheDocument(fileInput)
  })

  it('calls the register mutation and navigates to email verification on successful registration', async () => {
    renderRegisterPage()

    WhenUserFillsRegistrationForm()

    AndClicksRegisterButton()

    await waitFor(() => {
      ExpectMutationToBeCalled()
      ExpectNavigationToEmailVerificationPage()
    })
  })
})

function ExpectNavigationToEmailVerificationPage() {
  expect(navigateMock).toHaveBeenCalledWith('/email-verification/john.doe@example.com')
}

function ExpectMutationToBeCalled() {
  expect(mutateAsyncMock).toHaveBeenCalledWith({
    formData: {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      professionalCredential: new File([], '')
    }
  })
}

function AndClicksRegisterButton() {
  fireEvent.click(screen.getByTestId('register-button'))
}

function WhenUserFillsRegistrationForm() {
  fireEvent.change(screen.getByTestId('register-name-input'), { target: { value: 'John' } })
  fireEvent.change(screen.getByTestId('register-surname-input'), { target: { value: 'Doe' } })
  fireEvent.change(screen.getByTestId('register-email-input'), { target: { value: 'john.doe@example.com' } })
}

function ExpectFileNotToBeInTheDocument(fileInput: HTMLElement) {
  expect(screen.queryByText('credential.pdf')).not.toBeInTheDocument()
  expect((fileInput as HTMLInputElement).value).toBe('')
}

function WhenUserDeletesUploadedFile(deleteButton: HTMLElement) {
  fireEvent.click(deleteButton)
}

function ExpectFileToBeInTheDocument() {
  expect(screen.getByText('credential.pdf')).toBeInTheDocument()
}

function WhenUserUploadsFile(fileInput: HTMLElement, file: File) {
  fireEvent.change(fileInput, { target: { files: [file] } })
}

function ExpectInputsValuesToChange() {
  expect(screen.getByTestId('register-name-input')).toHaveValue('John')
  expect(screen.getByTestId('register-surname-input')).toHaveValue('Doe')
  expect(screen.getByTestId('register-email-input')).toHaveValue('john.doe@example.com')
}

function WhenUserFillsNameSurnameAndEmailInputs() {
  fireEvent.change(screen.getByTestId('register-name-input'), { target: { value: 'John' } })
  fireEvent.change(screen.getByTestId('register-surname-input'), { target: { value: 'Doe' } })
  fireEvent.change(screen.getByTestId('register-email-input'), { target: { value: 'john.doe@example.com' } })
}

function ExpectElementsFromRegisterPageToBeInTheDocument() {
  expect(screen.getByTestId('register-title')).toHaveTextContent('Registrarse')
  expect(screen.getByTestId('register-name-input')).toBeInTheDocument()
  expect(screen.getByTestId('register-surname-input')).toBeInTheDocument()
  expect(screen.getByTestId('register-email-input')).toBeInTheDocument()
  expect(screen.getByTestId('register-credential-input')).toBeInTheDocument()
  expect(screen.getByTestId('register-button')).toBeInTheDocument()
}

function RenderRegisterPage() {
  return () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    )
}
