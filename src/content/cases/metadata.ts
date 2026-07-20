import type { Metadata } from "next";

import { site } from "@/config/site";
import { taglineText } from "@/content/cases/tagline";
import type { CaseStudy } from "@/content/cases/types";
import type { ProjectFacts } from "@/content/projects";

export function caseMetadata(study: CaseStudy, facts: ProjectFacts): Metadata {
  const description = taglineText(study);
  return {
    title: study.title,
    description,
    alternates: { canonical: facts.caseRoute },
    openGraph: {
      type: "website",
      url: facts.caseRoute,
      siteName: site.name,
      locale: "en_US",
      title: `${study.title} — ${site.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — ${site.name}`,
      description,
    },
  };
}
