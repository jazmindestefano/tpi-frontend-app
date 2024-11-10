import { AsideProfesional } from '@components'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

describe('AsideProfesional', () => {
  it('should render the logo and avatar', () => {
    render(
      <BrowserRouter>
        <AsideProfesional />
      </BrowserRouter>
    )

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByAltText('Avatar')).toBeInTheDocument()
  })

  it('should navigate to /profesional when logo is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <AsideProfesional />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByAltText('Logo'))
    expect(mockNavigate).toHaveBeenCalledWith('/profesional')
  })

  it('should navigate to /profesional when sidebar item is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <AsideProfesional />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByTestId('sidebar-item'))
    expect(mockNavigate).toHaveBeenCalledWith('/profesional')
  })

  it('should navigate to /profesional/perfil when avatar is clicked', () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <AsideProfesional />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByTestId('avatar-button'))
    expect(mockNavigate).toHaveBeenCalledWith('/profesional/perfil')
  })
})
