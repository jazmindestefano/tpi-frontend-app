import {Overlay} from "../overlay/Overlay.tsx";
import {FeedbackModalContent} from "./FeedbackModalContent.tsx";
import {usePostFeedback} from "../../../hooks/queries.ts";
import {useNavigate} from "react-router-dom";
import {useUser, useSelectedGame} from "../../../hooks/selectors.ts";

interface FeedbackModalProps {
  show: boolean
  onClose: () => void
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({show, onClose}) => {
  const navigate = useNavigate();
  const {mutate, isPending, isSuccess, error} = usePostFeedback()
  const selectedGame = useSelectedGame()
  const loggedUser = useUser()
  
  const postFeedback = (ranking: number) => {
    mutate({ranking, gameId: selectedGame!.id, patientId: loggedUser!.id})
  }
  
  return (
    <Overlay show={show} onClose={onClose}>
      <FeedbackModalContent
        isPending={isPending}
        isSuccess={isSuccess}
        error={error}
        onModalClose={onClose}
        onRatingClick={postFeedback}
        onTimerTimeout={() => navigate("/")}
      />
    </Overlay>
  );
};