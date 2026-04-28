import * as React from "react"
import { cn } from "@/src/lib/utils"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-[10px] font-mono leading-none tracking-widest uppercase peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-cyan-400/80",
        className
      )}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label }
