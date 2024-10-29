import { BaseModal } from './BaseModal.tsx'
import { BadFeedbackIcon, GoodFeedbackIcon, MehFeedbackIcon } from '../icons/Icons.tsx'
import Button from '../buttons/Button.tsx'
import classNames from 'classnames'
import SpinnerLoader from '../SpinnerLoader.tsx'

interface FeedbackModalProps {
  className?: string
  onModalClose: () => void
  onRatingClick: (rating: number) => void
  isPending: boolean
  isSuccess: boolean
  error: Error | null
}

export const FeedbackModalContent: React.FC<FeedbackModalProps> = ({
  className,
  onModalClose,
  onRatingClick,
  isPending,
  isSuccess,
  error
}) => {
  const modalTitle = '¿Qué te pareció la actividad?'

  return (
    <BaseModal
      className={classNames('rounded-3xl flex-col-center gap-4', className)}
      onClose={onModalClose}
      title={modalTitle}
    >
      {isPending && <SpinnerLoader />}
      {error && <div>Error: {error.message}</div>}
      {!isPending && !isSuccess && (
        <div className={'flex justify-evenly items-start w-full'}>
          <Button variant={'transparent'} onClick={() => onRatingClick(1)}>
            <BadFeedbackIcon />
          </Button>
          <Button variant={'transparent'} onClick={() => onRatingClick(2)}>
            <MehFeedbackIcon />
          </Button>
          <Button variant={'transparent'} onClick={() => onRatingClick(3)}>
            <GoodFeedbackIcon />
          </Button>
        </div>
      )}
    </BaseModal>
  )
}
