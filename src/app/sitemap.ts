import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { aiPrReviewerFacts, tameTheElephantFacts } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.siteUrl, lastModified: site.updatedAt },
    {
      url: `${site.siteUrl}${aiPrReviewerFacts.caseRoute}`,
      lastModified: aiPrReviewerFacts.updatedAt,
    },
    {
      url: `${site.siteUrl}${tameTheElephantFacts.caseRoute}`,
      lastModified: tameTheElephantFacts.updatedAt,
    },
  ];
}
