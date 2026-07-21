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
  name: "Dmitrii Zablotskii",
  role: "Senior Fullstack Engineer",
  tagline:
    "Shipping AI features into B2B SaaS — production systems where the model is one component of a larger product.",
  siteUrl: "https://zablotsky.dev",
  repoUrl: "https://github.com/OtecSergij/portfolio",
  updatedAt: "2026-07-21",
  contacts: {
    email: { user: "zablotskydev", domain: "gmail.com" },
    telegram: "otec_sergij",
    github: "https://github.com/OtecSergij",
    linkedin: null,
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
  { id: "work", label: "Work" },
];
