import * as React from "react";
import { cn } from "@/src/lib/utils";

type BadgeVariant = "neutral" | "accent";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border-2 px-3 py-1 text-xs font-bold uppercase tracking-wider",
        variant === "accent"
          ? "border-accent bg-accent-soft text-accent"
          : "border-borders-elevated bg-surface text-text-secondary",
        className
      )}
      {...props}
    />
  );
}
