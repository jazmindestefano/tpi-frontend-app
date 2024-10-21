import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from '../../pages/Home'
import store from '../../redux/store/index'
import { useGetGames } from '../../hooks/queries'
import { useShowModalFeedback } from '../../hooks/selectors'

vi.mock('../../hooks/queries', () => ({
  useGetGames: vi.fn(() => ({
    games: [],
    isLoading: false,
    error: null
  }))
}))

vi.mock('../../components/common/SpinnerLoader', () => ({
  default: () => <div>Loading...</div>
}))

vi.mock('../../components/common/modals/FeedbackModal', () => ({
  FeedbackModal: ({ show, onClose }: { show: boolean; onClose: () => void }) => (
    <div>
      Feedback Modal {show ? 'Visible' : 'Hidden'}
      <button onClick={onClose}>Close</button>
    </div>
  )
}))

vi.mock('../../components/common/cards/HomeCard', () => ({
  default: () => <div>Home Card</div>
}))

// Ajuste del mock de VolumeButton
vi.mock('../../components/common/buttons/VolumeButton', () => ({
  VolumeButton: ({ variant, onClick }: { variant: string; onClick: () => void }) => (
    <button onClick={onClick}>Volume Button - {variant}</button>
  )
}))

// Mock de useShowModalFeedback
vi.mock('../../hooks/selectors', () => ({
  useShowModalFeedback: vi.fn()
}))

describe('Home', () => {
  it('renders loading state', () => {
    ;(useGetGames as jest.Mock).mockReturnValue({
      games: [],
      isLoading: true,
      error: null
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })

  it('renders error message when there is an error', () => {
    ;(useGetGames as jest.Mock).mockReturnValue({
      games: [],
      isLoading: false,
      error: true
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText(/¡Ups! Parece que estamos teniendo un problema./i)).toBeInTheDocument()
  })

  it('renders no games available message when no games are present', () => {
    ;(useGetGames as jest.Mock).mockReturnValue({
      games: [],
      isLoading: false,
      error: null
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText(/no hay juegos disponibles/i)).toBeInTheDocument()
  })

  it('renders games when available', () => {
    const mockGames = [
      { id: 1, name: 'Juego 1' },
      { id: 2, name: 'Juego 2' }
    ]

    ;(useGetGames as jest.Mock).mockReturnValue({
      games: mockGames,
      isLoading: false,
      error: null
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText(/juegos/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Home Card/i)).toHaveLength(mockGames.length)
  })

  it('renders feedback modal when showModalFeedBack is true', () => {
    ;(useShowModalFeedback as jest.Mock).mockReturnValue(true) // Mockear el valor de retorno como true

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText(/Feedback Modal Visible/i)).toBeInTheDocument()
  })
})
