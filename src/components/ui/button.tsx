import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/25",
        outline: "border border-border bg-transparent hover:bg-muted hover:text-foreground hover:border-primary/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg shadow-secondary/25",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "bg-primary text-primary-foreground font-semibold shadow-[0_0_20px_hsl(var(--primary)/0.5),0_0_40px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.7),0_0_60px_hsl(var(--primary)/0.4)] hover:scale-[1.02]",
        "neon-purple": "bg-secondary text-secondary-foreground font-semibold shadow-[0_0_20px_hsl(var(--secondary)/0.5),0_0_40px_hsl(var(--secondary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--secondary)/0.7),0_0_60px_hsl(var(--secondary)/0.4)] hover:scale-[1.02]",
        glass: "bg-card/60 backdrop-blur-xl border border-border text-foreground hover:bg-card/80 hover:border-primary/30 shadow-lg",
        "glass-neon": "bg-card/40 backdrop-blur-xl border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.2)]",
        hero: "bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-[0_0_30px_hsl(var(--primary)/0.4),0_0_60px_hsl(var(--secondary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6),0_0_80px_hsl(var(--secondary)/0.4)] hover:scale-[1.03] transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
