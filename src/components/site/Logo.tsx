import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-extrabold tracking-[-0.06em] leading-none", className)} aria-label="nuv.">
      nuv<span className="text-nude">.</span>
    </span>
  );
}
