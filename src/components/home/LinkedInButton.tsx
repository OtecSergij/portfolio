import { Button, type ButtonSize } from "@/components/ui/Button";
import { site } from "@/config/site";

export type LinkedInButtonProps = {
  size?: ButtonSize;
};

export function LinkedInButton({ size }: LinkedInButtonProps) {
  if (site.contacts.linkedin === null) return null;
  return (
    <Button
      variant="ghost"
      size={size}
      href={site.contacts.linkedin}
      target="_blank"
      rel="noopener noreferrer"
    >
      LinkedIn <span aria-hidden>↗</span>
    </Button>
  );
}
