import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(["rounded-3xl shadow-lg", "p-4 w-auto h-96", "max-w-96 min-w-96"], {
  variants: {
    variant: {
      primary: ["bg-[#F2C160]"],
      secondary: ["bg-[#FFBB6D]"],
      tertiary: ["bg-[#6D8FE8]"],
    },
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  children?: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({
  variant,
  children,
  className = "",
  onClick,
}) => {
  const cardClass = cardVariants({ variant });
  return (
    <div className={`${cardClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
