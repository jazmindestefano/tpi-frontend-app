import React, {ReactNode} from 'react';

interface CardProps {
  children?: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Card: React.FC<CardProps> = ({children, className = '', onClick}) => {
    return (
        <div className={"bg-white rounded-lg shadow-lg " + className} onClick={onClick}>
            <div className="p-4 h-96">
                {children}
            </div>
        </div>
    );
};

export default Card;