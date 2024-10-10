import React, {ReactNode} from "react";

interface CardBaseProps {
  children: ReactNode,
  outer?: ReactNode,
  inner?: ReactNode,
  classNameOuter?: string,
  classNameInner?: string
}

export const CardBase: React.FC<CardBaseProps> = ({
  children,
  outer,
  inner,
  classNameOuter,
  classNameInner
}) => {
  return (
    <div className={`rounded-3xl flex flex-col justify-center items-center max-w-96 gap-4 shadow-lg cursor-pointer ${classNameOuter}`}>
      <div className={`rounded-3xl bg-orange-300 p-6 flex flex-col justify-center items-center gap-4 ${classNameInner}`}>
        <div className="flex flex-col justify-center items-center">
          {children}
        </div>
        {inner}
      </div>
      {outer}
    </div>
  )
}
