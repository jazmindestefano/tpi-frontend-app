import Layout from '@components/layout/Layout'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Layout Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Layout />)
    expect(container).toBeInTheDocument()
  })
})
