import { siteInitials } from "@/config/site";

export function Brand() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-[5px] bg-plate-4 font-mono text-[12px] font-bold tracking-[0.04em] text-gold shadow-tile">
      {siteInitials}
    </span>
  );
}
