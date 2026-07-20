import type { Metadata } from "next";

import { CaseTopbar } from "@/components/case/CaseTopbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Plate } from "@/components/ui/Plate";
import { cn } from "@/lib/cn";
import { pageClass } from "@/lib/layout";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div className="grid-bg-tight flex min-h-dvh flex-col bg-void">
      <div className={pageClass}>
        <CaseTopbar />
      </div>
      <main
        id="main"
        className={cn(pageClass, "flex flex-1 items-center py-14")}
      >
        <Plate
          brushed
          grit
          className="w-full px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14"
        >
          <Pill led="alert">404 · No signal</Pill>
          <h1 className="disp mt-7 text-[clamp(42px,7.5vw,84px)] leading-[0.95] text-fg">
            Nothing at these coordinates
          </h1>
          <p className="mt-6 max-w-[540px] text-[17px] leading-[1.55] text-fg-mute">
            This address is unmapped — mistyped, moved, or never built. The
            console has three routes; this isn&apos;t one of them.
          </p>
          <div className="mt-10">
            <Button href="/">
              <span aria-hidden>←</span> Back to home
            </Button>
          </div>
        </Plate>
      </main>
      <div className={pageClass}>
        <Footer />
      </div>
    </div>
  );
}
