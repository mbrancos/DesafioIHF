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
| 🤖 **Diretrizes do Agente** | [`AGENTS.md`](../AGENTS.md) | Regras operacionais, idioma (pt-BR), convenções de shell e protocolos de skills. |
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

### [2026-09-15] — Tarefa 9 Concluída: Telas Operacionais Internas (/conferencia/:id, /aprovacoes, /pagamentos, /notas/:id)
- **Commit**: `feat(ops): implementa telas de conferencia tecnica, aprovacoes com alcada, pagamentos e auditoria`
- **Contexto**: Entrega do pacote central de telas operacionais com governança orçamentária rígida, conferência human-in-the-loop, fila de quitação com Pix em 1 clique e linha do tempo de auditoria imutável (event sourcing).
- **Arquivos**: `src/app/conferencia/[id]/page.tsx`, `src/components/conference/ConferenceForm.tsx`, `src/app/aprovacoes/page.tsx`, `src/components/approvals/ApprovalCard.tsx`, `src/app/pagamentos/page.tsx`, `src/components/payments/PaymentCard.tsx`, `src/app/notas/[id]/page.tsx`, `src/lib/approvals.ts`, `src/actions/approvals.ts`, `src/actions/invoices.ts`, `tests/unit/operational-screens.test.ts`.
- **Decisões e Resultados**:
  1. Criação do módulo `src/lib/approvals.ts` com regras estritas de alçada: Gestor aprova até R$ 10.000,00; acima de R$ 10.000,00 bloqueia exigindo alçada extraordinária do CFO; analistas restritos à conferência técnica.
  2. Implementação da tela `/aprovacoes` com validação visual de alçada por persona e ações de deliberação imediata ou recusa formal.
  3. Implementação da tela `/conferencia/:id` em Split-View (`DynamicPdfViewer` + `ConferenceForm`), com conferência matemática de impostos e retenções em tempo real (`validateTaxMath`).
  4. Implementação da tela `/pagamentos` com totalizador do passivo da fila, cópia de Pix em 1 clique com feedback visual e liquidação vinculada ao anexo de comprovante bancário (`PaymentProofModal`).
  5. Implementação da tela `/notas/:id` exibindo o carimbo criptográfico SHA-256 de imutabilidade, quadro financeiro detalhado e linha do tempo imutável de eventos (`invoice_events`) com autores e justificativas.
  6. Server Actions `approveInvoiceAction`, `getInvoicesForApproval` e `getInvoiceById`.
  7. 100% de sucesso nos testes unitários e tipagem estrita do TypeScript aprovada (`38 tests passed`).

### [2026-09-15] — Tarefa 8 Concluída: Quadro Kanban com @dnd-kit, Estado Otimista e Interceptações de Governança
- **Commit**: `feat(kanban): quadro operacional dnd-kit com atualizacao otimista e modais de governanca`
- **Contexto**: Implementação da tela `/kanban` com visão horizontal das 5 colunas operacionais estritas (`TRIAGEM`, `AGUARDANDO_APROVACAO`, `RECUSADO`, `AGENDADO_PAGAMENTO`, `PAGO`), drag-and-drop otimista e barreiras de segurança com modais obrigatórios.
- **Arquivos**: `src/app/kanban/page.tsx`, `src/components/kanban/KanbanBoard.tsx`, `src/components/kanban/KanbanColumn.tsx`, `src/components/kanban/InvoiceCard.tsx`, `src/components/kanban/RejectModal.tsx`, `src/components/kanban/PaymentProofModal.tsx`, `src/components/kanban/kanban-utils.ts`, `src/components/common/Navbar.tsx`, `src/actions/invoices.ts`, `tests/unit/kanban-dnd.test.ts`.
- **Decisões e Resultados**:
  1. Criação do utilitário `kanban-utils.ts` com as 5 colunas, totalizadores financeiros automáticos e lógica de decisão `shouldInterceptTransition`.
  2. Implementação do `KanbanBoard` com `@dnd-kit/core` utilizando `PointerSensor` com tolerância de distância para permitir cliques normais em botões de cards.
  3. Blindagem de governança: arrastar para `RECUSADO` intercepta e exige justificativa formal via `RejectModal`; arrastar para `PAGO` intercepta e exige anexo de comprovante bancário via `PaymentProofModal`.
  4. Atualização de estado otimista para transições diretas com reversão automática caso a persistência via Server Action falhe.
  5. Criação do componente `Navbar.tsx` para trânsito fluido entre as rotas operacionais do sistema, com exibição da persona ativa e botão de encerramento de sessão.
  6. Server Action `getInvoicesForKanban` com filtros por vertical da holding e busca textual, além de `uploadPaymentProofAndMarkPaid`.
  7. 100% de sucesso nos testes unitários e tipagem estrita do TypeScript aprovada (`34 tests passed`).

