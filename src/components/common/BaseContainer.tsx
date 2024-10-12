import classNames from "classnames";
import React, {ReactNode} from "react";

interface BaseContainer {
  children: ReactNode
  className?: string
}

export const BaseContainer: React.FC<BaseContainer> = ({
  children,
  className = ''
}) => {
  return (
    <div className={classNames("w-full flex flex-col justify-center items-center gap-4", className)}>
      {children}
    </div>
  )
}