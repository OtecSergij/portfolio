import { ImageResponse } from "next/og";

import { site } from "@/config/site";
import { loadOgFonts, OgFrame, OgHero, ogSize } from "@/lib/og/shared";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <OgFrame>
      <OgHero
        kicker={site.role}
        title={site.name}
        description={site.tagline}
        titleSize={104}
        titleLineHeight={1.02}
        titleMarginTop={16}
        descriptionSize={28}
        descriptionMaxWidth={940}
      />
    </OgFrame>,
    { ...ogSize, fonts: await loadOgFonts() },
  );
}
