import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
    [
      'cursor-pointer text-center', 'px-4 py-2', 'rounded-full', 
    ],
    {
      variants: {
        size: {
          extralarge: 'w-[749px] h-[57px]',
          large: 'w-[180px] h-[70px]',
          medium: 'w-[160px] h-[60px]',
          small: 'w-[151px] h-[39px]',
        },
        variant: {
          blue: ['text-black bg-[#6D8FE8]'],
          grey: ['text-black bg-[#D9D9D9]'],
          orange: ['text-black bg-[#F55600]'],
          outline: [
            'bg-transparent border border-primary-400 text-black'
          ],
          error: ['bg-error-500 hover:bg-error-500/60 text-white']
        }
      },
      defaultVariants: {
        variant: 'blue'
      }
    }
)

interface CustomButtonProps extends VariantProps<typeof buttonVariants> {
    className?: string
    onClick?: () => void;
    children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ size, variant, onClick, children, className = '' }) => {
    const buttonClass = buttonVariants({ size, variant })

    return (
        <button className={buttonClass + className} onClick={onClick}>
            {children}
        </button>
    );
};

export default CustomButton;