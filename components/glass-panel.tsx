import { cn } from "@/utils/cn";

export function GlassPanel({ className, children, ...props }: { className?: string; children: React.ReactNode } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[rgba(18,18,18,0.7)] backdrop-blur-[12px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
