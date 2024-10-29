import classNames from 'classnames'
import { ReactNode } from 'react'

interface BaseContainer {
  children: ReactNode
  className?: string
}

export const BaseContainer: React.FC<BaseContainer> = ({ children, className = '' }) => {
  return (
    <div className={classNames('flex flex-col justify-center items-center w-full gap-4', className)}>{children}</div>
  )
}
