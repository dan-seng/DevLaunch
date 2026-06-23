import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition",
  {
    variants: {
      variant: {
        default: "border-outline-variant bg-surface-variant/30 text-on-surface-variant",
        inverse: "border-transparent bg-primary text-on-primary",
        muted: "border-outline-variant/50 bg-surface-container-high text-on-surface-variant/60",
        error: "border-error/20 bg-error-container text-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