### [2026-09-15] — Tarefa 7 Concluída: Portal do Fornecedor com Split-View e Emissão de Protocolo
- **Commit**: `d2f06c7`
- **Contexto**: Implementação da rota pública `/upload` com Wizard em 2 etapas para autoatendimento do prestador PJ sem login, conferência assistida em tela dividida e emissão de protocolo.
- **Arquivos**: `src/app/upload/page.tsx`, `src/components/supplier/WizardStep1Upload.tsx`, `src/components/supplier/WizardStep2SplitView.tsx`, `src/components/pdf/DynamicPdfViewer.tsx`, `src/components/pdf/PdfViewer.tsx`, `src/actions/invoices.ts`, `tests/unit/supplier-wizard.test.ts`.
- **Decisões e Resultados**:
  1. Criação do `DynamicPdfViewer` encapsulado com `next/dynamic` e `{ ssr: false }`, blindando a renderização de PDFs contra falhas de SSR na Vercel.
  2. Implementação da Etapa 1 com dropzone de PDF e trava de 4 MB integrada diretamente à rota `/api/extract`.
  3. Implementação da Etapa 2 em Split-View: documento original renderizado à esquerda e formulário editável pré-preenchido pela IA à direita.
  4. Validador matemático visual em tempo real conferindo se `Líquido = Bruto - Retenções` com tolerância de até R$ 0,02.
  5. Implementação da Server Action `createInvoice` com geração de protocolo padronizado `IHF-2026-XXXX`, persistência em `invoices` (`TRIAGEM`) e registro imutável em `invoice_events`.
  6. Validação com 100% de aprovação na suíte de testes (`npm test` com 29 testes passando).

### [2026-09-15] — Tarefa 6 Concluída: Tela de Login e Atalhos de Persona para a Banca
- **Commit**: `b2233ba`
- **Contexto**: Implementação da rota `/` com autenticação institucional iHubFiscal, formulário corporativo e painel de atalhos rápidos de 1 clique para a banca avaliadora testar as alçadas.
- **Arquivos**: `src/app/page.tsx`, `src/actions/auth.ts`, `src/components/auth/LoginForm.tsx`, `src/components/auth/PersonaSwitcher.tsx`, `tests/unit/auth-flow.test.ts`.
- **Decisões e Resultados**:
  1. Criação do `PersonaSwitcher` com os 4 perfis (`analista`, `gestor`, `cfo`, `admin`) vinculados aos dados pré-cadastrados no `seed.sql`.
  2. Implementação das Server Actions `loginWithPersona`, `loginWithCredentials` e `logout` com gerenciamento de sessão seguro em cookies HTTP-only.
  3. Adição do banner de autoatendimento para fornecedores no rodapé direcionando para a rota pública `/upload`.
  4. Validação com 100% de aprovação na suíte de testes (`npm test` com 25 testes passando).

