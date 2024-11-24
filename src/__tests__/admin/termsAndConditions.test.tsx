import { TermsAndConditionsPage } from '@pages'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

const mockMutateAsync = vi.fn()
vi.mock('../../hooks/queries', () => ({
  useTermsAndConditions: vi.fn(() => ({
    mutateAsync: mockMutateAsync,
    isSuccess: false
  }))
}))

describe('TermsAndConditionsPage', () => {
  it('button becomes enabled after success mutation', async () => {
    await renderTermsAndConditionsWithSuccess()

    expectButtonToBeEnabled()
  })

  it('checkbox checked when user clicks', async () => {
    await WhenMutationReturnsSuccess()

    const checkbox = screen.getByTestId('terms-and-conditions-checkbox')
    AndCheckboxIsClicked(checkbox)

    await waitFor(() => {
      ExpectCheckBoxToBeClicked(checkbox)
    })
  })
})
function expectButtonToBeEnabled() {
  const button = screen.getByTestId('terms-and-condition-button') as HTMLButtonElement
  expect(button).not.toBeDisabled()
}

async function renderTermsAndConditionsWithSuccess() {
  const { useTermsAndConditions } = await import('../../hooks/queries')
  vi.mocked(useTermsAndConditions).mockReturnValueOnce({
    mutateAsync: mockMutateAsync,
    isSuccess: true,
    error: null,
    isPending: false
  })

  render(
    <BrowserRouter>
      <TermsAndConditionsPage />
    </BrowserRouter>
  )
}

function ExpectCheckBoxToBeClicked(checkbox: HTMLElement) {
  expect(checkbox).toBeChecked()
}

function AndCheckboxIsClicked(checkbox: HTMLElement) {
  fireEvent.click(checkbox)
}

async function WhenMutationReturnsSuccess() {
  const { useTermsAndConditions } = await import('../../hooks/queries')
  vi.mocked(useTermsAndConditions).mockReturnValueOnce({
    mutateAsync: mockMutateAsync,
    isSuccess: false,
    error: null,
    isPending: false
  })

  render(
    <BrowserRouter>
      <TermsAndConditionsPage />
    </BrowserRouter>
  )
}
