import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { useValidateVerificationCode } from '@hooks'
import { EmailVerification } from '@pages'

vi.mock('@hooks', () => ({
  useValidateVerificationCode: vi.fn()
}))

const mockMutateAsync = vi.fn()
vi.mocked(useValidateVerificationCode).mockReturnValue({
  mutateAsync: mockMutateAsync,
  reset: function (): void {
    throw new Error('Function not implemented.')
  },
  error: null,
  isPending: false,
  isSuccess: false
})

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ email: 'test@example.com' })
  }
})

describe('EmailVerification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows error message if validation fails', async () => {
    renderEmailVerificationWithError()

    const verifyButton = screen.getByTestId('email-ver-verificationCode')
    const verificationCodeInput = screen.getByTestId('email-ver-verificationCode-input')

    InsertAndClick(verificationCodeInput, verifyButton)

    await waitFor(() => {
      ExpectError()
    })
  })

  it('call mutation when button is clicked to verify code', () => {
    renderEmailVerificationWithError()

    const verifyButton = screen.getByTestId('email-ver-verificationCode')
    const verificationCodeInput = screen.getByTestId('email-ver-verificationCode-input')

    InsertAndClick(verificationCodeInput, verifyButton)

    expectMutateAsyncCalledWithValidParams()
  })
})

function expectMutateAsyncCalledWithValidParams() {
  expect(mockMutateAsync).toHaveBeenCalledWith({
    email: 'test@example.com',
    code: 'invalid-code'
  })
}

function ExpectError() {
  expect(screen.getByText('Error: El código de verificación es incorrecto o ha expirado.')).toBeInTheDocument()
}

function InsertAndClick(verificationCodeInput: HTMLElement, verifyButton: HTMLElement) {
  fireEvent.change(verificationCodeInput, { target: { value: 'invalid-code' } })
  fireEvent.click(verifyButton)
}

function renderEmailVerificationWithError() {
  mockMutateAsync.mockRejectedValueOnce(new Error('Validation failed'))

  render(
    <BrowserRouter>
      <EmailVerification />
    </BrowserRouter>
  )
}
