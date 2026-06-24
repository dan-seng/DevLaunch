import { cn } from "@/utils/cn";

export function GlassPanel({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-outline-variant/50 bg-surface-container/70 backdrop-blur-[12px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
