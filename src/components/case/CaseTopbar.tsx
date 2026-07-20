import Link from "next/link";

import { Brand } from "@/components/layout/Brand";

export function CaseTopbar() {
  return (
    <header className="flex items-center justify-between pt-9 pb-7">
      <Link href="/" aria-label="Home" className="inline-flex items-center">
        <Brand />
      </Link>
      <Link
        href="/"
        className="py-2 font-mono text-[11px] tracking-[0.18em] text-fg-dim uppercase no-underline transition-colors duration-150 hover:text-gold"
      >
        <span aria-hidden className="mr-2">
          ←
        </span>
        Back to home
      </Link>
    </header>
  );
}
