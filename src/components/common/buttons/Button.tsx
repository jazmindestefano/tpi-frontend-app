import { type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'
import { buttonVariants } from './buttonVariants.ts'

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  onClick?: () => void
  onMouseEnter?: () => void
  children?: React.ReactNode
  className?: string;
  role?: string;
}

const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  shape,
  onClick,
  onMouseEnter,
  children,
  className = "", }) => {
  const basicClass = buttonVariants({ size, variant, shape })
  return (
    <button
      className={classNames(basicClass, className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="button"
    >
      {children}
    </button>
  )
}

export default Button
