import { cva } from 'class-variance-authority'

export const buttonVariants = cva(['cursor-pointer flex items-center justify-center'], {
  variants: {
    size: {
      circle: 'w-[3.75rem] h-[3.75rem]',
      square: 'w-[3.75rem] h-[3.75rem]'
    },
    variant: {
      primary: ['text-black bg-[#f2c160]', 'hover:bg-[#eea631]'],
      secondary: ['bg-[#6D8FE8]', 'hover:bg-[#617EC9]'],
      tertiary: ['bg-[rgba(217,217,217,0.49)] rounded-full', 'hover:bg-[rgba(150,150,150,0.49)]'],
      fourth: ['bg-[#9747FF]'],
      transparent: ['bg-transparent']
    },
    shape: {
      default: 'rounded-lg',
      circle: 'rounded-full'
    }
  },
  defaultVariants: {
    variant: 'primary',
    shape: 'default'
  }
})
