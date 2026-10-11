import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Serviço | nuv." },
      { name: "description", content: "Condições dos pacotes de criação de sites da nuv.: escopo, prazos, ajustes e custos extras." },
      { property: "og:title", content: "Termos de Serviço | nuv." },
      { property: "og:description", content: "Condições dos pacotes de criação de sites da nuv.: escopo, prazos, ajustes e custos extras." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/termos" }],
  }),
  component: () => (
    <LegalPage title="Termos de Serviço">
      <h2>Serviços</h2>
      <p>A nuv. oferece desenvolvimento de landing pages, sites profissionais e sites com agendamento online, conforme os pacotes e escopos descritos no site.</p>
      <h2>Valores</h2>
      <p>Os valores dos pacotes (R$ 249, R$ 399 e R$ 499) são fixos e correspondem a pagamento único pelo desenvolvimento dentro do escopo informado. Domínio, hospedagem, assinaturas de ferramentas, integrações pagas, manutenção contínua e funcionalidades adicionais não estão incluídos. Custos extras são informados previamente.</p>
      <h2>Prazos</h2>
      <p>Os prazos estimados começam a contar após o recebimento de todo o material, dos acessos necessários e da confirmação do escopo.</p>
      <h2>Ajustes</h2>
      <p>Cada pacote inclui o número de rodadas de ajustes indicado. Alterações fora do escopo exigem orçamento adicional.</p>
      <h2>Resultados</h2>
      <p>Um site profissional ajuda na apresentação e no contato com clientes, mas não garante resultados comerciais.</p>
      <h2>Conteúdo do cliente</h2>
      <p>O cliente é responsável pelos textos, imagens e marcas fornecidos e por possuir autorização para utilizá-los.</p>
    </LegalPage>
  ),
});
