export type Contacts = {
  email: { user: string; domain: string };
  telegram: string;
  github: string;
  linkedin: string | null;
};

export type SiteConfig = {
  name: string;
  role: string;
  tagline: string;
  siteUrl: string;
  repoUrl: string;
  updatedAt: string;
  contacts: Contacts;
};

export const site: SiteConfig = {
  name: "Dmitry Zablotsky",
  role: "Senior Full-stack Engineer",
  tagline:
    "6 years of production TypeScript across Node and React. Now shipping AI features into B2B SaaS — systems where the model is one component, not the whole product.",
  siteUrl: "https://zablotsky.dev",
  repoUrl: "https://github.com/OtecSergij/portfolio",
  updatedAt: "2026-07-21",
  contacts: {
    email: { user: "zablotskydev", domain: "gmail.com" },
    telegram: "otec_sergij",
    github: "https://github.com/OtecSergij",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? null,
  },
};

export const siteInitials = site.name
  .split(" ")
  .map((word) => word.charAt(0))
  .join("");

export type NavItem = {
  id: string;
  label: string;
};

export const navItems: readonly NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
];
