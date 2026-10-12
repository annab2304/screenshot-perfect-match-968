import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { btnClass, SiteButton } from "./Button";
import { site } from "@/config/site";
import { track } from "@/lib/track";

const nav = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contato", label: "Contato" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="text-3xl" aria-label="nuv. — início">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/orcamento" className={btnClass({ size: "sm", className: "hidden sm:inline-flex" })}>
            Solicitar orçamento
          </Link>
          <SiteButton
            variant="plain"
            className="h-11 w-11 shrink-0 p-0 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </SiteButton>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 pt-2 lg:hidden">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-border/60 py-4 text-lg font-semibold">
              {n.label}
            </a>
          ))}
          <Link to="/orcamento" onClick={() => setOpen(false)} className={btnClass({ className: "mt-5 w-full" })}>
            Solicitar orçamento
          </Link>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo className="text-5xl" />
          <p className="eyebrow mt-4 text-ink-foreground/60">{site.slogan}</p>
          <p className="mt-6 max-w-xs text-sm text-ink-foreground/60">{site.area}. Atendimento por {site.owner}.</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4 text-nude">Navegação</p>
          <ul className="space-y-2 text-ink-foreground/70">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-ink-foreground">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4 text-nude">Contato</p>
          <ul className="space-y-2 text-ink-foreground/70">
            <li><a href={site.whatsapp.qrLink} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { place: "footer" })} className="hover:text-ink-foreground">WhatsApp</a></li>
            <li><Link to="/orcamento" className="hover:text-ink-foreground">Solicitar orçamento</Link></li>
            <li><Link to="/privacidade" className="hover:text-ink-foreground">Política de privacidade</Link></li>
            <li><Link to="/termos" className="hover:text-ink-foreground">Termos de serviço</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 pb-24 pt-6 text-center text-xs text-ink-foreground/50 sm:py-6">
        © {new Date().getFullYear()} nuv. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={site.whatsapp.qrLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { place: "floating" })}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-ink-foreground shadow-2xl ring-1 ring-nude/40 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-5 sm:h-14 sm:w-auto sm:px-5"
      aria-label="Fale com a nuv. pelo WhatsApp"
    >
      <MessageCircle size={20} className="text-nude" />
      <span className="hidden sm:inline">Fale com a nuv.</span>
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
