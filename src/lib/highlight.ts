import {
  createHighlighterCore,
  type HighlighterCore,
  type ThemeRegistration,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import lua from "shiki/langs/lua.mjs";
import typescript from "shiki/langs/typescript.mjs";

export type CodeLang = "typescript" | "lua";

const steelTheme: ThemeRegistration = {
  name: "steel",
  settings: [
    {
      settings: {
        foreground: "var(--shiki-foreground)",
        background: "var(--shiki-background)",
      },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "support.type.primitive",
      ],
      settings: { foreground: "var(--shiki-token-keyword)" },
    },
    {
      scope: ["keyword.operator", "storage.type.function.arrow"],
      settings: { foreground: "var(--shiki-foreground)" },
    },
    {
      scope: ["keyword.operator.new", "keyword.operator.expression"],
      settings: { foreground: "var(--shiki-token-keyword)" },
    },
    {
      scope: ["string", "punctuation.definition.string"],
      settings: { foreground: "var(--shiki-token-string)" },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "var(--shiki-token-comment)",
        fontStyle: "italic",
      },
    },
    {
      scope: ["constant.numeric", "constant.language"],
      settings: { foreground: "var(--shiki-token-constant)" },
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "var(--shiki-token-function)" },
    },
  ],
};

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [steelTheme],
    langs: [typescript, lua],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  lang: CodeLang,
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, { lang, theme: "steel" });
}
