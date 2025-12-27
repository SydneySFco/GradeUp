import * as React from "react";
import { cn } from "@/src/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-[140px] w-full rounded-xl border border-borders-elevated bg-surface-elevated px-4 py-3 text-sm text-trust",
        "placeholder:text-slate/60",
        "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent shadow-soft",
        "transition-all",
        className
      )}
      {...props}
    />
  );
}
