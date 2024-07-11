import { ComponentProps } from 'react';
import { tv } from 'tailwind-variants';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning'
}

const buttonVariants = tv({
  base: 'bg-gray-900 text-white min-w-[120px] px-4 py-2 text-base rounded-lg text-center cursor-pointer flex gap-4 items-center justify-center transition-all',
  variants: {
    variant: {
      primary: 'bg-blue-500 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-500 hover:bg-gray-700 focus:ring-gray-500',
      ghost: 'bg-transparent hover:bg-transparent focus:ring-gray-500',
      danger: 'bg-red-500 hover:bg-red-700 focus:ring-red-500',
      success: 'bg-green-500 hover:bg-green-700 focus:ring-green-500',
      warning: 'bg-yellow-500 hover:bg-yellow-700 focus:ring-yellow-500',
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})
const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={buttonVariants({ variant })}>{children}</button>
  )
}

export default Button