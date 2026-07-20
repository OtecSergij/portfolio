import { useEffect, useState } from "react";

const BAND_BOTTOM_PERCENT = 45;

export function useScrollSpy(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);
    const firstSection = sections[0];
    if (firstSection === undefined) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .at(0);
        if (mostVisible !== undefined) {
          setActiveId(mostVisible.target.id);
        } else if (
          firstSection.getBoundingClientRect().top >=
          window.innerHeight * (BAND_BOTTOM_PERCENT / 100)
        ) {
          setActiveId(null);
        }
      },
      {
        rootMargin: `-30% 0px -${String(100 - BAND_BOTTOM_PERCENT)}% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
    return () => {
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
}
