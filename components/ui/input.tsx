
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"


const inputVariants = cva(
  "flex h-10 rounded-md border border-input p-1 text-sm",
  {
    variants: {
      variant: {
        default: "bg-zinc-300 dark:bg-zinc-700 dark:text-white border-zinc-400 dark:border-zinc-500",
        ghost: "bg-transparent",
        destructive: "bg-red-400 text-destructive-foreground",
        event: "bg-black text-white",
        glass: "bg-transparent border-0 rounded-none dark:text-white text-black outline-none"
      },
      size: {
        default: "py-2 px-4 text-md",
        sm: "h-9 px-3 rounded-md text-sm",
        md: "h-10 px-4 rounded-md text-md",
        lg: "h-11 px-8 rounded-md text-lg",
        xl: "h-12 px-10 rounded-md text-xl",
        "2xl": "h-14 px-12 rounded-md text-2xl",
        "3xl": "h-16 px-14 rounded-md text-3xl",
        "4xl": "h-20 px-16 rounded-md text-4xl",
        "5xl": "h-24 px-20 rounded-md text-5xl",
        "6xl": "h-28 px-24 rounded-md text-6xl",
        "7xl": "h-32 px-28 rounded-md text-7xl",
        "8xl": "h-36 px-32 rounded-md text-8xl",
        "8xlFit": "h-min px-4 rounded-md text-6xl md:text-8xl py-0",
        search: "p-1 text-xl font-thin",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)


export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof VariantProps<typeof inputVariants>>,
  VariantProps<typeof inputVariants> {
  className?: string;
  type?: string;
}


const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
