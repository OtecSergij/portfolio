import { site } from "@/config/site";
import { taglineText } from "@/content/cases/tagline";
import type { CaseStudy } from "@/content/cases/types";
import type { ProjectFacts } from "@/content/projects";

export function CaseJsonLd({
  study,
  facts,
  applicationCategory,
}: {
  study: CaseStudy;
  facts: ProjectFacts;
  applicationCategory: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: study.title,
    description: taglineText(study),
    applicationCategory,
    operatingSystem: "Web",
    url: facts.demoUrl,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
