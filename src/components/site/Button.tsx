import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        ink: "bg-ink text-ink-foreground hover:bg-graphite",
        nude: "bg-nude text-ink hover:bg-paper",
        outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ink-foreground",
        ghostLight: "border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground hover:text-ink",
        plain: "",
      },
      size: { md: "h-12 px-6", lg: "h-14 px-8 text-base", sm: "h-10 px-5" },
    },
    defaultVariants: { variant: "ink", size: "md" },
  },
);
export type BtnProps = VariantProps<typeof btn>;
export const btnClass = (p: BtnProps & { className?: string }) => cn(btn(p), p.className);

export function SiteButton({ variant, size, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & BtnProps) {
  return <button className={btnClass({ variant, size, className })} {...props} />;
}
