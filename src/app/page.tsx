import type { Metadata } from "next";

import { EmailButton } from "@/components/home/EmailButton";
import { Hero } from "@/components/home/Hero";
import { LinkedInButton } from "@/components/home/LinkedInButton";
import { WorkCard } from "@/components/home/WorkCard";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import {
  aboutParagraphs,
  contactBody,
  experienceMeta,
  experienceRows,
  stackRows,
  workMeta,
  workProjects,
} from "@/content/home";
import { cn } from "@/lib/cn";
import { pageClass } from "@/lib/layout";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.tagline,
  url: site.siteUrl,
  knowsAbout: [
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "PostgreSQL",
    "LLM application engineering",
  ],
  sameAs: [site.contacts.github, site.contacts.linkedin].filter(
    (profile) => profile !== null,
  ),
};

export default function Home() {
  return (
    <div className="grid-bg-tight bg-void">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className={pageClass}>
        <Topbar />
      </div>
      <main id="main">
        <div className={cn(pageClass, "pb-16 md:pb-24")}>
          <Hero />
        </div>
        <div className="bg-plate">
          <div className={pageClass}>
            <Section id="about" title="About">
              <div className="max-w-[760px]">
                {aboutParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "mb-6.5 text-pretty text-fg last:mb-0",
                      paragraph.lead
                        ? "text-[21px] leading-[1.5] md:text-[23px]"
                        : "text-[19px] leading-[1.6] md:text-[21px]",
                    )}
                  >
                    {paragraph.body}
                  </p>
                ))}
              </div>
            </Section>

            <Section
              id="experience"
              title="Experience"
              align="right"
              meta={experienceMeta}
            >
              <div className="border-t border-rule-1">
                {experienceRows.map((row) => (
                  <div
                    key={row.company}
                    className="grid grid-cols-1 items-baseline gap-x-8 border-b border-rule-1 py-8 sm:grid-cols-[1fr_auto]"
                  >
                    <h3 className="disp text-[32px] leading-none text-fg">
                      {row.company}
                    </h3>
                    <div className="mt-1.5 font-mono text-[11px] tracking-[0.18em] text-fg-dim uppercase sm:mt-0 sm:justify-self-end">
                      {row.dates}
                    </div>
                    <div className="mt-3 font-mono text-[12px] tracking-[0.12em] text-gold uppercase sm:col-span-2">
                      {row.role}
                    </div>
                    <p className="mt-5 max-w-[760px] text-[16px] leading-[1.55] text-fg-mute sm:col-span-2">
                      {row.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="stack" title="Stack">
              <div className="border-t border-rule-1">
                {stackRows.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-1 gap-y-1 border-b border-rule-1 py-5.5 sm:grid-cols-[200px_1fr] sm:items-baseline sm:gap-x-14"
                  >
                    <div className="font-mono text-[14px] tracking-[0.04em] text-fg">
                      {row.name}
                      {row.accent !== undefined && (
                        <>
                          {" "}
                          <span className="text-gold">{row.accent}</span>
                        </>
                      )}
                    </div>
                    <p className="max-w-[720px] text-[16px] leading-[1.55] text-fg-mute">
                      {row.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="projects"
              title="Projects"
              align="right"
              meta={workMeta}
            >
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
                {workProjects.map((project) => (
                  <WorkCard key={project.title} project={project} />
                ))}
              </div>
            </Section>

            <Section id="contact" title="Contact" align="right">
              <div className="max-w-[720px]">
                <p className="mb-9 text-[19px] leading-[1.55] text-pretty text-fg md:text-[21px]">
                  {contactBody}
                </p>
                <div className="flex flex-wrap gap-3">
                  <EmailButton size="lg" />
                  <LinkedInButton size="lg" />
                  <Button
                    size="lg"
                    variant="ghost"
                    href={`https://t.me/${site.contacts.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram <span aria-hidden>↗</span>
                  </Button>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </main>
      <div className="flow-root bg-plate">
        <div className={pageClass}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
