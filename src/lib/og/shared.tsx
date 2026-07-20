import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

import { site, siteInitials } from "@/config/site";
import type { LedTone, StatusChip } from "@/lib/tones";

export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  void: "#07080a",
  plate2: "#121418",
  plate4: "#22262e",
  rule2: "rgba(255, 255, 255, 0.09)",
  fg: "#eceef2",
  fgMute: "#a6acb8",
  fgDim: "#7d8493",
  gold: "#b99563",
  ok: "#5fb07a",
  warn: "#e39a3a",
  alert: "#d4593b",
  cold: "#6b8eaa",
  gridLine: "rgba(255, 255, 255, 0.05)",
} as const;

export const ogLedColor: Record<LedTone, string> = {
  ok: ogColors.ok,
  gold: ogColors.gold,
  warn: ogColors.warn,
  alert: ogColors.alert,
  cold: ogColors.cold,
};

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500;
  style: "normal";
};

export async function loadOgFonts(): Promise<OgFont[]> {
  const [oswald, mono, sans] = await Promise.all([
    readFile(join(process.cwd(), "src/lib/og/fonts/Oswald-Medium.ttf")),
    readFile(join(process.cwd(), "src/lib/og/fonts/JetBrainsMono-Medium.ttf")),
    readFile(join(process.cwd(), "src/lib/og/fonts/InterTight-Regular.ttf")),
  ]);
  return [
    { name: "Oswald", data: oswald, weight: 500, style: "normal" },
    { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
    { name: "Inter Tight", data: sans, weight: 400, style: "normal" },
  ];
}

export const ogInitials = siteInitials;

const domain = new URL(site.siteUrl).host;

function OgBadge() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: 10,
        backgroundColor: ogColors.plate4,
        border: `1px solid ${ogColors.rule2}`,
        color: ogColors.gold,
        fontFamily: "JetBrains Mono",
        fontSize: 23,
        letterSpacing: 1,
      }}
    >
      {ogInitials}
    </div>
  );
}

export function OgStatusPill({ led, label }: Required<StatusChip>) {
  const color = ogLedColor[led];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 13,
        height: 46,
        padding: "0 22px",
        borderRadius: 999,
        border: `1px solid ${ogColors.rule2}`,
        backgroundColor: ogColors.plate2,
        color: ogColors.fgMute,
        fontFamily: "JetBrains Mono",
        fontSize: 17,
        letterSpacing: 2.5,
        textTransform: "uppercase",
      }}
    >
      <div
        style={{
          width: 11,
          height: 11,
          borderRadius: 999,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      {label}
    </div>
  );
}

export function OgFrame({
  topRight,
  children,
}: {
  topRight?: ReactNode;
  children: ReactNode;
}) {
  const gridAxis = (direction: "to right" | "to bottom") => ({
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: ogSize.width,
    height: ogSize.height,
    backgroundImage: `linear-gradient(${direction}, ${ogColors.gridLine} 1px, transparent 1px)`,
    backgroundSize: "32px 32px",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        padding: 64,
        backgroundColor: ogColors.void,
        fontFamily: "Inter Tight",
      }}
    >
      <div style={gridAxis("to right")} />
      <div style={gridAxis("to bottom")} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <OgBadge />
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: 2,
              color: ogColors.fgDim,
            }}
          >
            {domain}
          </div>
        </div>
        {topRight}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}

export function OgHero({
  kicker,
  title,
  description,
  titleSize,
  titleLineHeight,
  titleMarginTop,
  descriptionSize,
  descriptionMaxWidth,
}: {
  kicker: string;
  title: string;
  description: string;
  titleSize: number;
  titleLineHeight: number;
  titleMarginTop: number;
  descriptionSize: number;
  descriptionMaxWidth: number;
}) {
  return (
    <>
      <div
        style={{
          fontFamily: "JetBrains Mono",
          fontSize: 19,
          letterSpacing: 3.5,
          textTransform: "uppercase",
          color: ogColors.gold,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: "Oswald",
          fontSize: titleSize,
          lineHeight: titleLineHeight,
          textTransform: "uppercase",
          color: ogColors.fg,
          marginTop: titleMarginTop,
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: 84,
          height: 4,
          backgroundColor: ogColors.gold,
          marginTop: 30,
        }}
      />
      <div
        style={{
          fontSize: descriptionSize,
          lineHeight: 1.45,
          color: ogColors.fgMute,
          marginTop: 26,
          maxWidth: descriptionMaxWidth,
        }}
      >
        {description}
      </div>
    </>
  );
}

export async function caseOgImageResponse({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: Required<StatusChip>;
}) {
  return new ImageResponse(
    <OgFrame topRight={<OgStatusPill {...status} />}>
      <OgHero
        kicker="Case study"
        title={title}
        description={description}
        titleSize={96}
        titleLineHeight={1.04}
        titleMarginTop={18}
        descriptionSize={27}
        descriptionMaxWidth={950}
      />
    </OgFrame>,
    { ...ogSize, fonts: await loadOgFonts() },
  );
}
