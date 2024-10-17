import {BaseModal} from "./BaseModal.tsx";
import {BadFeedbackIcon, GoodFeedbackIcon, MehFeedbackIcon} from "../icons/Icons.tsx";
import Button from "../buttons/Button.tsx";
import React from "react";
import classNames from "classnames";
import SpinnerLoader from "../SpinnerLoader.tsx";
import Timer from "../timers/Timer.tsx";

interface FeedbackModalProps {
  className?: string
  onModalClose: () => void
  onRatingClick: (rating: number) => void
  isPending: boolean
  isSuccess: boolean
  error: Error | null
  onTimerTimeout: () => void
}

export const FeedbackModalContent: React.FC<FeedbackModalProps> = ({
  className,
  onModalClose,
  onRatingClick,
  isPending,
  isSuccess,
  error,
  onTimerTimeout  
}) => {
  const modalTitle = "¿Qué te pareció la actividad?"
  
  return (
    <BaseModal className={classNames('rounded-3xl', className)} onClose={onModalClose} title={modalTitle}>
      {isPending && <SpinnerLoader />}
      {error && <div>Error: {error.message}</div>}
      {isSuccess && (
        <div>
          <h2 className={"text-center text-2xl font-comfortaa"}>¡Gracias por tu feedback!</h2>
          <Timer duration={3} onTimeout={onTimerTimeout} text={"Redirigiendo al HOME en..."}/>
        </div>
      )}
      {!isPending && !isSuccess && (
        <div className={"flex justify-evenly items-center"}>
          <Button variant={"transparent"} onClick={() => onRatingClick(1)}>
            <BadFeedbackIcon/>
          </Button>
          <Button variant={"transparent"} onClick={() => onRatingClick(2)}>
            <MehFeedbackIcon/>
          </Button>
          <Button variant={"transparent"} onClick={() => onRatingClick(3)}>
            <GoodFeedbackIcon/>
          </Button>
        </div>
      )}
    </BaseModal>
  );
};