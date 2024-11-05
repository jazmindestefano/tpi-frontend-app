import { useTextToSpeech } from '../../../hooks/useTextToSpeech.ts'
import Button from './Button.tsx'
import { VolumeIcon } from '../icons/Icons.tsx'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './buttonVariants.ts'
import { LoaderCircle } from 'lucide-react'
import classNames from 'classnames'
import { FC } from 'react'

interface HearableButtonProps extends Omit<VariantProps<typeof buttonVariants>, 'size' | 'shape'> {
  text: string
  className?: string
}

export const HearableButton: FC<HearableButtonProps> = ({ text, variant, className }) => {
  const { isLoading, playAudio } = useTextToSpeech({ text })

  const handleClick = () => {
    if (isLoading) return
    playAudio()
  }

  return (
    <Button
      size={'circle'}
      variant={variant}
      shape={'circle'}
      onClick={handleClick}
      className={classNames('hover:scale-125 duration-150', className)}
    >
      {isLoading ? <LoaderCircle size={36} className={'animate-spin text-white'} /> : <VolumeIcon />}
    </Button>
  )
}
