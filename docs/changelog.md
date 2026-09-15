# 📜 Diário de Bordo & Decisões Arquiteturais (Changelog & ADR)

> **Projeto**: Central de Contas a Pagar & Governança com IA (iHubFiscal)  
> **Organização**: Holding Companhia de Impacto  
> **Candidato / Desenvolvedor**: Moisés Branco dos Santos  
> **Objetivo deste Documento**: Servir como **memória de longo prazo** e registro cronológico imutável de todas as decisões arquiteturais (ADR), mudanças de escopo, alterações em código e pontos de ancoragem para agentes de IA e desenvolvedores, prevenindo regressões, perda de contexto e decisões que divirjam das fontes oficiais.

---

## 🌳 Árvore de Referências & Fontes da Verdade (Index & Single Sources of Truth)

Toda IA ou desenvolvedor atuando neste workspace **DEVE** consultar estes arquivos antes de propor alterações:

| Domínio de Conhecimento | Arquivo Fonte de Verdade | Descrição e Abrangência |
|---|---|---|
| 🎨 **Design System & UI** | [`docs/designIHF.md`](docs/designIHF.md) | **Única fonte da verdade** para cores, fontes (Poppins + GT Walsheim), botões, micro-interações, sombras, z-index, tokens `:root` e regras WCAG. Extraído diretamente do CSS de [floripa.impacthub.net](https://floripa.impacthub.net/). |
| 📋 **Requisitos & Dados v2** | [`docs/iHubFiscal.md`](docs/iHubFiscal.md) | **Única fonte da verdade** para as 10 telas/rotas, enums de status (`TRIAGEM` a `PAGO`), taxonomia de centros de custo, entidades, regras de alçada e schema Postgres. |
| 📜 **Histórico & ADR** | [`docs/changelog.md`](docs/changelog.md) | **Este documento**. Registro obrigatório de decisões, pivôs de rota, commits e justificativas de arquitetura. |
| 🤖 **Diretrizes do Agente** | [`AGENTS.md`](../AGENTS.md) / [`GEMINI.md`](../GEMINI.md) | Regras operacionais, idioma (pt-BR), convenções de shell e protocolos de skills. |
| 📦 **Fase 1: Landing Page** | [`portal/index.html`](../portal/index.html) | Landing Page Executiva em Tailwind entregando os 4 entregáveis da vaga em link único oficial. |
| ⚡ **Fase 1: Workflow n8n** | [`workflows/fluxo-n8n-trecho1-extracao-nf.json`](../workflows/fluxo-n8n-trecho1-extracao-nf.json) | Workflow autocontido do Trecho 1 (ingestão de NFS-e, LLM Vision multimodal, strict null). |
| 📄 **Fase 1: Entregáveis** | `docs/entregavel-1-*`, `3-*`, `4-*` | Documentos executivos (Desenho da Solução, Manual Operacional e Roteiro de Vídeo Demo). |
| 🧩 **Reaproveitamento** | [`docs/analise-reaproveitamento-apps.md`](docs/analise-reaproveitamento-apps.md) | Diagnóstico e reaproveitamento dos apps anteriores (*Bananecos-Auth* + *BM Scan*). |

---

## 🧭 As Duas Grandes Fases do Projeto

```mermaid
timeline
    title Evolução Arquitetural do Projeto
    section Fase 1: Desafio Técnico
        PRD & Reaproveitamento de Código : Análise Bananecos-Auth + BM Scan
        NFS-e Fictícias & n8n Trecho 1 : Gerador Python + Workflow JSON
        Entregáveis 1, 3 e 4 (MD e PDF) : Desenho, Manual e Roteiro Demo
        Landing Page Executiva (Link Único) : portal/index.html com Tailwind
    section Fase 2: iHubFiscal v2
        Extração do Design Impact Hub : floripa.impacthub.net -> designIHF.md
        Auditoria Técnica Rigorosa : Código-fonte WP Rocket x Análise Externa
        Especificação de Produto v2 : docs/iHubFiscal.md (10 telas, dados relacionais)
        Governança no AGENTS.md : designIHF.md como Fonte Absoluta
        Central Operacional iHubFiscal v2 : Implementação SPA em portal/ihub/
```

---

## 📅 Registro Cronológico de Decisões e Atualizações

### [2026-09-15] — Instalação das Skills Oficiais Supabase Postgres e Vercel React Best Practices
- **Contexto**: Incorporação das diretrizes oficiais de alto nível para banco de dados relacional PostgreSQL (Supabase) e engenharia de componentes e performance React (Vercel) via CLI `skills add`.
- **Decisões Tomadas**:
  1. Instalação de [`.agents/skills/supabase-postgres-best-practices`](../.agents/skills/supabase-postgres-best-practices/SKILL.md): Padrões de modelagem relacional, indexação, RLS (Row Level Security), funções PL/pgSQL, tipos inteiros e integridade referencial para o schema do iHubFiscal.
  2. Instalação de [`.agents/skills/vercel-react-best-practices`](../.agents/skills/vercel-react-best-practices/SKILL.md): Padrões de renderização, performance de UI, tratamento de eventos e arquitetura de componentes.
  3. Registro no `skills-lock.json` e atualização da lista de skills em [`AGENTS.md`](../AGENTS.md) e [`GEMINI.md`](../GEMINI.md).

### [2026-09-15] — Instalação e Adaptação das Skills invoice-organizer e legal-advisor
- **Contexto**: Integração de recursos especializados de automação contábil e governança de dados ao ecossistema do iHubFiscal, provenientes do `skills.sh`.
- **Decisões Tomadas**:
  1. Criação da skill [`.agents/skills/invoice-organizer`](../.agents/skills/invoice-organizer/SKILL.md): Adaptada para o ecossistema fiscal brasileiro de NFS-e (CNPJs, retenções, centros de custo), definindo nomenclatura padronizada, manifesto de conciliação CSV e travas de pareamento 100% obrigatório para o pacote `.ZIP` de fechamento contábil.
  2. Criação da skill [`.agents/skills/legal-advisor`](../.agents/skills/legal-advisor/SKILL.md): Adaptada para conformidade com a LGPD (Lei nº 13.709/2018), com termos de consentimento para upload público sem login em `/upload`, mascaramento de chaves Pix/CPF de MEI e autônomos e retenção legal tributária de 5 anos.
  3. Atualização das diretrizes em [`AGENTS.md`](../AGENTS.md) e [`GEMINI.md`](../GEMINI.md) incorporando as duas novas skills.

### [2026-09-15] — Consolidação da Governança Visual e Diário de Decisões
- **Contexto**: A banca e o produto exigem fidelidade inquestionável à marca do Impact Hub Floripa e clareza documental absoluta entre as duas fases do projeto.
- **Decisões Tomadas**:
  1. Criação do [`docs/changelog.md`](docs/changelog.md) como ponto central de memória e árvore de referências.
  2. Registro obrigatório no [`AGENTS.md`](../AGENTS.md) determinando que todo commit, push ou atualização de rota deve ser documentado no changelog.
  3. Formalização no [`AGENTS.md`](../AGENTS.md) de que [`docs/designIHF.md`](docs/designIHF.md) é a **Fonte Absoluta da Verdade** visual.
  4. Isolamento claro: a Landing Page da Fase 1 (`portal/index.html`) permanece como o showroom dos entregáveis do desafio; o **iHubFiscal v2** será desenvolvido como uma aplicação web completa em `portal/ihub/` com design system 100% aderente ao tema real.

### [2026-09-15] — Enriquecimento do Design System com Tokens de Aplicação e Auditoria Comparativa
- **Commits**: `6419fdd`, `856374d`
- **Contexto**: Confronto entre uma análise enviada por outra IA e o código-fonte CSS real do tema `labbotheme`.
- **Decisões Tomadas**:
  - **Acolhido**: Adicionados tokens semânticos de status financeiro (`--ihf-status-error: #DC2626`, `--ihf-status-warning: #D97706`, `--ihf-status-success: #16A34A`, `--ihf-status-info: #1C395C`), mapeamento visual das 5 colunas do Kanban, escala de Z-Index (`1000` a `1090`), tokens de Dropzone para `/upload`, semáforo cromático de confiança de IA (verde $\ge 90\%$ e amarelo pulsante $< 90\%$), estilos de tabelas financeiras (datagrid) e modais com backdrop blur.
  - **Desmistificado com Código**: A outra IA supôs que o Hero Card era sólido bordô `#7A221E` (o código real prova que é frosted glass branco `rgba(255,255,255,0.1)` com `blur(12px)`); supôs que a watermark usava `text-stroke` (o código real prova corte por sobreposição de `<span>` branco de 50%); e alegou ausência de azul (o `:root` possui 6 variáveis de azul).

### [2026-09-15] — Especificação Funcional do iHubFiscal v2
- **Commit**: `e75808d`
- **Arquivo**: [`docs/iHubFiscal.md`](docs/iHubFiscal.md)
- **Contexto**: Transição para o desenvolvimento da versão 2 completa do sistema.
- **Decisões Tomadas**:
  - Mapeamento das 10 rotas operacionais (`/`, `/upload`, `/kanban`, `/conferencia/:id`, `/aprovacoes`, `/pagamentos`, `/notas/:id`, `/dashboard`, `/fechamento`, `/configuracoes`).
  - Definição do ciclo de vida estrito de 5 fases em `invoices`: `TRIAGEM`, `AGUARDANDO_APROVACAO`, `RECUSADO`, `AGENDADO_PAGAMENTO` e `PAGO`.
  - Taxonomia de 6 centros de custo (`tecnologia_inovacao`, `facilities_coworking`, `marketing_comunicacao`, `eventos_producao`, `projetos_aceleracao`, `administrativo_legal`).
  - Modelagem do banco relacional Postgres (tabelas `companies`, `cost_centers`, `users`, `suppliers`, `approval_levels`, `invoices`, `invoice_events`).

### [2026-09-15] — Engenharia Reversa e Extração do Design System do Impact Hub Floripa
- **Commits**: `6bc1f0a`, `49c76e0`, `0bee895`
- **Arquivo**: [`docs/designIHF.md`](docs/designIHF.md)
- **Contexto**: O usuário demandou extrair todos os tokens reais de [floripa.impacthub.net](https://floripa.impacthub.net/).
- **Decisões Tomadas**:
  - Identificação precisa da stack: Tema WordPress **Labbo Digital** (`labbotheme`), Bootstrap 5 e WP Rocket.
  - Correção da tipografia: Substituição de suposições genéricas ("Montserrat") pela combinação real: **Poppins** (títulos, UI e botões) + **GT Walsheim** (corpo, parágrafos, labels e footer).
  - Cor primária oficial: `--vermelho: #812926` (e não `#7A221E`).
  - Mapeamento das animações reais de botões: `.btn-learn-more` (seta translada 10px à direita em hover), `.default-btn.btn-vermelho` (inversão para texto e borda azul `#1c395c` sobre fundo branco), `.btn-download` (animação vertical infinita `downloadAnimation`).

---

### [2026-09-14] — Fase 1: Entrega dos 4 Entregáveis do Desafio Técnico
- **Commits**: `e825236` a `7c3336c`
- **Objetivo**: Cumprir 100% dos requisitos formais da vaga de Analista Pleno de IA e Produtos Digitais.
- **Entregáveis Construídos**:
  1. **PRD Completo**: [`docs/prd-automacao-contas-a-pagar.md`](docs/prd-automacao-contas-a-pagar.md)
  2. **Análise de Reaproveitamento (Gap Analysis)**: [`docs/analise-reaproveitamento-apps.md`](docs/analise-reaproveitamento-apps.md) integrando *Bananecos-Auth* e *BM Scan*.
  3. **Amostras de Teste**: Gerador Python (`scripts/generate_test_nfs.py`) e 3 PDFs fictícios de NFS-e das verticais da holding (Floripa, Salto, Seu PêJota).
  4. **Entregável 2 (Workflow n8n)**: [`workflows/fluxo-n8n-trecho1-extracao-nf.json`](../workflows/fluxo-n8n-trecho1-extracao-nf.json) (webhook multipart, extração multimodal com prompt *strict null*, cálculo SHA-256 e blindagem contra duplicidades).
  5. **Entregável 1 (Desenho da Solução)**: Documento executivo em 2 páginas A4 com diagramas Mermaid, exportado em Markdown e PDF compilado.
  6. **Entregável 3 (Manual Operacional do Financeiro)**: Matriz de 8 falhas e planos de ação para a equipe financeira (MD e PDF).
  7. **Entregável 4 (Roteiro do Vídeo Demo)**: Script segundo a segundo para gravação de demonstração em 3 minutos.
  8. **Landing Page Executiva de Link Único**: [`portal/index.html`](../portal/index.html) unificando todos os entregáveis, simulador interativo, botões de download de PDFs e manual operacional.

---

## 📌 Guia de Manutenção deste Documento
Ao realizar qualquer alteração significativa no projeto:
1. **Adicione um novo bloco** em ordem cronológica reversa (mais recente no topo da seção correspondente).
2. **Indique**: Data, contexto, arquivos afetados, commits e a justificativa da decisão.
3. **Verifique** se a decisão respeita a Árvore de Referências definida no topo deste arquivo.
