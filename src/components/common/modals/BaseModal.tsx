import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { X } from 'lucide-react'
import { Button, HearableButton } from '@components'

interface BaseModalProps {
  children: ReactNode
  className?: string
  onClose: () => void
  title: string
  hearable?: boolean
}

export const BaseModal: FC<BaseModalProps> = ({ className, children, onClose, title, hearable = true }) => {
  return (
    <div className={classNames('bg-orange-50 border-orange-100 p-6 w-fit', className)}>
      <div className={'flex flex-col flex-nowrap justify-between items-start gap-8 mb-4'}>
        <Button className={'ml-auto'} onClick={onClose} variant={'transparent'} ariaLabel="close">
          <X />
        </Button>
        <div className={'flex flex-nowrap items-center gap-4 w-full justify-center'}>
          <h1 className={'font-comfortaa text-3xl'}>{title}</h1>
          {hearable ? <HearableButton text={title} /> : null}
        </div>
      </div>
      {children}
    </div>
  )
}

export default BaseModal
