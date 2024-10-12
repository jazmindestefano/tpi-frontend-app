import classNames from "classnames";
import React, {ReactNode} from "react";

interface BaseCardProps {
  children: ReactNode,
  className?: string,
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={classNames("max-w-80 h-96 rounded-3xl shadow-lg cursor-pointer", className)}>
      {children}
    </div>
  )
}

/*
interface CardBase2Props {
  
};
export const CardBase2: React.FC<CardBase2Props> = ({}) => {
  return (
    <BaseCard className={"bg-amber-400"}>
      <BaseContainer>
        contenido
      </BaseContainer>
      <Button>cuchame</Button>
    </BaseCard>
  );
};


/*

interface CardBase2Props {
  children: ReactNode,
  outer?: ReactNode,
  inner?: ReactNode,
  classNameOuter?: string,
  classNameInner?: string,
}

export const CardBase2: React.FC<CardBase2Props> = ({
                                                    children,
                                                    outer,
                                                    inner,
                                                    classNameInner = ''
                                                  }) => {
  return (
    <CardContainerBase className="max-w-96 max-h-96 rounded-3xl shadow-lg cursor-pointer">
      <div className={classNames("w-full rounded-3xl bg-orange-300 p-6 flex flex-col justify-center items-center gap-4", classNameInner)}>
        <div className="w-full flex flex-col justify-center items-center">
          {children}
        </div>
        {inner}
      </div>
      {outer}
    </CardContainerBase>
  )
}

*/