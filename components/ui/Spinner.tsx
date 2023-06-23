import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "spinner animate-spin rounded-full",
  {
    variants: {
      variant: {
        default: "border-t-2 border-b-2 border-gray-500",
      },
      size: {
        default: "w-12 h-12",
        xs: "w-4 h-4",
        sm: "w-8 h-8",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof spinnerVariants> {
  asChild?: boolean
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(spinnerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
