import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetGame } from '@redux/slices'
import { usePostFeedback, useCurrentUser, useCurrentGame } from '@hooks'
import { FeedbackModalContent, Overlay } from '@components'

interface FeedbackModalProps {
  show: boolean
  onClose: () => void
}

const FeedbackModal: FC<FeedbackModalProps> = ({ show, onClose }) => {
  const { mutate, isPending, isSuccess, error } = usePostFeedback()
  const dispatch = useDispatch()
  const { selectedGame } = useCurrentGame()
  const user = useCurrentUser()

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess, onClose])

  useEffect(() => {
    if (!show && !isPending) {
      dispatch(resetGame())
    }
  }, [dispatch, isPending, show])

  return (
    <Overlay show={show} onClose={onClose}>
      <FeedbackModalContent
        isPending={isPending}
        isSuccess={isSuccess}
        error={error}
        onModalClose={onClose}
        onRatingClick={(ranking: number) => {
          mutate({ ranking, gameId: selectedGame.id, patientId: user.id })
        }}
      />
    </Overlay>
  )
}

export default FeedbackModal