### [2026-09-15] — Tarefa 5 Concluída: Rota de Ingestão de IA com Gemini 2.5 Flash e Trava de 4 MB
- **Commit**: `289c0d4`
- **Contexto**: Implementação da rota serverless Node.js `/api/extract` para ingestão de NFS-e, cálculo de integridade SHA-256 e extração multimodal estruturada com o modelo Gemini 2.5 Flash via `@google/genai`.
- **Arquivos**: `src/app/api/extract/route.ts`, `src/lib/gemini.ts`, `tests/unit/api-extract.test.ts`.
- **Decisões e Resultados**:
  1. Configuração explícita de `export const runtime = 'nodejs';`, `export const maxDuration = 30;` e `export const dynamic = 'force-dynamic';` para estabilidade no ambiente Vercel.
  2. Implementação da trava estrita de upload: rejeição com status 400 para formatos não-PDF e status 413 para arquivos superiores a 4 MB.
  3. Cálculo automático do hash SHA-256 do binário para garantia de idempotência e auditoria.
  4. Definição do `INVOICE_EXTRACTION_SCHEMA` estruturado (JSON Schema com OpenAPI 3.0) garantindo extração tipada de valores em centavos, retenções, datas e chave Pix.
  5. Validação com 100% de aprovação na suíte de testes (`npm test` com 22 testes passando).

### [2026-09-15] — Tarefa 4 Concluída: Utilitários Centrais, Supabase SSR e Validador Matemático
- **Commit**: `2b42b79`
- **Contexto**: Implementação da biblioteca central de matemática fiscal, cálculo de hash SHA-256 universal, formatadores monetários brasileiros e clientes `@supabase/ssr` para Server Actions e middleware.
- **Arquivos**: `src/lib/math.ts`, `src/lib/crypto.ts`, `src/lib/formatters.ts`, `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/middleware.ts`, `tests/unit/math-crypto.test.ts`, `.gitignore`.
- **Decisões e Resultados**:
  1. Implementação de `validateTaxMath` com tolerância fiscal estrita de até R$ 0,02 (2 centavos) para cálculo de retenções (`Líquido = Bruto - Deduções`).
  2. Implementação de `calculateSha256` universal suportando Web Crypto API nativa com fallback para `node:crypto`.
  3. Formatadores `formatBRL`, `formatCNPJ` e `parseCentavos` para manipulação segura de moedas em centavos inteiros.
  4. Configuração dos clientes `@supabase/ssr` para Client Components, Server Components e Next.js Middleware.
  5. Ajuste no `.gitignore` (`/lib/`) para não mascarar a pasta `src/lib/`.
  6. Validação com 100% de sucesso nos testes unitários (`npm test` com 18 testes passando).

### [2026-09-15] — Tarefa 3 Concluída: Design System, Tokens CSS e Root Layout com next/font
- **Commit**: `b8e52f6`
- **Contexto**: Implementação dos tokens oficiais do Impact Hub Floripa (`docs/designIHF.md`), injeção de fontes nativas sem CLS e componentes atômicos essenciais (`Button`, `Badge`, `Modal`).
- **Arquivos**: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/common/Button.tsx`, `src/components/common/Badge.tsx`, `src/components/common/Modal.tsx`, `tests/unit/design-system.test.ts`.
- **Decisões e Resultados**:
  1. Configuração do `globals.css` e variáveis `:root` preservando o Bordô institucional (`#812926`) e isolando o Verde semântico de sucesso/confiança (`#16A34A`).
  2. Implementação de `src/app/layout.tsx` carregando **Poppins** via `next/font/google` com preloading nativo.
  3. Criação de componentes base altamente tipados: `Button` com micro-interações do tema oficial, `Badge` com mapeamento fiscal e `Modal` acessível com backdrop blur.
  4. Validação completa via Vitest (`tests/unit/design-system.test.ts`).

