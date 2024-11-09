import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import PageLayout from '@components/layout/PageLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('@hooks/selectors.ts', () => ({
  useShowProductTour: vi.fn()
}))

vi.mock('@components', () => ({
  Header: () => <div>Header Component</div>
}))

vi.mock('../../ProductTour', () => ({
  __esModule: true,
  default: () => <div>Product Tour Component</div>
}))

const queryClient = new QueryClient()

describe('PageLayout', () => {
  it('renders the Header component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PageLayout />
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Header Component')).toBeInTheDocument()
  })
})
