import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { useNavigate } from 'react-router-dom'
import { useGetProfessionals } from '@hooks'
import { HomeAdminPage } from '@pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('@hooks', async () => {
  const actual = await vi.importActual('@hooks')
  return {
    ...actual,
    useGetProfessionals: vi.fn(() => ({
      data: [{ id: 1, name: 'Profesional 1', stateId: 2 }],
      isLoading: false,
      error: null
    })),
    useUpdateProfessionalStateId: vi.fn(() => ({
      mutateAsync: vi.fn(),
      isPending: false
    }))
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const mockProfessionals = [
  { id: 1, name: 'John', surname: 'Doe', email: 'john.doe@example.com', stateId: 4, image: 'image.jpg' },
  { id: 2, name: 'Jane', surname: 'Smith', email: 'jane.smith@example.com', stateId: 3, image: 'image2.jpg' }
]

describe('HomeAdminPage', () => {
  it('should navigate to /login when logout button is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    renderHomeAdminPage()

    fireEvent.click(screen.getByTestId('logout-button'))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('should render professionals data correctly when the hook returns data', async () => {
    mockGetProfessionalsHookReturnsProfessionals()

    renderHomeAdminPage()

    await professionalsDisplayCorrectlyOnPage()
  })

  it('should display loading state when data is loading', () => {
    mockGetProfessionalsHookIsLoading()

    renderHomeAdminPage()

    displaysLoadingSpinner()
  })

  it('should display error message when there is an error', () => {
    const mockError = mockGetProfessionalsHookReturnsError()

    renderHomeAdminPage()

    displaysErrorOnScreen(mockError)
  })
})

// Helper Functions
function displaysErrorOnScreen(mockError: Error) {
  expect(screen.getByText(`Error: ${mockError.message}`)).toBeInTheDocument()
}

function mockGetProfessionalsHookReturnsError() {
  const mockError = new Error('Something went wrong')
  vi.mocked(useGetProfessionals).mockReturnValue({
    data: [],
    isLoading: false,
    error: mockError
  })
  return mockError
}

function displaysLoadingSpinner() {
  expect(screen.getByTestId('spinner-loader')).toBeInTheDocument()
}

function mockGetProfessionalsHookIsLoading() {
  vi.mocked(useGetProfessionals).mockReturnValue({
    data: [],
    isLoading: true,
    error: null
  })
}

async function professionalsDisplayCorrectlyOnPage() {
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
  })
}

function renderHomeAdminPage() {
  const queryClient = new QueryClient()

  render(
    <QueryClientProvider client={queryClient}>
      <HomeAdminPage />
    </QueryClientProvider>
  )

  afterEach(() => {
    queryClient.clear()
  })
}

function mockGetProfessionalsHookReturnsProfessionals() {
  vi.mocked(useGetProfessionals).mockReturnValue({
    data: mockProfessionals,
    isLoading: false,
    error: null
  })
}
