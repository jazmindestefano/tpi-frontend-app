import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
    [
      'cursor-pointer text-center flex items-center justify-center'
    ],
    {
      variants: {
        size: {
          standard: 'w-[5rem] h-[5rem]',
        },
        variant: {
          blue: ['text-black bg-[#6D8FE8]']
        },
        shape: {
          circle: 'rounded-full'
        }
      },
      defaultVariants: {
        size: 'standard',
        variant: 'blue',
        shape: 'circle',
      }
    }
)

interface CustomButtonProps extends VariantProps<typeof buttonVariants> {
    className?: string
    onClick?: () => void;
    children?: React.ReactNode;
}

const CircleButton: React.FC<CustomButtonProps> = ({ variant, onClick, children, className = '' }) => {
    const buttonClass = buttonVariants({ variant })

    return (
        <button className={buttonClass + className} onClick={onClick}>
            {children}
        </button>
    );
};

export default CircleButton;