import { type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'
import { buttonVariants } from './buttonVariants.ts'

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  onClick?: () => void
  onMouseEnter?: () => void
  children?: React.ReactNode
  className?: string
  ariaLabel?: string
  dataTestId?: string
}

const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  shape,
  onClick,
  onMouseEnter,
  children,
  className = '',
  ariaLabel = 'button',
  dataTestId = ''
}) => {
  const basicClass = buttonVariants({ size, variant, shape })
  return (
    <button
      data-testid={dataTestId}
      className={classNames(basicClass, className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button
