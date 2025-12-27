import * as React from "react";
import { cn } from "@/src/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-borders-elevated bg-surface-elevated px-4 text-sm text-trust",
        "placeholder:text-slate/60",
        "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent shadow-soft",
        "transition-all",
        className
      )}
      {...props}
    />
  );
}
