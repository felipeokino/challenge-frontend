import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = ComponentProps<"button"> & {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "success"
    | "warning"
    | "icon";
};

const buttonVariants = tv({
  base: "bg-gray-900 text-white min-w-[120px] px-4 py-2 text-lg rounded-lg text-center cursor-pointer flex gap-4 items-center justify-center transition-all max-sm:w-full shadow-lg",
  variants: {
    variant: {
      primary:
        "bg-sky-500 hover:bg-sky-700 focus:ring-sky-500 font-semibold text-black hover:text-white",
      secondary: "bg-gray-500 hover:bg-gray-700 focus:ring-gray-500",
      ghost:
        "bg-transparent hover:bg-transparent focus:ring-gray-500 shadow-none",
      danger:
        "bg-rose-600 hover:bg-red-700 focus:ring-red-500 font-semibold text-white",
      success:
        "bg-green-500 hover:bg-green-700 hover:text-white focus:ring-green-500 font-semibold text-black",
      warning: "bg-yellow-500 hover:bg-yellow-700 focus:ring-yellow-500",
      icon: "bg-transparent hover:bg-transparent focus:ring-gray-500 w-fit min-w-[0px] p-0 h-full max-sm:max-w-[36px]",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={buttonVariants({ variant })}>
      {children}
    </button>
  );
};

export default Button;
