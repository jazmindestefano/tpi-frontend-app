import { useGetProfessionals } from '@hooks/queries'
import HomeAdminPage from '../../pages/home/HomeAdminPage'
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

// Mockeamos el hook `useGetProfessionals`
vi.mock('@hooks/queries', () => ({
  useGetProfessionals: vi.fn()
}))

const mockProfessionals = [
  { id: 1, name: 'John', surname: 'Doe', email: 'john.doe@example.com', stateId: 4, image: 'image.jpg' },
  { id: 2, name: 'Jane', surname: 'Smith', email: 'jane.smith@example.com', stateId: 3, image: 'image2.jpg' }
]

describe('HomeAdminPage', () => {
  it('should render professionals data correctly when the hook returns data', async () => {
    WhenGetPorffesionalsHookReturnsProfessionals()

    AndRendersHomeAdminPage()

    await PorfessionalsShowInPage()
  })

  it('should display loading state when data is loading', () => {
    WhenProfessionalsHookIsLoading()

    AndRendersHomeAdminPage()

    ShowsSpinnerLoader()
  })

  it('should display error message when there is an error', () => {
    const mockError = WhenProfessionalsHookRetusnError()

    AndRendersHomeAdminPage()

    ShowsErrorOnScreen(mockError)
  })
})

function ShowsErrorOnScreen(mockError: Error) {
  expect(screen.getByText(`Error: ${mockError.message}`)).toBeInTheDocument()
}

function WhenProfessionalsHookRetusnError() {
  const mockError = new Error('Something went wrong')
  vi.mocked(useGetProfessionals).mockReturnValue({
    data: [],
    isLoading: false,
    error: mockError
  })
  return mockError
}

function ShowsSpinnerLoader() {
  expect(screen.getByTestId('spinner-loader')).toBeInTheDocument()
}

function WhenProfessionalsHookIsLoading() {
  vi.mocked(useGetProfessionals).mockReturnValue({
    data: [],
    isLoading: true,
    error: null
  })
}

async function PorfessionalsShowInPage() {
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
  })
}

function AndRendersHomeAdminPage() {
  render(<HomeAdminPage />)
}

function WhenGetPorffesionalsHookReturnsProfessionals() {
  vi.mocked(useGetProfessionals).mockReturnValue({
    data: mockProfessionals,
    isLoading: false,
    error: null
  })
}
