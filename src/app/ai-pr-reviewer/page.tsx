import { CaseJsonLd } from "@/components/case/CaseJsonLd";
import { CasePage } from "@/components/case/CasePage";
import { aiPrReviewer } from "@/content/cases/ai-pr-reviewer";
import { caseMetadata } from "@/content/cases/metadata";
import { aiPrReviewerFacts } from "@/content/projects";

export const metadata = caseMetadata(aiPrReviewer, aiPrReviewerFacts);

export default function AiPrReviewerPage() {
  return (
    <>
      <CaseJsonLd
        study={aiPrReviewer}
        facts={aiPrReviewerFacts}
        applicationCategory="DeveloperApplication"
      />
      <CasePage study={aiPrReviewer} />
    </>
  );
}
