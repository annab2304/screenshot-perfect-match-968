import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | nuv." },
      { name: "description", content: "Saiba quais dados a nuv. coleta, como são usados e como solicitar informações." },
      { property: "og:title", content: "Política de Privacidade | nuv." },
      { property: "og:description", content: "Saiba quais dados a nuv. coleta, como são usados e como solicitar informações." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: () => (
    <LegalPage title="Política de Privacidade">
      <h2>Quais dados coletamos</h2>
      <p>No formulário de orçamento você pode informar: nome, empresa, WhatsApp, e-mail, segmento, Instagram ou site atual, descrição do projeto, funcionalidades, prazo e observações.</p>
      <h2>Como os dados são tratados</h2>
      <p>Atualmente, o formulário não armazena seus dados em servidores. Ele apenas gera um resumo no seu próprio navegador para que você o envie voluntariamente pelo WhatsApp. Os dados passam a ser conhecidos pela nuv. somente quando você envia a mensagem.</p>
      <h2>Para que usamos</h2>
      <ul>
        <li>Responder à sua solicitação de orçamento;</li>
        <li>Entrar em contato sobre o projeto solicitado.</li>
      </ul>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
      <h2>Serviços de terceiros</h2>
      <p>A comunicação acontece pelo WhatsApp, sujeito à política de privacidade do próprio WhatsApp. Caso ferramentas de análise (como Google Analytics) sejam ativadas no futuro, esta política será atualizada.</p>
      <h2>Seus direitos (LGPD)</h2>
      <p>Você pode solicitar acesso, correção ou exclusão dos dados enviados a qualquer momento, entrando em contato com {site.owner} pelo <a className="underline" href={site.whatsapp.qrLink} target="_blank" rel="noopener noreferrer">WhatsApp da nuv.</a></p>
    </LegalPage>
  ),
});
