import React, {ReactNode} from "react";
import classNames from "classnames";
import Button from "../buttons/Button.tsx";
import {VolumeIcon} from "../icons/Icons.tsx";
import {useSpeakText} from "../../../hooks/useSpeakText.ts";

interface BaseModalProps {
  children: ReactNode
  className?: string,
  onClose: () => void
  title: string
}

export const BaseModal: React.FC<BaseModalProps> = ({className, children, onClose, title}) => {
  const speakText = useSpeakText()
  return (
    <div className={classNames('bg-orange-50 border-orange-100 p-4 w-fit', className)}>
      <div className={"flex flex-nowrap justify-between items-center gap-8 mb-4"}>
        <div className={"flex flex-nowrap items-center gap-4"}>
          <h1 className={"font-comfortaa text-4xl"}>{title}</h1>
          <Button size={"circle"} shape={"circle"} variant={"secondary"} onClick={() => speakText(title)}>
            <VolumeIcon/>
          </Button>
        </div>
        <Button className={"ms-auto"} onClick={onClose} variant={"transparent"}>
          <span className={"font-comfortaa font-bold text-3xl"}>X</span>
        </Button>
      </div>
      {children}
    </div>
  );
};