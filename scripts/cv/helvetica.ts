import { Font } from "@react-pdf/renderer";

type GlyphRun = {
  glyphs: readonly { advanceWidth: number }[];
  positions: { xAdvance: number }[];
};

type LayoutFont = {
  layout: (text: string, ...options: unknown[]) => GlyphRun;
};

export const helvetica = "Helvetica";

export const helveticaWidthEm = { bullet: 0.35, space: 0.278 } as const;

const fontWeights = [400, 700] as const;
const fontStyles = ["normal", "italic"] as const;
const helveticaSources = [
  helvetica,
  `${helvetica}-Bold`,
  `${helvetica}-Oblique`,
  `${helvetica}-BoldOblique`,
];
const winAnsiBeyondLatin1 = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";

let prepared: Promise<void> | undefined;

async function disableKerning(
  fontWeight: (typeof fontWeights)[number],
  fontStyle: (typeof fontStyles)[number],
): Promise<string> {
  const source = Font.getFont({ fontFamily: helvetica, fontWeight, fontStyle });
  await source.load();
  const font = source.data as LayoutFont | null;
  if (font === null) throw new Error(`${source.src} did not load`);
  const layout = font.layout.bind(font);
  font.layout = (text, ...options) => {
    const run = layout(text, ...options);
    run.positions.forEach((position, index) => {
      position.xAdvance = run.glyphs[index]?.advanceWidth ?? position.xAdvance;
    });
    return run;
  };
  return source.src;
}

async function prepare(): Promise<void> {
  Font.registerHyphenationCallback((word) => [word]);
  const patched = new Set(
    await Promise.all(
      fontWeights.flatMap((fontWeight) =>
        fontStyles.map((fontStyle) => disableKerning(fontWeight, fontStyle)),
      ),
    ),
  );
  const complete =
    patched.size === helveticaSources.length &&
    helveticaSources.every((source) => patched.has(source));
  if (!complete) {
    throw new Error(
      `kerning must be disabled in ${helveticaSources.join(", ")}, but it was disabled in ${[...patched].join(", ")}`,
    );
  }
}

export function prepareHelvetica(): Promise<void> {
  prepared ??= prepare();
  return prepared;
}

function isWinAnsi(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 0x20 && code <= 0x7e) ||
    (code >= 0xa0 && code <= 0xff) ||
    winAnsiBeyondLatin1.includes(char)
  );
}

export function unencodableCharacters(text: string): string[] {
  return [...new Set(text)].filter((char) => !isWinAnsi(char));
}
