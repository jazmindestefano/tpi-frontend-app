import React, { ReactNode } from 'react'
import classNames from 'classnames'
import Button from '../buttons/Button.tsx'
import { VolumeIcon } from '../icons/Icons.tsx'
import { useSpeakText } from '../../../hooks/useSpeakText.ts'
import { X } from 'lucide-react'

interface BaseModalProps {
  children: ReactNode
  className?: string
  onClose: () => void
  title: string
  speak?: boolean
}

export const BaseModal: React.FC<BaseModalProps> = ({ className, children, onClose, title, speak = true }) => {
  const speakText = useSpeakText()
  return (
    <div className={classNames('bg-orange-50 border-orange-100 p-6 w-fit', className)}>
      <div className={'flex flex-col flex-nowrap justify-between items-start gap-8 mb-4'}>
        <Button className={'ml-auto'} onClick={onClose} variant={'transparent'}>
          <X />
        </Button>
        <div className={'flex flex-nowrap items-center gap-4'}>
          <h1 className={'font-comfortaa text-3xl'}>{title}</h1>
          {speak && (
            <Button size={'circle'} shape={'circle'} variant={'secondary'} onClick={() => speakText(title)}>
              <VolumeIcon />
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
