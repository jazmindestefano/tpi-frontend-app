import React, {ReactNode} from "react";

interface CardBaseProps {
  children: ReactNode,
  outer?: ReactNode,
  inner?: ReactNode,
  classNameOuter?: string,
  classNameInner?: string,
}

export const CardBase: React.FC<CardBaseProps> = ({
  children,
  outer,
  inner,
  classNameOuter,
  classNameInner
}) => {
  return (
    <div className={`max-w-[450px] w-full rounded-3xl flex flex-col justify-center items-center cursor-pointer ${classNameOuter}`}>
      <div className={`w-full rounded-3xl flex flex-col justify-center items-center ${classNameInner}`}>
      <div className="w-full flex flex-col justify-center items-center overflow-hidden">
          {children}
        </div>
        {inner}
      </div>
      {outer}
    </div>
  )
}
