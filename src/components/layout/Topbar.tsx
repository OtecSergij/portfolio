"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { navItems } from "@/config/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Brand } from "@/components/layout/Brand";
import { Button } from "@/components/ui/Button";
import { Led } from "@/components/ui/Led";
import { Plate } from "@/components/ui/Plate";

const sectionIds = [...navItems.map((item) => item.id), "contact"];

export function Topbar() {
  const activeId = useScrollSpy(sectionIds) ?? sectionIds[0];
  const contactActive = activeId === "contact";

  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && headerRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="relative flex items-center justify-between pt-9 pb-7"
    >
      <Link
        href="/"
        aria-label="Home"
        onClick={() => {
          setMenuOpen(false);
        }}
        className="-m-1.5 inline-flex items-center p-1.5"
      >
        <Brand />
      </Link>
      <nav aria-label="Main" className="flex items-center gap-3 md:gap-8">
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={item.id === activeId ? "true" : undefined}
              className={cn(
                "relative py-2 font-mono text-[11px] tracking-[0.18em] uppercase no-underline transition-colors duration-150",
                item.id === activeId
                  ? "text-fg after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-px after:bg-gold after:shadow-glow-gold"
                  : "text-fg-dim hover:text-gold",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
        <Button
          href="#contact"
          size="sm"
          aria-current={contactActive ? "true" : undefined}
          onClick={() => {
            setMenuOpen(false);
          }}
          className="h-11 md:h-9"
        >
          <Led
            tone="gold"
            size={6}
            className={cn(
              "transition-opacity duration-150",
              !contactActive && "opacity-40",
            )}
          />
          Contact
        </Button>
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="sm"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
          className="h-11 md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </Button>
        <div
          id="mobile-nav"
          className={cn(
            "absolute inset-x-0 top-full z-50 md:hidden",
            !menuOpen && "hidden",
          )}
        >
          <Plate variant="card" brushed>
            <ul>
              {navItems.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li
                    key={item.id}
                    className="border-b border-rule-1 last:border-b-0"
                  >
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 px-5 py-4 font-mono text-[11px] tracking-[0.18em] uppercase no-underline transition-colors duration-150",
                        isActive ? "text-fg" : "text-fg-dim",
                      )}
                    >
                      <span aria-hidden className="grid w-3 place-items-center">
                        {isActive && <Led tone="gold" size={6} />}
                      </span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Plate>
        </div>
      </nav>
    </header>
  );
}
