import { site } from "@/config/site";
import { taglineText } from "@/content/cases/tagline";
import type { CaseStudy } from "@/content/cases/types";
import type { ProjectFacts } from "@/content/projects";

function LdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function CaseJsonLd({
  study,
  facts,
  applicationCategory,
}: {
  study: CaseStudy;
  facts: ProjectFacts;
  applicationCategory: string;
}) {
  const softwareLd = {
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
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${site.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${site.siteUrl}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.title,
        item: `${site.siteUrl}${facts.caseRoute}`,
      },
    ],
  };
  return (
    <>
      <LdScript data={softwareLd} />
      <LdScript data={breadcrumbLd} />
    </>
  );
}
