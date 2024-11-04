import { Overlay } from '../overlay/Overlay.tsx'
import { FeedbackModalContent } from './FeedbackModalContent.tsx'
import { usePostFeedback } from '@hooks/queries.ts'
import { useSelectedGame, useUser } from '@hooks/selectors.ts'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetGame } from '@redux/slices'

interface FeedbackModalProps {
  show: boolean
  onClose: () => void
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ show, onClose }) => {
  const { mutate, isPending, isSuccess, error } = usePostFeedback()
  const dispatch = useDispatch()
  const selectedGame = useSelectedGame()
  const user = useUser()

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
