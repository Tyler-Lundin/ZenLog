import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"


const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-300 dark:bg-zinc-700 dark:text-white border-zinc-400 dark:border-zinc-500",
        ghost: "bg-transparent dark:text-white",
        destructive: "bg-red-400 text-destructive-foreground",
        event: "bg-black text-white",
        glass: "bg-transparent border-0 rounded-none dark:text-white text-black outline-none"
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

// export interface InputProps
//   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof VariantProps<typeof inputVariants>>,
//   VariantProps<typeof inputVariants> {
//   className?: string;
//   type?: string;
// }

// export interface TextareaProps
//   extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof VariantProps<typeof textareaVariants>>,
  VariantProps<typeof textareaVariants> {
  className?: string;
}


const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
