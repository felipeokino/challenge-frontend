import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentProps<'input'> & {
  title: string
  titleClassName?: string
  error?: boolean
  helperText?: string
}

const Input = ({ className, title, titleClassName, error, helperText, ...props }: InputProps) => {
  return (
    <div className={'w-full'}>
      <label className={twMerge('block text-base mb-1 font-medium text-zinc-200', titleClassName)} htmlFor={props.id}>{title}</label>
      <input data-haserror={error && 'error'} className={twMerge('focus:outline-none rounded-md shadow-sm block w-full p-2.5 text-base data-[haserror="error"]:ring-red-500 data-[haserror="error"]:ring-2 sm:text-sm', className)} {...props} />
      {error && <p className="text-sm text-red-500">{helperText}</p>}
    </div>
  )
}

export default Input