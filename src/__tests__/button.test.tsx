import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from '../components/common/buttons/Button.tsx'

describe('Button component', () => {
  it('render text', async () => {
    render(<Button>Hola</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Hola')
  })
})
