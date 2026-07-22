import { Year } from "@/components/layout/Year";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-14 flex flex-col gap-4 border-t border-rule-2 pt-10 pb-12 font-mono text-[11px] tracking-[0.18em] text-fg-dim uppercase sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:pt-14 sm:pb-16">
      <div>
        © <Year /> {site.name}
      </div>
      <div className="flex gap-5.5">
        <a
          href={site.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="-my-3 py-3 text-fg-mute no-underline transition-colors duration-150 hover:text-gold"
        >
          Site source on GitHub <span aria-hidden>↗</span>
        </a>
      </div>
    </footer>
  );
}
