import * as React from "react";
import { cn } from "@/src/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "soft";
  interactive?: boolean;
};

export function Card({
  className,
  tone = "default",
  interactive,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "border border-border-subtle radius-card",
        tone === "soft" ? "bg-surface-soft" : "bg-surface-elevated",
        "shadow-card-token",
        interactive &&
          "transition-all duration-200 shadow-card-token-hover hover:border-border-subtle hover:-translate-y-1 active:translate-y-0",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-0", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-base font-semibold tracking-tight text-trust",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mt-2 text-body text-slate",
        className
      )}
      {...props}
    />
  );
}
