import { type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'
import { buttonVariants } from './buttonVariants'
import { FC, ReactNode } from 'react'

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  onClick?: () => void
  onMouseEnter?: () => void
  children?: ReactNode
  className?: string
  ariaLabel?: string
  dataTestId?: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  size,
  variant,
  shape,
  onClick,
  onMouseEnter,
  children,
  className = '',
  ariaLabel = 'button',
  dataTestId = '',
  type = 'button',
  disabled = false
}) => {
  const basicClass = buttonVariants({ size, variant, shape })
  return (
    <button
      disabled={disabled}
      data-testid={dataTestId}
      className={classNames(basicClass, className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
