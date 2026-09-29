import { Button, type ButtonSize } from "@/components/ui/Button";
import { resumeFileName, resumePublicPath } from "@/content/resume";

export type DownloadCvButtonProps = {
  size?: ButtonSize;
};

export function DownloadCvButton({ size }: DownloadCvButtonProps) {
  return (
    <Button
      size={size}
      href={resumePublicPath}
      download={resumeFileName}
      target="_blank"
      rel="noopener"
    >
      Download CV (PDF){" "}
      <span aria-hidden className="text-gold">
        ↓
      </span>
    </Button>
  );
}
