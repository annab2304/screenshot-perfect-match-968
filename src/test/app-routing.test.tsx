import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { packages, site } from "@/config/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each(["/", "/orcamento", "/privacidade", "/termos"])("matches a page for %s instead of falling back to not found", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("preserves commercial identity, WhatsApp and package prices", () => {
    expect(site.owner).toBe("nuv.");
    expect(site.whatsapp.qrLink).toBe("https://wa.me/qr/OGN3PX26JF3VL1");
    expect(packages.map(({ price }) => price)).toEqual([249, 399, 499]);
  });
});
