import { LinkedInButton } from "@/components/home/LinkedInButton";
import { Button } from "@/components/ui/Button";
import { EmailButton } from "@/components/home/EmailButton";
import { Pill } from "@/components/ui/Pill";
import { Plate } from "@/components/ui/Plate";
import { Typewriter } from "@/components/ui/Typewriter";
import { site } from "@/config/site";
import { heroLocationNote, heroPills, heroRoleLine } from "@/content/home";

export function Hero() {
  return (
    <Plate
      brushed
      grit
      className="px-6 py-9 sm:px-10 sm:py-11 lg:px-16 lg:py-14"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_300px] lg:gap-14">
        <div>
          <div className="mb-7 flex flex-wrap gap-2.5">
            {heroPills.map((pill) => (
              <Pill key={pill.label} led={pill.led}>
                {pill.label}
              </Pill>
            ))}
          </div>
          <h1 className="disp text-[clamp(46px,9.5vw,104px)] leading-[0.92] text-fg">
            {site.name}
          </h1>
          <p className="mt-6 font-mono text-[13px] tracking-[0.14em] text-gold uppercase">
            {heroRoleLine}
          </p>
          <p className="mt-7.5 max-w-[540px] text-[19px] leading-[1.55] text-fg-mute">
            <Typewriter text={site.tagline} />
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <EmailButton />
            <LinkedInButton />
            <Button
              variant="ghost"
              href={site.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden>↗</span>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto h-[280px] w-[280px] lg:mr-0">
          <div
            aria-hidden
            className="absolute -top-3 -right-3 bottom-7 left-7 rounded-full bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--gold)_18%,transparent)_0%,transparent_70%)] blur-[2px]"
          />
          <div className="relative h-64 w-64 overflow-hidden rounded-full bg-[image:var(--bg-photo-well)] shadow-[inset_0_1px_0_var(--rule-highlight),inset_0_-1px_0_var(--rule-inset),0_12px_28px_rgba(0,0,0,0.5)]">
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-[0.4em] text-[color-mix(in_srgb,var(--fg)_25%,transparent)]"
            >
              PHOTO
            </span>
            <span
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.02)_0_1px,transparent_1px_6px)]"
            />
          </div>
          <div className="absolute -right-1 -bottom-2 rounded-2 border border-rule-3 bg-plate-2 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap text-fg-mute uppercase">
            {heroLocationNote}
          </div>
        </div>
      </div>
    </Plate>
  );
}
