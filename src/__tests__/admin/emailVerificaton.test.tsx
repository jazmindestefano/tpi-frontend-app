import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, Mock } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useValidateVerificationCode } from '@hooks'
import { EmailVerification } from '@pages'

vi.mock('@hooks', () => ({
  useValidateVerificationCode: vi.fn()
}))

describe('EmailVerification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display error message when verification fails', async () => {
    renderEmailVerificationWithError()

    whenPerformCodeVerificationWithError()

    await verifyErrorMessageVisibility()
  })

  it('should show success modal when verification is successful', async () => {
    renderEmailVerificationWithSuccess()

    performVerificationCodeSubmission()

    await verifyEmailSuccessMessage()
  })
})

async function verifyEmailSuccessMessage() {
  await waitFor(() => expect(screen.getByText('¡Email verificado!')).toBeInTheDocument())
}

function performVerificationCodeSubmission() {
  const input = screen.getByTestId('email-ver-verificationCode-input')
  fireEvent.change(input, { target: { value: 'valid-code' } })

  const button = screen.getByTestId('email-ver-verificationCode')
  fireEvent.click(button)
}

function renderEmailVerificationWithSuccess() {
  const mockMutateAsync = vi.fn().mockResolvedValue({ success: true })
  ;(useValidateVerificationCode as Mock).mockReturnValue({ mutateAsync: mockMutateAsync })

  render(
    <MemoryRouter initialEntries={['/verify-email/test@example.com']}>
      <Routes>
        <Route path="/verify-email/:email" element={<EmailVerification />} />
      </Routes>
    </MemoryRouter>
  )
}

async function verifyErrorMessageVisibility() {
  await waitFor(() =>
    expect(screen.getByText(/Error: El código de verificación es incorrecto o ha expirado/)).toBeInTheDocument()
  )
}

function whenPerformCodeVerificationWithError() {
  const input = screen.getByTestId('email-ver-verificationCode-input')
  fireEvent.change(input, { target: { value: 'wrong-code' } })

  const button = screen.getByTestId('email-ver-verificationCode')
  fireEvent.click(button)
}

function renderEmailVerificationWithError() {
  const mockMutateAsync = vi.fn().mockRejectedValue(new Error('Invalid code'))
  ;(useValidateVerificationCode as Mock).mockReturnValue({ mutateAsync: mockMutateAsync })

  render(
    <MemoryRouter initialEntries={['/verify-email/test@example.com']}>
      <Routes>
        <Route path="/verify-email/:email" element={<EmailVerification />} />
      </Routes>
    </MemoryRouter>
  )
}
