import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(["bg-primary-400 text-black cursor-pointer"], {
  variants: {
    size: {
      large: "h-[56px]",
      medium: "h-[42px]",
    },
    variant: {
      blue: ["text-white bg-blue"],
      outline: ["bg-transparent border border-primary-400 text-white"],
      error: ["bg-error-500 hover:bg-error-500/60 text-white"],
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "blue",
  },
});

interface CustomButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant,
  onClick,
  children,
  className = "",
}) => {
  const buttonClass = buttonVariants({ variant });

  return (
    <button className={buttonClass + className} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
