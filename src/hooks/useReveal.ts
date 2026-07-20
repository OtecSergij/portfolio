import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top <= window.innerHeight) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHidden(false);
          observer.disconnect();
        } else {
          setHidden(true);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, hidden };
}

export function useRevealFade<T extends HTMLElement>() {
  const { ref, hidden } = useReveal<T>();
  return {
    ref,
    fadeClass: cn(
      "transition-opacity duration-200 ease-out",
      hidden && "opacity-0 print:opacity-100",
    ),
  };
}
