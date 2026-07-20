import { site } from "@/config/site";
import { taglineText } from "@/content/cases/tagline";
import { tameTheElephant } from "@/content/cases/tame-the-elephant";
import { tameTheElephantFacts } from "@/content/projects";
import { caseOgImageResponse, ogSize } from "@/lib/og/shared";

export const alt = `${tameTheElephant.title} — a case study by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return caseOgImageResponse({
    title: tameTheElephant.title,
    description: taglineText(tameTheElephant),
    status: tameTheElephantFacts.status,
  });
}
