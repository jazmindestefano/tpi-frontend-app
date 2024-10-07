import React, {ReactNode} from 'react';

interface CardProps {
  children?: ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({children, className = ''}) => {
    return (
        <div className={"max-w-xs bg-white rounded-lg shadow-lg " + className}>
            <div className="p-4 h-96">
                {children}
            </div>
        </div>
    );
};

export default Card;
