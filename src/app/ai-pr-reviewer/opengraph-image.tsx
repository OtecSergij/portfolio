import { site } from "@/config/site";
import { aiPrReviewer } from "@/content/cases/ai-pr-reviewer";
import { taglineText } from "@/content/cases/tagline";
import { aiPrReviewerFacts } from "@/content/projects";
import { caseOgImageResponse, ogSize } from "@/lib/og/shared";

export const alt = `${aiPrReviewer.title} — a case study by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return caseOgImageResponse({
    title: aiPrReviewer.title,
    description: taglineText(aiPrReviewer),
    status: aiPrReviewerFacts.status,
  });
}
