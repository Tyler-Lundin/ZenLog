import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-black flex gap-2 transition-all font-thin text-white dark:text-black bg-black hover:text-black dark:bg-white hover:bg-transparent dark:hover:text-white dark:hover:bg-transparent hover:border-black dark:hover:border-white border",
        ghost: "bg-transparent text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10",
        destructive:
          "bg-red-400 text-destructive-foreground hover:bg-red-400/90",
        event: "font-bold bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase",
        logEvent: "font-bold bg-green-500 text-white hover:bg-black/90 uppercase",

      },
      size: {
        default: "h-10 py-2 px-4 text-md",
        sm: "h-9 px-3 rounded-md text-lg",
        lg: "h-11 px-8 rounded-md text-2xl",
        xl: "h-12 px-10 rounded-md text-3xl",
        "2xl": "h-14 px-12 rounded-md text-4xl",
        smSquare: "h-9 w-9 text-lg rounded-md aspect-square",
        mdSquare: "h-10 w-10 text-xl rounded-md aspect-square",
        lgSquare: "h-11 w-11 text-2xl rounded-md aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
