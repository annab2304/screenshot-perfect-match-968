import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Copy, Check, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { btnClass, SiteButton } from "@/components/site/Button";
import {
  packages,
  formatPrice,
  site,
  type PackageId,
} from "@/config/site";
import { track } from "@/lib/track";

const searchSchema = z.object({
  pacote: z
    .enum(["landing", "profissional", "agendamento"])
    .optional(),
});

export const Route = createFileRoute("/orcamento")({
  validateSearch: searchSchema,

  head: () => ({
    meta: [
      {
        title: "Solicitar orçamento | nuv.",
      },
      {
        name: "description",
        content:
          "Escolha seu pacote e envie as informações do seu projeto de site para a nuv.",
      },
      {
        property: "og:title",
        content: "Solicitar orçamento | nuv.",
      },
      {
        property: "og:description",
        content:
          "Escolha seu pacote e envie as informações do seu projeto de site para a nuv.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "/orcamento",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "/orcamento",
      },
    ],
  }),

  component: Quote,
});

const formSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(100),

  empresa: z
    .string()
    .trim()
    .min(1, "Informe o nome da empresa")
    .max(100),

  whatsapp: z
    .string()
    .trim()
    .max(20)
    .regex(
      /^[\d\s()+-]+$/,
      "WhatsApp inválido (com DDD)",
    )
    .refine(
      (value) =>
        /^\d{10,13}$/.test(
          value.replace(/\D/g, ""),
        ),
      "Informe um WhatsApp válido com DDD",
    ),

  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .max(255),

  segmento: z
    .string()
    .trim()
    .min(2, "Informe o segmento")
    .max(100),

  atual: z
    .string()
    .trim()
    .max(200)
    .optional(),

  objetivo: z
    .string()
    .trim()
    .min(5, "Conte o que deseja criar")
    .max(1000),

  funcionalidades: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  prazo: z
    .string()
    .trim()
    .max(100)
    .optional(),

  obs: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  consent: z.literal(true, {
    message: "É necessário aceitar para continuar",
  }),
});

type Form = z.infer<typeof formSchema>;

const fields: {
  k: keyof Form;
  label: string;
  type?: string;
  area?: boolean;
  optional?: boolean;
}[] = [
  {
    k: "nome",
    label: "Nome completo",
  },
  {
    k: "empresa",
    label: "Nome da empresa",
  },
  {
    k: "whatsapp",
    label: "WhatsApp (com DDD)",
    type: "tel",
  },
  {
    k: "email",
    label: "E-mail",
    type: "email",
  },
  {
    k: "segmento",
    label: "Segmento do negócio",
  },
  {
    k: "atual",
    label: "Instagram ou site atual",
    optional: true,
  },
  {
    k: "objetivo",
    label: "O que deseja criar?",
    area: true,
  },
  {
    k: "funcionalidades",
    label: "Funcionalidades desejadas",
    area: true,
    optional: true,
  },
  {
    k: "prazo",
    label: "Prazo desejado",
    optional: true,
  },
  {
    k: "obs",
    label: "Observações adicionais",
    area: true,
    optional: true,
  },
];

