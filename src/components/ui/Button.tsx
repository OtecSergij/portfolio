import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "solid" | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsAnchor = BaseProps & ComponentProps<"a"> & { href: string };

type ButtonAsButton = BaseProps & ComponentProps<"button"> & { href?: never };

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-plate-4 shadow-btn hover:-translate-y-px active:translate-y-0 active:shadow-btn-press",
  ghost:
    "bg-transparent shadow-[inset_0_0_0_1px_var(--rule-3)] hover:shadow-[inset_0_0_0_1px_var(--gold)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5",
  md: "h-11 px-4.5",
  lg: "h-13 px-5.5 text-[12.5px]",
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
): string {
  return cn(
    "inline-flex cursor-pointer items-center gap-2.5 rounded-3 font-mono text-[12px] font-medium tracking-[0.12em] text-fg uppercase no-underline transition-[transform,box-shadow,background-color] duration-150 select-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

function isAnchor(props: ButtonProps): props is ButtonAsAnchor {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  if (isAnchor(props)) {
    const { variant = "solid", size = "md", className, ...anchorProps } = props;
    const classes = buttonClasses(variant, size, className);
    if (anchorProps.href.startsWith("/")) {
      return <Link {...anchorProps} className={classes} />;
    }
    return <a {...anchorProps} className={classes} />;
  }
  const { variant = "solid", size = "md", className, ...buttonProps } = props;
  return (
    <button
      type="button"
      {...buttonProps}
      className={buttonClasses(variant, size, className)}
    />
  );
}
