import { PublicRouteLayout } from '@components'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('PublicRouteLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <PublicRouteLayout>
        <div>Test Child</div>
      </PublicRouteLayout>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('renders the logo correctly', () => {
    const { getByAltText } = render(
      <PublicRouteLayout>
        <div>Test Child</div>
      </PublicRouteLayout>
    )
    expect(getByAltText('Logo')).toBeInTheDocument()
  })

  it('applies the correct classes to the container', () => {
    const { container } = render(
      <PublicRouteLayout>
        <div>Test Child</div>
      </PublicRouteLayout>
    )
    expect(container.firstChild).toHaveClass(
      'min-h-screen flex flex-col justify-start pt-20 space-y-28 items-center font-comfortaa bg-orange-100'
    )
  })
})
