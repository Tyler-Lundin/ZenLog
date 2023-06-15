
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"


const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-300 dark:bg-zinc-700 dark:text-white border-zinc-400 dark:border-zinc-500",
        ghost: "bg-transparent",
        destructive: "bg-red-400 text-destructive-foreground",
        event: "bg-black text-white",
      },
      size: {
        default: "h-10 py-2 px-4 text-md",
        sm: "h-9 px-3 rounded-md text-lg",
        lg: "h-11 px-8 rounded-md text-2xl",
        xl: "h-12 px-10 rounded-md text-3xl",
        "2xl": "h-14 px-12 rounded-md text-4xl",
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
