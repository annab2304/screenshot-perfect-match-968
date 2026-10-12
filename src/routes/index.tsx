import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Plus, Minus, Tag, Smartphone, Palette, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Logo } from "@/components/site/Logo";
import { btnClass, SiteButton } from "@/components/site/Button";
import { z } from "zod";
import { packages, formatPrice, site } from "@/config/site";
import { track } from "@/lib/track";
import hero from "@/assets/hero-mockup.jpg";
import pBeauty from "@/assets/portfolio-beauty.jpg";
import pLanding from "@/assets/portfolio-landing.jpg";
import pInst from "@/assets/portfolio-institucional.jpg";

const TITLE = "nuv. | Criação de Sites, Landing Pages e Agendamentos";
const DESC =
  "Criação de sites profissionais a partir de R$ 249. Landing pages, sites institucionais e agendamento online com preços transparentes. Conheça a nuv.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Pricing />
      <Benefits />
      <HowItWorks />
      <Portfolio />
      <About />
      <Faq />
      <FinalCta />
      <Contact />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[1.05fr_1fr] md:pt-24">
        <div className="fade-up">
          <p className="eyebrow text-nude-deep">Sites · Landing pages · Agendamento online</p>
          <h1 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
            Seu negócio merece um site que <span className="text-nude-deep">impressiona.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Criamos sites modernos, funcionais e estratégicos para fortalecer sua presença digital e facilitar a
            conquista de novos clientes.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#servicos" className={btnClass({ size: "lg" })}>
              Quero meu site <ArrowRight size={18} />
            </a>
            <a href="#servicos" className={btnClass({ variant: "outline", size: "lg" })}>
              Conhecer os serviços
            </a>
          </div>
          <ul className="mt-10 grid gap-3 text-sm font-medium sm:grid-cols-3">
            {["Preços transparentes", "Sites responsivos", "Atendimento personalizado"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-nude-deep" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative fade-up [animation-delay:150ms]">
          <div className="absolute -right-24 -top-16 hidden h-96 w-96 rounded-full border-[40px] border-nude/40 md:block" />
          <img
            src={hero}
            alt="Mockup de site moderno em notebook e celular"
            width={1536}
            height={1152}
            className="relative rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, light }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-nude" : "text-nude-deep"}`}>{eyebrow}</p>
      <h2 className="display mt-4 text-4xl sm:text-5xl">{title}</h2>
    </div>
  );
}

function Pricing() {
  return (
    <section id="servicos" className="bg-ink py-24 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead light eyebrow="Pacotes e preços" title="Preço fixo, escopo claro." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.id}
              className={`flex min-w-0 flex-col rounded-3xl p-6 sm:p-8 ${
                p.featured ? "bg-paper text-ink" : "border border-ink-foreground/15 bg-graphite/40"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold">{p.name}</h3>
                {p.featured && <span className="eyebrow rounded-full bg-nude px-3 py-1 text-[0.6rem] text-ink">Mais completo</span>}
              </div>
              <p className="mt-6 text-5xl font-extrabold sm:text-6xl">{formatPrice(p.price)}</p>
              <p className={`mt-2 text-xs ${p.featured ? "text-muted-foreground" : "text-ink-foreground/60"}`}>
                pagamento único pelo desenvolvimento
              </p>
              <p className={`mt-6 text-sm ${p.featured ? "text-graphite" : "text-ink-foreground/80"}`}>{p.ideal}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check size={16} className="mt-0.5 shrink-0 text-nude-deep" /> {f}
                  </li>
                ))}
              </ul>
              <p className={`mt-6 border-t pt-4 text-xs ${p.featured ? "border-border text-muted-foreground" : "border-ink-foreground/15 text-ink-foreground/60"}`}>
                <strong>Prazo estimado:</strong> {p.deadline}
              </p>
              <Link
                to="/orcamento"
                search={{ pacote: p.id }}
                onClick={() => track("select_package", { package: p.id, value: p.price, currency: "BRL" })}
                className={btnClass({ variant: p.featured ? "ink" : "nude", className: "mt-6 h-auto min-h-12 w-full px-4 py-3 text-center" })}
              >
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm text-ink-foreground/60">
          Os valores incluem o desenvolvimento dentro do escopo informado. Domínio, hospedagem, assinaturas de
          ferramentas, integrações pagas, manutenção contínua e funcionalidades adicionais não estão incluídos. Custos
          extras são informados previamente.
        </p>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Tag, t: "Preços transparentes", d: "Você sabe o valor antes de contratar." },
    { icon: Palette, t: "Design personalizado", d: "Um site pensado para a identidade do seu negócio." },
    { icon: Smartphone, t: "Experiência responsiva", d: "Seu site funciona em celulares, tablets e computadores." },
    { icon: MessageCircle, t: "Contato facilitado", d: "WhatsApp, formulários e agendamentos para aproximar você dos seus clientes." },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Diferenciais" title="Seu negócio no digital, sem complicação." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: I, t, d }) => (
            <div key={t} className="bg-background p-8">
              <I size={22} strokeWidth={1.5} className="text-nude-deep" />
              <h3 className="mt-6 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Escolha seu pacote", "Selecione a solução ideal para seu negócio."],
    ["Conte sua ideia", "Envie as informações e referências necessárias."],
    ["Criamos seu site", "Desenvolvemos o projeto conforme o escopo contratado."],
    ["Colocamos seu projeto no ar", "Após aprovação, orientamos sobre domínio, hospedagem e publicação."],
  ];
  return (
    <section id="como-funciona" className="bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Como funciona" title="Quatro etapas, do pedido ao ar." />
        <ol className="mt-14 grid gap-10 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="border-t border-ink pt-6">
              <span className="text-5xl font-extrabold text-nude-deep">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Portfolio() {
  const demoUrlSchema = z.string().trim().max(2048).url().refine((url) => new URL(url).protocol === "https:");
  const demoUrl = (value: string) => {
    const result = demoUrlSchema.safeParse(value);
    return result.success ? result.data : undefined;
  };
  const items = [
    { img: pBeauty, t: "Site para studio de beleza", d: "Página de serviços, galeria e agendamento online.", link: demoUrl(site.portfolio.studioJanaLashUrl) },
    { img: pLanding, t: "Landing page comercial", d: "Página para apresentação de produtos e serviços.", link: demoUrl(site.portfolio.landingPageUrl) },
    { img: pInst, t: "Site institucional", d: "Apresentação profissional de empresas e pequenos negócios.", link: demoUrl(site.portfolio.institucionalUrl) },
  ];
  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Portfólio" title="O tipo de site que podemos criar para você." />
        <p className="mt-4 text-sm text-muted-foreground">Projetos conceituais, criados para demonstrar estilo e qualidade.</p>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {items.map((p, i) => (
            <figure key={p.t} className={i === 0 ? "md:col-span-2" : ""}>
              <div className="overflow-hidden rounded-3xl">
                <img src={p.img} alt={`Projeto conceitual: ${p.t}`} loading="lazy" width={1200} height={912} className="w-full transition-transform duration-700 hover:scale-[1.03]" />
              </div>
              <figcaption className="mt-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="eyebrow text-nude-deep">Projeto conceitual</span>
                  <h3 className="mt-1 text-xl font-bold">{p.t}</h3>
                  <p className="text-sm text-muted-foreground">{p.d}</p>
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className={btnClass({ variant: "outline", size: "sm" })}>
                    Ver demonstração <ArrowRight size={14} />
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="bg-secondary py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow text-nude-deep">Sobre</p>
          <Logo className="mt-4 block text-8xl sm:text-9xl" />
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-graphite">
          <p>A nuv. nasceu para tornar a criação de sites profissionais mais simples e acessível para pequenos negócios.</p>
          <p>Acreditamos que uma presença digital bem construída combina design, funcionalidade e uma comunicação clara.</p>
          <p>Nosso objetivo é ajudar empreendedores a apresentar seus serviços com profissionalismo e facilitar o contato com seus clientes.</p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["Quanto custa um site?", "Os pacotes custam R$ 249, R$ 399 e R$ 499, conforme as funcionalidades incluídas."],
  ["Preciso pagar mensalidade?", "Os valores apresentados são pelo desenvolvimento. Domínio, hospedagem e ferramentas de terceiros podem ter custos separados."],
  ["Meu site funciona no celular?", "Sim, todos os pacotes são responsivos."],
  ["Quanto tempo demora?", "De 5 a 10 dias úteis, conforme o pacote e as condições informadas."],
  ["Posso pedir alterações?", "Sim, cada pacote inclui uma ou duas rodadas de ajustes."],
  ["Vocês criam sites com agendamento?", "Sim, utilizamos integração com Cal.com no pacote de agendamento."],
  ["Posso usar meu próprio domínio?", "Sim, desde que seja compatível com a hospedagem escolhida."],
  ["O site inclui manutenção?", "Não. A manutenção contínua pode ser contratada separadamente."],
  ["O site garante vendas?", "Não. Um site profissional ajuda na apresentação e no contato com clientes, mas não garante resultados comerciais."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="Perguntas frequentes" title="Tudo claro antes de começar." />
        <div className="divide-y divide-border border-y border-border">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <SiteButton
                variant="plain"
                className="h-auto w-full justify-between gap-4 rounded-none px-0 py-5 text-left text-base font-semibold"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {q}
                {open === i ? <Minus size={18} className="shrink-0" /> : <Plus size={18} className="shrink-0" />}
              </SiteButton>
              {open === i && <p className="pb-5 text-muted-foreground fade-up">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-ink py-28 text-center text-ink-foreground">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="display text-4xl sm:text-6xl">Sua próxima oportunidade pode começar com um site.</h2>
        <p className="mx-auto mt-6 max-w-xl text-ink-foreground/70">
          Escolha seu pacote e dê o próximo passo para fortalecer sua presença digital.
        </p>
        <a href="#servicos" className={btnClass({ variant: "nude", size: "lg", className: "mt-10" })}>
          Começar meu projeto <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function Contact() {
  const rows: [string, string, string?][] = [
    ["Marca", "nuv."],
    ["Atendimento", site.owner],
    ["WhatsApp", "Abrir conversa", site.whatsapp.qrLink],
    ["E-mail", site.email || "Em breve"],
    ["Instagram", site.instagram || "Em breve"],
  ];
  return (
    <section id="contato" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
        <div>
          <SectionHead eyebrow="Contato" title="Vamos conversar sobre o seu site." />
          <p className="mt-6 text-muted-foreground">{site.area}.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/orcamento" className={btnClass({})}>Solicitar orçamento</Link>
            <a href={site.whatsapp.qrLink} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { place: "contact" })} className={btnClass({ variant: "outline" })}>
              Falar no WhatsApp
            </a>
          </div>
        </div>
        <dl className="divide-y divide-border rounded-3xl border border-border bg-card px-8">
          {rows.map(([k, v, href]) => (
            <div key={k} className="flex items-center justify-between gap-4 py-5">
              <dt className="eyebrow text-muted-foreground">{k}</dt>
              <dd className="font-semibold">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { place: "contact_list" })} className="underline decoration-nude-deep underline-offset-4">{v}</a>
                ) : v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
