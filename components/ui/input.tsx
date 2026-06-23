import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 py-2 text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
