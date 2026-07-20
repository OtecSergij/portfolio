import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type FigureImage = { src: string; alt: string; position?: string };

export type FigureProps = {
  caption: string;
  size?: "hero" | "body";
  image?: FigureImage;
  children?: ReactNode;
  className?: string;
  captionClassName?: string;
};

const crosshairPositions = [
  "top-3 left-3",
  "top-3 right-3",
  "bottom-3 left-3",
  "bottom-3 right-3",
];

export function Figure({
  caption,
  size = "body",
  image,
  children,
  className,
  captionClassName,
}: FigureProps) {
  const isEmpty = children === undefined && image === undefined;
  const figNumber = caption.match(/^fig\s*(\d+)/i)?.[1];
  const stamp =
    figNumber !== undefined
      ? `FIG ${figNumber} · CAPTURE PENDING`
      : "CAPTURE PENDING";

  return (
    <figure className={className}>
      <div
        aria-hidden={isEmpty || undefined}
        className={cn(
          "grid-bg-tight relative overflow-hidden rounded-4 bg-plate-2 shadow-tile",
          size === "hero"
            ? "h-[260px] sm:h-[400px] lg:h-[560px]"
            : "h-[240px] sm:h-[360px] lg:h-[480px]",
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 1160px, 100vw"
            className="object-cover"
            style={
              image.position ? { objectPosition: image.position } : undefined
            }
            priority={size === "hero"}
          />
        ) : isEmpty ? (
          <>
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center px-6 text-center font-mono text-[10px] tracking-[0.3em] text-fg-faint uppercase"
            >
              {stamp}
            </span>
            {crosshairPositions.map((pos) => (
              <span
                key={pos}
                aria-hidden
                className={cn("absolute size-[9px]", pos)}
              >
                <span className="absolute top-1/2 left-0 h-px w-full bg-rule-3" />
                <span className="absolute top-0 left-1/2 h-full w-px bg-rule-3" />
              </span>
            ))}
          </>
        ) : (
          children
        )}
      </div>
      <figcaption
        className={cn(
          "mt-3.5 max-w-[720px] font-mono text-[11.5px] leading-[1.6] tracking-[0.18em] text-fg-dim uppercase",
          captionClassName,
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
