import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.53)] hover:-translate-y-1 transition-all font-bold",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold",
        outline: "border-2 border-accent/20 bg-background hover:bg-accent/5 hover:text-accent hover:border-accent transition-all duration-500 font-bold",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 font-bold",
        ghost: "hover:bg-accent/10 hover:text-accent transition-colors font-bold",
        link: "text-accent underline-offset-4 hover:underline font-bold",
        gradient: "bg-gradient-to-r from-accent via-orange-500 to-accent text-white shadow-[0_4px_14px_0_rgba(255,107,53,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.53)] hover:-translate-y-1 bg-size-200 hover:bg-right transition-all font-black",
        luxury: "bg-gradient-to-br from-[#1a1a1a] to-black text-white border border-white/10 shadow-2xl hover:border-accent/40 hover:shadow-accent/20 hover:scale-[1.02] relative overflow-hidden font-black animate-shimmer-clinical",
        conversion: "bg-foreground text-background hover:bg-foreground/90 shadow-[0_0_50px_-10px_rgba(var(--accent),0.5)] hover:shadow-[0_0_60px_-5px_rgba(var(--accent),0.6)] hover:-translate-y-1 transition-all font-black animate-shimmer-clinical",
        primary: "bg-accent text-white shadow-[0_4px_14px_0_rgba(255,107,53,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.23)] hover:-translate-y-1 transition-all duration-300 font-bold animate-shimmer-clinical",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-14 px-10 text-base",
        xl: "h-20 rounded-xl px-16 text-xl tracking-[0.2em]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
