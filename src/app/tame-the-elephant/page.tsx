import { CaseJsonLd } from "@/components/case/CaseJsonLd";
import { CasePage } from "@/components/case/CasePage";
import { caseMetadata } from "@/content/cases/metadata";
import { tameTheElephant } from "@/content/cases/tame-the-elephant";
import { tameTheElephantFacts } from "@/content/projects";

export const metadata = caseMetadata(tameTheElephant, tameTheElephantFacts);

export default function TameTheElephantPage() {
  return (
    <>
      <CaseJsonLd
        study={tameTheElephant}
        facts={tameTheElephantFacts}
        applicationCategory="LifestyleApplication"
      />
      <CasePage study={tameTheElephant} />
    </>
  );
}
