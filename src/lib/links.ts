export type LinkAction = {
  label: string;
  href: string;
  external?: true;
  arrow?: "→" | "↗" | "←";
};

export function externalLinkProps(action: Pick<LinkAction, "external">) {
  return action.external
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : undefined;
}
