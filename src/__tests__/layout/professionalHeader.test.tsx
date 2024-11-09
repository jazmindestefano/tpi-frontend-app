import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { HeaderProfesional } from '@/components'

vi.mock('@/hooks/queries', () => ({
  useExportPdf: vi.fn(() => ({
    pdf: new Blob(['test'], { type: 'application/pdf' }),
    error: null,
    isLoading: false
  }))
}))

global.URL.createObjectURL = vi.fn(() => 'mocked-url')

describe('HeaderProfesional', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    global.localStorage = {
      clear: vi.fn(),
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    } as unknown as Storage
  })

  const setup = () => {
    render(
      <BrowserRouter>
        <HeaderProfesional />
      </BrowserRouter>
    )
  }

  it('should render download button', () => {
    setup()
    const downloadButton = screen.getByTestId('download-button')
    expect(downloadButton).toBeInTheDocument()
  })

  it('should render folder button', () => {
    setup()
    const folderButton = screen.getByTestId('folder-button')
    expect(folderButton).toBeInTheDocument()
  })

  it('should render logout button', () => {
    setup()
    const logoutButton = screen.getByTestId('professional-logout-button')
    expect(logoutButton).toBeInTheDocument()
  })

  it('should navigate to activities on folder button click', () => {
    setup()
    const folderButton = screen.getByTestId('folder-button')
    fireEvent.click(folderButton)
    expect(window.location.pathname).toBe('/profesional/paciente/1/actividades')
  })

  it('should clear localStorage and navigate to login on logout button click', () => {
    setup()
    const logoutButton = screen.getByTestId('professional-logout-button')
    fireEvent.click(logoutButton)
    expect(localStorage.clear).toHaveBeenCalled()
    expect(window.location.pathname).toBe('/login')
  })

  it('should download pdf on download button click', () => {
    setup()
    const downloadButton = screen.getByTestId('download-button')
    fireEvent.click(downloadButton)
    expect(global.URL.createObjectURL).toHaveBeenCalled()
  })
})
