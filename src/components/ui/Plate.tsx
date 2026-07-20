import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type PlateProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "plate" | "card";
  brushed?: boolean;
  grit?: boolean;
  interactive?: boolean;
};

export function Plate({
  variant = "plate",
  brushed = false,
  grit = false,
  interactive = false,
  className,
  children,
  ...rest
}: PlateProps) {
  return (
    <div
      {...rest}
      className={cn(
        "relative",
        variant === "plate"
          ? "rounded-5 shadow-plate"
          : "overflow-hidden rounded-4 shadow-tile",
        brushed ? "plate-brushed" : "bg-plate-3",
        grit && "grit overflow-hidden [&>*]:relative [&>*]:z-[1]",
        interactive &&
          "transition-[transform,box-shadow] duration-200 ease-[ease] hover:shadow-plate motion-safe:hover:-translate-y-[3px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
