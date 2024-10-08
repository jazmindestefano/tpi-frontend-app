import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  [
    "cursor-pointer flex items-center justify-center",
    "px-4 py-2",
    "rounded-full relative",
    "shadow-xl",
  ],
  {
    variants: {
      size: {
        extralarge: "w-[46.8125rem] h-[3.5625rem]",
        large: "w-[11.25rem] h-[4.375rem]",
        medium: "w-[10rem] h-[3.75rem]",
        small: "w-[9.4375rem] h-[2.4375rem]",
        extrasmall: "w-[5.625rem] h-[2.1875rem]",
        circleSize: "w-[5rem] h-[5rem]",
        square: "w-[3.75rem] h-[3.75rem]",
      },
      variant: {
        primary: ["text-black bg-primary"],
        secondary: ["text-black bg-secondary"],
        tertiary: ["text-black bg-tertiary"],
        fourth: [
          "bg-[rgba(217,217,217,0.49)] rounded-full",
          "hover:bg-[rgba(150,150,150,0.49)]",
        ],
        fifth: ["bg-[#6D8FE8] rounded-full", "hover:bg-[#617EC9]"],
        outline: ["bg-transparent border border-primary-400 text-black"],
        error: ["bg-error-500 hover:bg-error-500/60 text-white"],
      },
      shape: {
        default: "rounded-lg",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "default",
    },
  }
);

interface CustomButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  size,
  variant,
  shape,
  onClick,
  children,
  className = "",
}) => {
  const buttonClass = buttonVariants({ size, variant, shape });

  return (
    <button className={buttonClass + " " + className} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
