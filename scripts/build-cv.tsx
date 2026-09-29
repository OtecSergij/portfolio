import { mkdir, realpath, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";

import {
  resume,
  resumeFileName,
  resumePublicPath,
  type Resume,
} from "@/content/resume";

import { renderResume, unrenderableCharacters } from "./cv/ResumeDocument";

const variants = ["public", "application"] as const;

type Variant = (typeof variants)[number];

const usage =
  "usage: npm run build:cv -- [--variant public|application] [--out <file>]";

const repoRoot = await realpath(path.resolve(import.meta.dirname, ".."));

const defaultOut: Record<Variant, string> = {
  public: path.join(repoRoot, "public", resumePublicPath),
  application: path.join(homedir(), "Downloads", resumeFileName),
};

function fail(message: string): never {
  console.error(`build-cv: ${message}`);
  process.exit(1);
}

function readArgs() {
  try {
    return parseArgs({
      options: {
        variant: { type: "string", default: "public" },
        out: { type: "string" },
      },
    }).values;
  } catch (error) {
    fail(`${error instanceof Error ? error.message : String(error)}\n${usage}`);
  }
}

function isVariant(value: string): value is Variant {
  return variants.some((candidate) => candidate === value);
}

function isWithin(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return (
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function isMissing(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

async function resolveReal(target: string): Promise<string> {
  try {
    return await realpath(target);
  } catch (error) {
    const parent = path.dirname(target);
    if (!isMissing(error) || parent === target) throw error;
    return path.join(await resolveReal(parent), path.basename(target));
  }
}

function readPhone(): string {
  const phone = process.env.CV_PHONE?.trim() ?? "";
  if (phone === "") {
    fail(
      "CV_PHONE is empty. The application variant needs it: CV_PHONE='+381 ...' npm run build:cv -- --variant application",
    );
  }
  return phone;
}

const args = readArgs();
const { variant } = args;
if (!isVariant(variant)) {
  fail(`unknown --variant "${variant}", expected public or application`);
}

const phone = variant === "application" ? readPhone() : null;
const data: Resume = { ...resume, contacts: { ...resume.contacts, phone } };
const unrenderable = unrenderableCharacters(data);
if (unrenderable.length > 0) {
  fail(
    `built-in Helvetica cannot encode these characters: ${unrenderable.join(" ")}`,
  );
}

const outPath = path.resolve(args.out ?? defaultOut[variant]);
const outDir = path.dirname(outPath);
if (phone !== null && isWithin(repoRoot, await resolveReal(outDir))) {
  fail(
    `the application variant carries a phone number, write it outside the repository (${repoRoot}), e.g. --out ${defaultOut.application}`,
  );
}

const pdf = await renderResume(data);
await mkdir(outDir, { recursive: true });
await writeFile(outPath, pdf);
console.log(
  `build-cv: wrote the ${variant} variant to ${outPath} (${String(Math.round(pdf.length / 1024))} KB)`,
);
