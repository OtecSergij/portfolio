import { cn } from "@/lib/cn";
import { type CodeLang, highlightCode } from "@/lib/highlight";

export type CodeBlockProps = {
  lang: CodeLang;
  langLabel: string;
  file: string;
  code: string;
  className?: string;
};

export async function CodeBlock({
  lang,
  langLabel,
  file,
  code,
  className,
}: CodeBlockProps) {
  const html = await highlightCode(code, lang);
  return (
    <div
      className={cn(
        "my-9 overflow-hidden rounded-3 border border-rule-2 bg-plate-2 shadow-tile",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 border-b border-rule-2 bg-plate-3 px-5 py-3 font-mono text-[10.5px] tracking-[0.16em] uppercase md:px-[22px]">
        <span className="text-gold">{langLabel}</span>
        <span className="text-fg-dim">{file}</span>
      </div>
      <div
        className="relative after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-8 after:bg-linear-to-l after:from-plate-2 after:to-transparent [&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:pl-5 [&>pre]:pr-8 [&>pre]:py-[22px] [&>pre]:font-mono [&>pre]:text-[13px] [&>pre]:leading-[1.65] [&>pre]:whitespace-pre md:[&>pre]:pl-6 [&>pre::-webkit-scrollbar]:h-1.5 [&>pre::-webkit-scrollbar-track]:bg-transparent [&>pre::-webkit-scrollbar-thumb]:rounded-full [&>pre::-webkit-scrollbar-thumb]:bg-rule-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
