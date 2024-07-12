import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input"> & {
  title: string;
  titleClassName?: string;
  error?: boolean;
  helperText?: string;
};

const Input = ({
  className,
  title,
  titleClassName,
  error,
  helperText,
  prefix,
  ...props
}: InputProps) => {
  return (
    <div className={"w-full"}>
      <label
        className={twMerge(
          "block text-base mb-1 font-medium text-zinc-200",
          titleClassName
        )}
        htmlFor={props.id}
      >
        {title}
      </label>
      <div
        data-haserror={error && "error"}
        className='flex h-12 data-[haserror="error"]:border-red-500 data-[haserror="error"]:border-[3px] justify-center items-center rounded-md data-[haserror="error"]:animate-shake transition-all'
      >
        {prefix && (
          <span className="text-2xl w-8 h-full flex justify-center items-center bg-white rounded-l-md font-semibold text-zinc-600 select-none cursor-default">
            {prefix}
          </span>
        )}
        <input
          data-prefix={Boolean(prefix)}
          className={twMerge(
            'focus:outline-none rounded-md shadow-sm block w-full p-2.5 text-lg data-[haserror="error"]:ring-red-500 data-[haserror="error"]:ring-2 focus:ring-0 text-gray-800 data-[prefix="true"]:rounded-l-none data-[prefix="true"]:pl-0 data-[prefix="true"]:ring-0 h-full',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{helperText}</p>}
    </div>
  );
};

export default Input;
