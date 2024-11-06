import classNames from 'classnames'
import { ReactNode } from 'react'

interface BaseCardProps {
  children: ReactNode
  className?: string
}

export const BaseCard: React.FC<BaseCardProps> = ({ children, className = '' }) => {
  return <div className={classNames('max-w-96 rounded-3xl cursor-pointer', className)}>{children}</div>
}
