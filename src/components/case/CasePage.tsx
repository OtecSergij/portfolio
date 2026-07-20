import { CaseBlocks } from "@/components/case/CaseBlocks";
import { CaseSection } from "@/components/case/CaseSection";
import { CaseTopbar } from "@/components/case/CaseTopbar";
import { Figure } from "@/components/case/Figure";
import { caseGridClass } from "@/components/case/grid";
import { PostCta } from "@/components/case/PostCta";
import { PostHero } from "@/components/case/PostHero";
import { TocRail } from "@/components/case/TocRail";
import { Footer } from "@/components/layout/Footer";
import type { CaseStudy } from "@/content/cases/types";
import { cn } from "@/lib/cn";
import { pageClass } from "@/lib/layout";

export function CasePage({ study }: { study: CaseStudy }) {
  const tocItems = study.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  return (
    <div className="bg-plate">
      <div className={pageClass}>
        <CaseTopbar />
        <main id="main">
          <article>
            <PostHero study={study} />
            <Figure
              size="hero"
              caption={study.heroFigureCaption}
              image={study.heroImage}
              className="mb-16 md:mb-24"
            />
            <div className={cn("pb-16 md:pb-28", caseGridClass)}>
              <aside className="mb-12 lg:sticky lg:top-9 lg:mb-0 lg:self-start">
                <TocRail items={tocItems} />
              </aside>
              <div className="case-prose min-w-0 [&_code:not(pre_code)]:-mr-0.5 [&_code:not(pre_code)]:px-[5px]">
                {study.sections.map((section) => (
                  <CaseSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                  >
                    <CaseBlocks blocks={section.blocks} />
                  </CaseSection>
                ))}
                <PostCta cta={study.cta} className="mt-16 md:mt-[88px]" />
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}
