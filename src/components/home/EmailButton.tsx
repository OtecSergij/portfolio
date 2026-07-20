"use client";

import { useSyncExternalStore } from "react";

import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";
import { site } from "@/config/site";

export type EmailButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const subscribeNever = () => () => {};

function getClientHref(): string {
  const { user, domain } = site.contacts.email;
  return `mailto:${user}@${domain}`;
}

export function EmailButton(props: EmailButtonProps) {
  const href = useSyncExternalStore<string | null>(
    subscribeNever,
    getClientHref,
    () => null,
  );

  const label = (
    <>
      <span aria-hidden className="text-gold">
        ✉
      </span>{" "}
      Email
    </>
  );

  if (href === null) {
    return <Button {...props}>{label}</Button>;
  }
  return (
    <Button {...props} href={href}>
      {label}
    </Button>
  );
}
