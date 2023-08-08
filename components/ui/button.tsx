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
        glass: "flex gap-2 rounded-md transition-all font-thin text-black dark:text-white hover:opacity-50 hover:border-white dark:hover:border-black border border-black/50 dark:border-white/50 bg-black/10",
        glassGreen: "flex gap-2 rounded-md transition-all font-thin text-black hover:opacity-50 border-none bg-green-400",
        glassRed: "flex gap-2 rounded-md transition-all font-thin text-black hover:opacity-50 border-none bg-red-400",
        ghost: "bg-transparent text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10",
        destructive:
          "bg-red-400 text-destructive-foreground hover:bg-red-400/90",
        event: "font-bold bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase",
        logEvent: "font-bold border border-green-500 bg-transparent text-green-500 uppercase hover:bg-green-500 hover:text-white hover:border hover:border-white disabled:opacity-50",
        green: "bg-green-500 flex gap-2 rounded-md transition-all font-thin text-black border hover:border-green-500 border-white dark:border-black hover:bg-transparent hover:text-green-500 border focus:border-green-500 focus:text-green-500 focus:bg-transparent",
        blue: "bg-blue-500 flex gap-2 rounded-md transition-all font-thin text-black hover:border-blue-500 border-white dark:border-black hover:bg-transparent hover:text-blue-500 border focus:border-blue-500 focus:text-blue-500 focus:bg-transparent",
        invertedGreen: "bg-black flex gap-2 transition-all text-green-500 hover:border-white dark:hover:border-black border-green-500 hover:bg-green-500 hover:text-white border focus:border-white focus:text-white focus:bg-transparent",
        red: "bg-red-500 flex gap-2 rounded-md transition-all font-thin text-black hover:border-red-500 border-white dark:border-black hover:bg-transparent hover:text-red-500 border focus:border-red-500 focus:text-red-500 focus:bg-transparent",
        invertedRed: "bg-black flex gap-2 transition-all text-red-500 hover:border-white dark:hover:border-black border-red-500 hover:bg-red-500 hover:text-white border focus:border-white focus:text-white focus:bg-transparent",
        large: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase font-bold tracking-wider rounded-none",

      },
      size: {
        default: "h-10 py-2 px-4 text-md",
        sm: "h-9 px-3  text-lg",
        lg: "px-8  text-2xl",
        xl: "px-10 text-xl",
        "2xl": "h-14 px-12 text-2xl lg:text-4xl",
        "3xl": "h-16 px-14 text-3xl lg:text-5xl",
        "4xl": "h-20 px-16 text-4xl lg:text-6xl",
        "5xl": "h-24 px-20 text-5xl lg:text-7xl",
        smSquare: "h-9 w-9 text-lg rounded-md aspect-square",
        mdSquare: "h-10 w-10 text-xl rounded-md aspect-square",
        lgSquare: "h-11 w-11 text-2xl rounded-md aspect-square",
        xlSquare: "h-10 w-10 md:h-12 md:w-12 text-xl md:text-3xl rounded-md aspect-square",
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
