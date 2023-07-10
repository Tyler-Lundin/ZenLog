import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-transparent flex gap-2 rounded-md transition-all font-thin dark:text-white hover:dark:text-black hover:dark:bg-white hover:bg-black hover:text-white",
        defaultInverted: "bg-white flex gap-2 rounded-md transition-all font-thin text-black dark:text-white bg-white hover:text-white dark:bg-black hover:bg-transparent dark:hover:bg-transparent hover:border-white dark:hover:border-black border",
        glass: "flex gap-2 rounded-md transition-all font-thin text-black dark:text-white hover:opacity-50 hover:border-white dark:hover:border-black border",
        glassGreen: "flex gap-2 rounded-md transition-all font-thin text-black hover:opacity-50 border-none bg-green-400",
        ghost: "bg-transparent text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10",
        red: "text-red-600 hover:text-red-800 border-none bg-transparent",
        destructive:
          "bg-red-400 text-destructive-foreground hover:bg-red-400/90",
        event: "font-bold bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase",
        logEvent: "font-bold bg-green-500 disabled:opacity-50 border text-white uppercase hover:bg-transparent hover:text-green-500 hover:border hover:border-green-500",
        green: "bg-green-500 flex gap-2 rounded-md transition-all font-thin text-white hover:border-green-500 hover:bg-transparent hover:text-green-500 border focus:border-green-500 focus:text-green-500 focus:bg-transparent",
        large: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase font-bold tracking-wider rounded-none",

      },
      size: {
        default: "h-10 py-2 px-4 text-md",
        sm: "h-9 px-3  text-lg",
        lg: "h-11 px-8  text-2xl",
        xl: "h-12 px-10 text-3xl",
        "2xl": "h-14 px-12 text-2xl lg:text-4xl",
        "3xl": "h-16 px-14 text-3xl lg:text-5xl",
        "4xl": "h-20 px-16 text-4xl lg:text-6xl",
        "5xl": "h-24 px-20 text-5xl lg:text-7xl",
        smSquare: "h-9 w-9 text-lg rounded-md aspect-square",
        mdSquare: "h-10 w-10 text-xl rounded-md aspect-square",
        lgSquare: "h-11 w-11 text-2xl rounded-md aspect-square",
        xlSquare: "h-12 w-12 text-3xl rounded-md aspect-square",
        "2xlSquare": "h-14 w-14 text-2xl lg:text-4xl rounded-md aspect-square",
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
