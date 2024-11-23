import classNames from 'classnames'
import { FC, ReactNode } from 'react'

interface BaseContainer {
  children: ReactNode
  className?: string
}

const BaseContainer: FC<BaseContainer> = ({ children, className = '' }) => {
  return (
    <div className={classNames('flex flex-col justify-center items-center w-full gap-4', className)}>{children}</div>
  )
}

export default BaseContainer
