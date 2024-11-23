import classNames from 'classnames'
import { FC, ReactNode } from 'react'

interface BaseCardProps {
  children: ReactNode
  className?: string
}

const BaseCard: FC<BaseCardProps> = ({ children, className = '' }) => {
  return <div className={classNames('max-w-96 rounded-3xl cursor-pointer', className)}>{children}</div>
}

export default BaseCard
