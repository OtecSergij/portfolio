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
  location: string;
  siteUrl: string;
  repoUrl: string;
  updatedAt: string;
  contacts: Contacts;
};

const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();

export const site: SiteConfig = {
  name: "Dmitry Zablotsky",
  role: "Senior Full-stack Engineer",
  tagline:
    "Six years of production TypeScript: React since 2020, full-stack with Node.js and PostgreSQL since 2024. I take products from requirements to production and stay on call for them.",
  location: "Belgrade, Serbia",
  siteUrl: "https://zablotsky.dev",
  repoUrl: "https://github.com/OtecSergij/portfolio",
  updatedAt: "2026-09-29",
  contacts: {
    email: { user: "zablotskydev", domain: "gmail.com" },
    telegram: "otec_sergij",
    github: "https://github.com/OtecSergij",
    linkedin:
      linkedinUrl === undefined || linkedinUrl === "" ? null : linkedinUrl,
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
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
];
