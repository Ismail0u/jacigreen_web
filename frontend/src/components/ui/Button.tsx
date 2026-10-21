import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";

type Variant = "primary" | "accent" | "secondary";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-accent",
  accent: "bg-ochre-strong text-on-ochre-strong hover:bg-brand",
  secondary: "border border-brand text-brand hover:bg-brand hover:text-on-brand",
};

export function buttonClasses(variant: Variant = "primary"): string {
  return [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5",
    "font-display text-small font-semibold tracking-wide",
    "transition-colors duration-(--duration-fast) ease-(--ease-standard)",
    "disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
  ].join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={`${buttonClasses(variant)} ${className}`} {...props} />;
}

interface ButtonLinkProps extends LinkProps {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${buttonClasses(variant)} ${className}`} {...props} />;
}