function Quote() {
  const { pacote } = Route.useSearch();

  const [pkg, setPkg] =
    useState<PackageId>(
      pacote ?? "profissional",
    );

  const [values, setValues] = useState<
    Record<string, string>
  >(() =>
    Object.fromEntries(
      fields.map(({ k }) => [k, ""]),
    ),
  );

  const [consent, setConsent] =
    useState(false);

  const [honeypot, setHoneypot] =
    useState("");

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [summary, setSummary] = useState<
    string | null
  >(null);

  const [copied, setCopied] =
    useState(false);

  const [copyError, setCopyError] =
    useState("");

  const selected = packages.find(
    (p) => p.id === pkg,
  );

  if (!selected) {
    return null;
  }

  function invalidateSummary() {
    setSummary(null);
    setCopied(false);
    setCopyError("");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!selected) {
      return;
    }

    if (honeypot) {
      return;
    }

    const r = formSchema.safeParse({
      ...values,
      consent,
    });

    if (!r.success) {
      const errs: Record<
        string,
        string
      > = {};

      r.error.issues.forEach((i) => {
        errs[String(i.path[0])] =
          i.message;
      });

      setErrors(errs);
      return;
    }

    setErrors({});

    const d = r.data;

    const text = [
      "Olá, nuv.! Gostaria de solicitar um orçamento.",
      "",
      `Pacote: ${selected.name} — ${formatPrice(
        selected.price,
      )}`,
      `Nome: ${d.nome}`,
      `Empresa: ${d.empresa}`,
      `WhatsApp: ${d.whatsapp}`,
      `E-mail: ${d.email}`,
      `Segmento: ${d.segmento}`,
      d.atual &&
        `Instagram/site atual: ${d.atual}`,
      `O que deseja criar: ${d.objetivo}`,
      d.funcionalidades &&
        `Funcionalidades: ${d.funcionalidades}`,
      d.prazo &&
        `Prazo desejado: ${d.prazo}`,
      d.obs &&
        `Observações: ${d.obs}`,
    ]
      .filter(Boolean)
      .join("\n");

    setSummary(text);
    setCopied(false);
    setCopyError("");

    track("quote_summary_generated", {
      package: pkg,
      value: selected.price,
      currency: "BRL",
    });

    setTimeout(() => {
      document
        .getElementById("resumo")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  }

  const waHref =
    summary &&
    /^\d{10,15}$/.test(
      site.whatsapp.number,
    )
      ? `https://wa.me/${
          site.whatsapp.number
        }?text=${encodeURIComponent(
          summary,
        )}`
      : site.whatsapp.qrLink;

  async function copy() {
    if (!summary) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        summary,
      );

      setCopied(true);
      setCopyError("");
    } catch {
      setCopyError(
        "Não foi possível copiar automaticamente. Selecione e copie o pedido abaixo.",
      );
    }
  }

  function handleWhatsAppConversion() {
    // Mantém o rastreamento que já existia no site.
    track("quote_whatsapp_opened", {
      package: pkg,
      value: selected.price,
      currency: "BRL",
    });

    // Envia a conversão para o Google Ads.
    const googleWindow =
      window as typeof window & {
        gtag?: (
          ...args: unknown[]
        ) => void;
      };

    googleWindow.gtag?.(
      "event",
      "conversion",
      {
        send_to:
          "AW-18502286724/Q0rgCMajnZ4dEIT7yfZE",
      },
    );
  }

  const input =
    "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-base outline-none transition focus:border-ink";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <p className="eyebrow text-nude-deep">
          Solicitar orçamento
        </p>

        <h1 className="display mt-4 text-4xl sm:text-5xl">
          Conte sobre o seu projeto.
        </h1>

        <p className="mt-5 text-muted-foreground">
          Este formulário apenas prepara
          seu pedido.{" "}
          <strong className="text-foreground">
            Gerar o resumo não envia a
            solicitação.
          </strong>{" "}
          Para solicitar o orçamento,
          copie o pedido e envie na
          conversa com a nuv. pelo
          WhatsApp.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {packages.map((p) => (
            <SiteButton
              variant="plain"
              key={p.id}
              type="button"
              onClick={() => {
                setPkg(p.id);
                invalidateSummary();

                track("select_package", {
                  package: p.id,
                  value: p.price,
                  currency: "BRL",
                });
              }}
              className={`h-auto min-h-24 flex-col items-start gap-0 rounded-2xl border p-4 text-left transition ${
                pkg === p.id
                  ? "border-ink bg-ink text-ink-foreground"
                  : "border-border bg-card hover:border-ink"
              }`}
              aria-pressed={pkg === p.id}
            >
              <span className="block text-sm font-semibold">
                {p.name}
              </span>

              <span className="mt-1 block text-2xl font-extrabold">
                {formatPrice(p.price)}
              </span>
            </SiteButton>
          ))}
        </div>

        <form
          onSubmit={submit}
          onChange={invalidateSummary}
          noValidate
          className="mt-10 grid gap-5 sm:grid-cols-2"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) =>
              setHoneypot(
                e.target.value,
              )
            }
            className="hidden"
            aria-hidden="true"
          />

          {fields.map((f) => (
            <label
              key={f.k}
              className={`block text-sm font-semibold ${
                f.area
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              {f.label}{" "}
              {f.optional && (
                <span className="font-normal text-muted-foreground">
                  (opcional)
                </span>
              )}

              {f.area ? (
                <textarea
                  name={f.k}
                  rows={3}
                  required={!f.optional}
                  aria-invalid={Boolean(
                    errors[f.k],
                  )}
                  aria-describedby={
                    errors[f.k]
                      ? `error-${f.k}`
                      : undefined
                  }
                  className={input}
                  value={
                    values[f.k] ?? ""
                  }
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [f.k]:
                        e.target.value,
                    })
                  }
                  maxLength={1000}
                />
              ) : (
                <input
                  name={f.k}
                  required={!f.optional}
                  aria-invalid={Boolean(
                    errors[f.k],
                  )}
                  aria-describedby={
                    errors[f.k]
                      ? `error-${f.k}`
                      : undefined
                  }
                  type={
                    f.type ?? "text"
                  }
                  className={input}
                  value={
                    values[f.k] ?? ""
                  }
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [f.k]:
                        e.target.value,
                    })
                  }
                  maxLength={
                    f.k === "email"
                      ? 255
                      : f.k ===
                          "whatsapp"
                        ? 20
                        : f.k ===
                            "atual"
                          ? 200
                          : 100
                  }
                />
              )}

              {errors[f.k] && (
                <span
                  id={`error-${f.k}`}
                  role="alert"
                  className="mt-1 block text-xs font-normal text-destructive"
                >
                  {errors[f.k]}
                </span>
              )}
            </label>
          ))}

          <label className="flex gap-3 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) =>
                setConsent(
                  e.target.checked,
                )
              }
              className="mt-1 h-4 w-4 accent-ink"
            />

            <span>
              Autorizo o uso dos dados
              informados para contato
              sobre este orçamento,
              conforme a{" "}
              <Link
                to="/privacidade"
                className="underline"
              >
                Política de Privacidade
              </Link>
              .

              {errors["consent"] && (
                <span className="block text-xs text-destructive">
                  {
                    errors[
                      "consent"
                    ]
                  }
                </span>
              )}
            </span>
          </label>

          <SiteButton
            type="submit"
            size="lg"
            className="h-auto min-h-14 px-4 py-3 text-center sm:col-span-2"
          >
            Gerar resumo do pedido
          </SiteButton>
        </form>

        {summary && (
          <div
            id="resumo"
            className="mt-12 scroll-mt-24 rounded-3xl bg-ink p-5 text-ink-foreground fade-up sm:p-8"
          >
            <p className="eyebrow text-nude">
              Último passo
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Envie seu pedido pelo
              WhatsApp
            </h2>

            <p
              role="status"
              className="mt-4 font-semibold text-nude"
            >
              Pedido preparado —
              solicitação ainda não
              enviada.
            </p>

            <p className="mt-3 text-sm text-ink-foreground/70">
              {site.whatsapp.number
                ? "Ao abrir o WhatsApp, a mensagem já virá preenchida. Basta tocar em enviar."
                : "Seu pedido ainda não foi enviado. Copie o resumo abaixo, abra o WhatsApp da nuv. e cole a mensagem na conversa."}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <SiteButton
                onClick={copy}
                variant="ghostLight"
                className="h-auto min-h-12 px-4 py-3"
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}

                {copied
                  ? "Pedido copiado"
                  : "Copiar pedido"}
              </SiteButton>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={
                  handleWhatsAppConversion
                }
                className={btnClass({
                  variant: "nude",
                  className:
                    "h-auto min-h-12 px-4 py-3 text-center",
                })}
              >
                <MessageCircle
                  size={16}
                  className="shrink-0"
                />

                Abrir WhatsApp para enviar
              </a>
            </div>

            {copyError && (
              <p
                role="alert"
                className="mt-4 text-sm text-nude"
              >
                {copyError}
              </p>
            )}

            <pre className="mt-6 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-graphite p-5 text-sm">
              {summary}
            </pre>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
