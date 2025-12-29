import * as React from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { ArrowRight, FolderOpen } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const variants: Record<ButtonVariant, string> = {
  // primary:
  //   "bg-[#0066ff] text-white border-2 border-[#0066ff] gap-2 " +
  //   "hover:bg-[#0052cc] hover:border-[#0052cc] hover:shadow-lg hover:shadow-[#0066ff]/20 active:scale-[0.98]",
  primary:
    "bg-accent text-bg border border-accent " +
    "hover:shadow-[0_20px_50px_rgba(47,107,255,0.25)] hover:-translate-y-[1px]",

  secondary:
    "bg-secondary text-white border-2 border-secondary gap-2 " +
    "hover:bg-secondary-hover hover:border-secondary-hover active:scale-[0.98]",
  ghost:
    "bg-transparent text-white border-2 border-transparent " +
    "hover:bg-surface hover:border-borders-subtle active:scale-[0.98]",
};

function Spinner() {
  return (
    <span
      className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-b-transparent"
      aria-hidden="true"
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "secondary",
    size = "md",
    className,
    children,
    loading,
    ...rest
  } = props as ButtonProps;

  const cls = cn(base, sizes[size], variants[variant], className);

  // Add icon based on variant
  const icon =
    variant === "primary" ? (
      <ArrowRight className="h-4 w-4" />
    ) : variant === "secondary" ? (
      <FolderOpen className="h-4 w-4" />
    ) : null;

  // Link mode
  if ("href" in props) {
    const { href, ...a } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    // External?
    const isExternal = /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a className={cls} href={href} {...a}>
          {loading && <Spinner />}
          {children}
          {icon && !loading && icon}
        </a>
      );
    }

    return (
      <Link className={cls} href={href} {...a}>
        {loading && <Spinner />}
        {children}
        {icon && !loading && icon}
      </Link>
    );
  }

  // Button mode
  const b = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} {...b}>
      {loading && <Spinner />}
      {children}
      {icon && !loading && icon}
    </button>
  );
}