### [2026-09-15] — Tarefa 2 Concluída: Migrações PostgreSQL, RLS, Storage com CORS e Seed Inicial
- **Commit**: `aff611a`
- **Contexto**: Modelagem das 7 tabelas relacionais do iHubFiscal v2, regras estritas de enums e alçadas, políticas de segurança RLS, buckets de storage e script de seed para a banca.
- **Arquivos**: `supabase/migrations/20260915000000_initial_schema.sql`, `supabase/seed.sql`, `tests/unit/schema-validation.test.ts`.
- **Decisões e Resultados**:
  1. Criação das tabelas relacionais `companies`, `cost_centers`, `users`, `suppliers`, `approval_levels`, `invoices` e `invoice_events` com constraints de integridade e índices otimizados.
  2. Implementação das 5 fases estritas (`TRIAGEM`, `AGUARDANDO_APROVACAO`, `RECUSADO`, `AGENDADO_PAGAMENTO`, `PAGO`) e taxonomia dos 6 centros de custo.
  3. Configuração dos buckets `invoices` e `payment-proofs` no Supabase Storage com políticas de acesso e suporte a download direto (CORS liberado para `GET`/`HEAD`).
  4. Criação do `supabase/seed.sql` com as 4 empresas da holding, os 6 centros de custo, os 4 usuários de teste com roles (`analista`, `gestor`, `cfo`, `admin`) e regras de alçada de até R$ 10.000,00 para gestores e ilimitado para CFO.
  5. Validação com testes unitários via Vitest com 100% de cobertura das tabelas e seeds.

### [2026-09-15] — Tarefa 1 Concluída: Scaffolding Next.js 15, TypeScript, Tailwind CSS e Vitest
- **Commit**: `4412ba6`
- **Contexto**: Inicialização da fundação da versão 2 do iHubFiscal na raiz do repositório, configuração do ecossistema moderno e preservação dos ativos da Fase 1.
- **Arquivos**: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`, `vitest.config.ts`, `public/portal/index.html`, `tests/unit/setup.test.ts`.
- **Decisões e Resultados**:
  1. Criação da branch de desenvolvimento `feat/ihubfiscal-v2`.
  2. Instalação bem-sucedida das dependências oficiais (`@supabase/ssr`, `@supabase/supabase-js`, `@google/genai@^2.22.0`, `@dnd-kit/core`, `@dnd-kit/sortable`, `jszip`, `lucide-react`, `vitest`, `happy-dom`).
  3. Configuração do Tailwind CSS com todos os tokens semânticos extraídos de `docs/designIHF.md`.
  4. Replicação da Landing Page e documentos da Fase 1 para `public/portal/`, garantindo disponibilidade em rota estática `/portal`.
  5. Validação da suíte de testes com Vitest (`npm test` executado com 100% de sucesso).

### [2026-09-15] — Especificação da Arquitetura Técnica do iHubFiscal v2
- **Contexto**: Definição da fundação técnica, stack 100% serverless e resolução de armadilhas técnicas da Vercel para a versão 2 do iHubFiscal.
- **Arquivo**: [`docs/superpowers/specs/2026-09-15-ihubfiscal-v2-architecture-design.md`](superpowers/specs/2026-09-15-ihubfiscal-v2-architecture-design.md)
- **Decisões Tomadas**:
  1. **Stack Central**: Next.js 15 na raiz com TypeScript, Tailwind CSS e App Router em `src/app`, Supabase (PostgreSQL, Auth e Storage via `@supabase/ssr`), e Google Gemini 2.5 Flash via SDK oficial `@google/genai`.
  2. **Preservação da Fase 1**: A Landing Page executiva do desafio técnico (`portal/index.html`) é movida para `public/portal/index.html`, permanecendo acessível estaticamente via rota `/portal`.
  3. **Bypass da Armadilha de 4.5 MB da Vercel**: Remoção de qualquer rota de `.zip` no backend. A compilação do pacote contábil mensal com PDFs e manifesto CSV é executada 100% no cliente via `jszip` a partir de URLs assinadas, com custo zero de servidor e sem risco de erro `502 / FUNCTION_PAYLOAD_TOO_LARGE`.
  4. **Kanban Otimista com Interceptação por Modal (`@dnd-kit`)**: No `onDragEnd`, movimentações regulares atualizam a UI de forma otimista; destinos que exigem dados obrigatórios (`RECUSADO` com justificativa e `PAGO` com comprovante) abrem seus respectivos modais antes de autorizar a transição.
  5. **Ingestão e IA Segura**: Rota `/api/extract` com `export const maxDuration = 30;`, trava de arquivo de até 4 MB, cálculo SHA-256 e Structured Outputs com JSON Schema tipado.
  6. **Design System & Tipografia**: Isolamento semântico estrito (Bordô `#812926` para marca, Verde `#16A34A` para sucesso/confiança) e importação otimizada de fontes via `next/font` (Poppins e GT Walsheim), eliminando CLS.
  7. **CORS Obrigatório no Supabase Storage**: Políticas de CORS aplicadas nos buckets `invoices` e `payment-proofs` para permitir métodos `GET` e `HEAD` no download paralelo do JSZip via navegador.
  8. **Runtime Node.js Explícito**: Declaração obrigatória de `export const runtime = 'nodejs';` em `src/app/api/extract/route.ts` para garantir execução em Serverless Node.js com suporte pleno a crypto, buffers e `maxDuration = 30`.
  9. **Migrações e Seed Mandatório**: Criação de `supabase/migrations/` e `supabase/seed.sql` contendo o pré-cadastro das 4 empresas da holding, os 6 centros de custo e os 4 usuários de teste vinculados ao Supabase Auth e à tabela `users` para alimentar os atalhos de persona do login.

