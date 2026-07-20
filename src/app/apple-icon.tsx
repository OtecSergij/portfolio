import { ImageResponse } from "next/og";

import { loadOgFonts, ogColors, ogInitials } from "@/lib/og/shared";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ogColors.plate4,
        color: ogColors.gold,
        fontFamily: "JetBrains Mono",
        fontSize: 74,
        letterSpacing: 3,
      }}
    >
      {ogInitials}
    </div>,
    { ...size, fonts: await loadOgFonts() },
  );
}
