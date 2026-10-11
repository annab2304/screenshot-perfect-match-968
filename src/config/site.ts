// Configuração central da nuv. — atualize aqui contatos, preços e integrações.
export const site = {
  name: "nuv.",
  slogan: "Sites que impulsionam seu negócio.",
  owner: "Anna Beatriz",
  area: "Atendimento online, em todo o Brasil",
  whatsapp: {
    // Link público atual (QR). Não aceita mensagem pré-preenchida.
    qrLink: "https://wa.me/qr/OGN3PX26JF3VL1",
    // Quando houver número com DDD, preencha (ex.: "5511999999999") para
    // abrir wa.me com o resumo do orçamento já escrito.
    number: "" as string,
  },
  email: "" as string, // ainda não configurado
  instagram: "" as string, // ainda não configurado
  domain: "" as string, // ainda não configurado
  analytics: {
    ga4Id: "" as string, // ex.: "G-XXXXXXX" — deixe vazio até ter o ID real
    adsId: "" as string, // ex.: "AW-XXXXXXX"
  },
  portfolio: {
    studioJanaLashUrl: "" as string, // link do protótipo, quando disponível
  },
};

export type PackageId = "landing" | "profissional" | "agendamento";

export const packages: {
  id: PackageId;
  name: string;
  price: number;
  ideal: string;
  features: string[];
  deadline: string;
  cta: string;
  featured?: boolean;
}[] = [
  {
    id: "landing",
    name: "Landing Page",
    price: 249,
    ideal: "Ideal para divulgar um produto, serviço ou campanha.",
    features: [
      "Uma página personalizada",
      "Até 5 seções",
      "Design responsivo",
      "Botão de WhatsApp",
      "Formulário simples de contato",
      "Links para redes sociais",
      "SEO básico",
      "Uma rodada de ajustes",
    ],
    deadline: "Até 5 dias úteis após o recebimento de todo o material e confirmação do escopo.",
    cta: "Quero minha Landing Page",
  },
  {
    id: "profissional",
    name: "Site Profissional",
    price: 399,
    ideal: "Ideal para empresas e profissionais que precisam apresentar seus serviços com credibilidade.",
    features: [
      "Até 5 páginas ou seções principais, conforme o escopo",
      "Design personalizado",
      "Layout responsivo",
      "Apresentação da empresa",
      "Catálogo de serviços",
      "Galeria ou portfólio",
      "Formulário de contato",
      "Integração com WhatsApp",
      "Links para redes sociais",
      "SEO básico",
      "Duas rodadas de ajustes",
    ],
    deadline: "Até 7 dias úteis após o recebimento de todo o material e confirmação do escopo.",
    cta: "Quero meu Site Profissional",
    featured: true,
  },
  {
    id: "agendamento",
    name: "Site com Agendamento",
    price: 499,
    ideal: "Ideal para studios de beleza, profissionais autônomos e negócios que trabalham com horários marcados.",
    features: [
      "Site profissional com até 5 páginas ou seções principais",
      "Design personalizado",
      "Catálogo de serviços",
      "Galeria de trabalhos",
      "Informações sobre procedimentos",
      "Integração com WhatsApp",
      "Integração com Cal.com",
      "Seleção de data e horário pela agenda",
      "Layout responsivo",
      "SEO básico",
      "Duas rodadas de ajustes",
    ],
    deadline:
      "Até 10 dias úteis após o recebimento de todo o material, dos acessos necessários e da confirmação do escopo.",
    cta: "Quero meu Site com Agendamento",
  },
];

export const formatPrice = (v: number) => `R$ ${v}`;
