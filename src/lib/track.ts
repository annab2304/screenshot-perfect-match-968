// Pontos de medição para GA4 / Google Ads. Só dispara se gtag estiver
// instalado (IDs reais em src/config/site.ts + consentimento).
type EventName =
  | "whatsapp_click" // clique de contato (não é contratação)
  | "select_package"
  | "quote_summary_generated" // formulário preenchido e resumo gerado
  | "quote_sent_whatsapp"; // cliente abriu o WhatsApp com o resumo

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") w.gtag("event", event, params);
  else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
}
