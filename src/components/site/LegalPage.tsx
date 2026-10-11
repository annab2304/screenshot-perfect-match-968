import type { ReactNode } from "react";
import { SiteLayout } from "./Layout";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-16 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-3 [&_p]:text-graphite [&_li]:text-graphite [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        <p className="eyebrow text-nude-deep">nuv.</p>
        <h1 className="display mt-4 text-4xl sm:text-5xl">{title}</h1>
        <p className="text-sm text-muted-foreground">Última atualização: outubro de 2026.</p>
        {children}
      </article>
    </SiteLayout>
  );
}
