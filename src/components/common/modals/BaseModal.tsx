import { ReactNode } from 'react'
import classNames from 'classnames'
import Button from '../buttons/Button.tsx'
import { HearableButton } from '../buttons/HearableButton.tsx'

interface BaseModalProps {
  children: ReactNode
  className?: string
  onClose: () => void
  title: string
  hearable?: boolean
}

export const BaseModal: React.FC<BaseModalProps> = ({ className, children, onClose, title, hearable = true }) => {
  return (
    <div className={classNames('bg-orange-50 border-orange-100 p-6 w-fit', className)}>
      <div className={'flex flex-col flex-nowrap justify-between items-start gap-8 mb-4'}>
        <Button className={'ml-auto'} onClick={onClose} variant={'transparent'} ariaLabel="close">
          X
        </Button>
        <div className={'flex flex-nowrap items-center gap-4'}>
          <h1 className={'font-comfortaa text-3xl'}>{title}</h1>
          {hearable ? <HearableButton text={title} /> : null}
        </div>
      </div>
      {children}
    </div>
  )
}
