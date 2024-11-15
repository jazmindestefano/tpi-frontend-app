import { BadFeedbackIcon, BaseModal, Button, GoodFeedbackIcon, MehFeedbackIcon, SpinnerLoader } from '@components'
import classNames from 'classnames'
import { FC } from 'react'

interface FeedbackModalProps {
  className?: string
  onModalClose: () => void
  onRatingClick: (rating: number) => void
  isPending: boolean
  isSuccess: boolean
  error: Error | null
}

const FeedbackModalContent: FC<FeedbackModalProps> = ({
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
      className={classNames('rounded-3xl flex flex-col justify-center items-center w-[50%] gap-4', className)}
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

export default FeedbackModalContent