### [2026-09-15] — Integração e Ativação do MCP Server do Supabase na IDE
- **Contexto**: Habilitação da integração nativa da IDE com o projeto Supabase (`DesafioIHF`) via protocolo MCP (Model Context Protocol) para gerenciamento de banco de dados, DDL, inspeção de tabelas e automações diretas.
- **Decisões Tomadas**:
  1. Identificação do pacote oficial do MCP no NPM (`@supabase/mcp-server-supabase@latest`), corrigindo a divergência do guia original (`@supabase/mcp-server` não existia no NPM).
  2. Configuração do servidor `supabase` no arquivo de configuração global de MCPs da IDE (`~/.gemini/config/mcp_config.json`), injetando `--access-token` e `--project-ref dksxeqonxvqybjbynjqh`, e definindo `"disabled": false`.
  3. Teste de inicialização executado com sucesso (processo stdio estável).

### [2026-09-15] — Governança de Segredos: Criação do .gitignore, .env.example e Armazenamento no .env.local
- **Contexto**: Necessidade de armazenar com segurança as credenciais e conexões do projeto Supabase (`DesafioIHF`), blindando o repositório contra vazamento de chaves e senhas no GitHub.
- **Decisões Tomadas**:
  1. Escolha do arquivo `.env.local` para guardar as credenciais confidenciais (por convenção de indústria e frameworks modernos, `.env.local` é reservado exclusivamente para segredos da máquina local).
  2. Criação do arquivo [`.gitignore`](../.gitignore) bloqueando preventivamente `.env`, `.env.local`, `.env.*.local`, dependências, arquivos de sistema e temporários.
  3. Criação do arquivo [`.env.example`](../.env.example) como modelo sem segredos para versionamento e replicação de ambiente.

### [2026-09-15] — Configuração do Repositório Remoto e Sincronização com o GitHub
- **Contexto**: Integração do repositório local com o repositório remoto oficial no GitHub (`https://github.com/mbrancos/DesafioIHF.git`) para versionamento contínuo, backup em nuvem e compartilhamento seguro do código e documentação.
- **Decisões Tomadas**:
  1. Configuração do remoto `origin` apontando para `https://github.com/mbrancos/DesafioIHF.git`.
  2. Sincronização inicial completa do histórico de commits da branch `master` para o repositório remoto.

### [2026-09-15] — Eliminação de Redundância: Remoção do GEMINI.md em Favor do AGENTS.md
- **Contexto**: O Antigravity IDE carrega automaticamente arquivos de regras na raiz do workspace (`AGENTS.md` e `GEMINI.md`). Como ambos continham exatamente o mesmo conteúdo, o sistema consumia tokens desnecessariamente e gerava overhead de manutenção em dobro.
- **Decisões Tomadas**:
  1. Remoção do arquivo `GEMINI.md`, consolidando o [`AGENTS.md`](../AGENTS.md) como o único arquivo de diretrizes operacionais do projeto.
  2. Atualização do índice de fontes da verdade em `docs/changelog.md`.

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
