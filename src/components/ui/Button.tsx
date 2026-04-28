import * as React from "react"
import { cn } from "@/src/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'danger' | 'glow', size?: 'default' | 'sm' | 'lg' | 'icon' }>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-mono tracking-widest ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group uppercase",
          {
            "bg-cyan-500 text-zinc-950 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]": variant === "default",
            "border border-cyan-500/50 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]": variant === "outline",
            "hover:bg-cyan-950/30 hover:text-cyan-400": variant === "ghost",
            "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]": variant === "danger",
            "bg-cyan-500 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] border border-cyan-300 font-bold": variant === "glow",
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3 text-xs": size === "sm",
            "h-12 px-8 text-base font-bold": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      >
        {props.children}
        <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
