import type { CaseStudy } from "@/content/cases/types";

export function taglineText(study: Pick<CaseStudy, "tagline">): string {
  return study.tagline
    .map((segment) =>
      typeof segment === "string" ? segment : segment.highlight,
    )
    .join("");
}
