# Plano de Implementação — iHubFiscal v2

> **Para executores agenticos:** No Google Antigravity IDE, utilize o skill `executing-plans` para implementar este plano tarefa por tarefa com rigor de TDD e checkpoints. Cada passo utiliza a sintaxe de checkbox (`- [ ]`) para rastreamento contínuo.

**Objetivo:** Construir a versão 2 completa do **iHubFiscal** — Central Inteligente de Contas a Pagar e Governança com IA da holding Companhia de Impacto — integrando Next.js 15 na raiz (App Router), Supabase (PostgreSQL, Auth e Storage via `@supabase/ssr`), Google Gemini 2.5 Flash (`@google/genai`), Kanban otimista com `@dnd-kit` e fechamento contábil via `jszip` no cliente.

**Arquitetura:** Aplicação 100% *serverless* hospedada na Vercel com App Router em `src/app`. Rotas públicas (`/upload`) e autenticadas por perfis (`analista`, `gestor`, `cfo`, `admin`). Processamento de IA via Route Handler Node.js serverless (`/api/extract`) com Gemini 2.5 Flash Structured Outputs e limite de 4 MB. Fechamento contábil compilado no cliente com `jszip` (eliminando a restrição de 4.5 MB da Vercel). Coexistência da Landing Page da Fase 1 preservada em `public/portal/index.html`.

**Stack Tecnológica:** Next.js 15, React 19, TypeScript, Tailwind CSS, `@supabase/ssr`, `@supabase/supabase-js`, `@google/genai` (Gemini 2.5 Flash), `@dnd-kit/core`, `@dnd-kit/sortable`, `jszip`, `lucide-react`, `vitest`, `happy-dom`.

**Especificação Oficial:** [`docs/superpowers/specs/2026-09-15-ihubfiscal-v2-architecture-design.md`](../superpowers/specs/2026-09-15-ihubfiscal-v2-architecture-design.md)  
**Fontes da Verdade:** [`docs/designIHF.md`](../designIHF.md) (Design System), [`docs/iHubFiscal.md`](../iHubFiscal.md) (Requisitos & Dados), [`docs/changelog.md`](../changelog.md) (ADRs).

## Restrições Globais Obrigatórias
- **Design System Estrito**: Nenhuma cor arbitrária. Apenas tokens de `docs/designIHF.md`. Bordô (`#812926`) reservado para marca; Verde (`#16A34A` / `#063b27`) reservado para sucesso/confiança.
- **Tipografia**: Poppins (`next/font/google`) e GT Walsheim (`next/font/local`) injetadas no `src/app/layout.tsx`.
- **Rota de IA**: `export const runtime = 'nodejs';`, `export const maxDuration = 30;`, `export const dynamic = 'force-dynamic';` e validação estrita de tamanho $\le 4\text{ MB}$.
- **Renderizador de PDF**: Split-view (`/upload` e `/conferencia/:id`) com renderizador carregado via `next/dynamic` com `{ ssr: false }`.
- **Kanban `@dnd-kit`**: Movimentação otimista para fases regulares; interceptação imediata com modal para `RECUSADO` (justificativa obrigatória) e `PAGO` (comprovante bancário obrigatório).
- **Fechamento Contábil**: Compilação do `.zip` **100% no cliente via `jszip`** para evitar o limite de 4.5 MB da Vercel. Buckets de Storage com CORS liberado.
- **Governança de Commits**: Todas as mensagens de commit em português do Brasil (pt-BR).

---

## Estrutura de Arquivos Planejada

```
d:/Etna/Projetos/DesafioIHF/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── vitest.config.ts
├── supabase/
│   ├── migrations/20260915000000_initial_schema.sql
│   └── seed.sql
├── public/
│   ├── portal/index.html (Fase 1 preservada)
│   └── fonts/ (GT Walsheim local)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Login + Seletor de Personas)
│   │   ├── upload/page.tsx (Portal do Fornecedor)
│   │   ├── kanban/page.tsx (Kanban 5 fases)
│   │   ├── conferencia/[id]/page.tsx
│   │   ├── aprovacoes/page.tsx
│   │   ├── pagamentos/page.tsx
│   │   ├── notas/[id]/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── fechamento/page.tsx
│   │   ├── configuracoes/page.tsx
│   │   └── api/extract/route.ts
│   ├── actions/
│   │   ├── invoices.ts
│   │   ├── approvals.ts
│   │   └── auth.ts
│   ├── components/
│   │   ├── common/ (Button, Badge, Modal, Input, Layout)
│   │   ├── pdf/ (DynamicPdfViewer)
│   │   ├── kanban/ (KanbanBoard, Column, Card, Modals)
│   │   ├── supplier/ (WizardStep1, WizardStep2)
│   │   └── closing/ (ZipGeneratorButton)
│   ├── lib/
│   │   ├── supabase/ (client.ts, server.ts, middleware.ts)
│   │   ├── gemini.ts
│   │   ├── crypto.ts
│   │   ├── math.ts
│   │   └── formatters.ts
│   └── types/ (database.ts, invoice.ts)
```

---

## Tarefas de Implementação

### Tarefa 1: Scaffolding do Next.js 15, TypeScript, Tailwind CSS e Setup de Testes

**Arquivos:**
- Criar: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `vitest.config.ts`, `src/types/env.d.ts`
- Modificar: `public/portal/index.html` (mover da raiz para `public/portal/`)
- Teste: `tests/unit/setup.test.ts`

**Interfaces:**
- Produz: Ambiente de desenvolvimento funcional, script `npm run dev`, `npm run build` e `npm test` configurados.

- [ ] **Passo 1: Escrever teste de integridade do ambiente**
  Criar `tests/unit/setup.test.ts` verificando carregamento de variáveis de ambiente e resolução de caminhos `@/*`.
- [ ] **Passo 2: Rodar o teste para verificar que falha**
  Executar `npx vitest run tests/unit/setup.test.ts` e confirmar falha por ausência de configuração.
- [ ] **Passo 3: Criar arquivos de configuração do Next.js 15 e instalar dependências**
  Configurar `package.json` com `@supabase/ssr`, `@supabase/supabase-js`, `@google/genai`, `@dnd-kit/core`, `@dnd-kit/sortable`, `jszip`, `lucide-react`, `vitest`, `happy-dom`.
- [ ] **Passo 4: Mover Landing Page da Fase 1 para `public/portal/`**
  Garantir que `public/portal/index.html` esteja acessível estaticamente.
- [ ] **Passo 5: Rodar testes e build para validar**
  Executar `npm test` e verificar sucesso.
- [ ] **Passo 6: Commit**
  `git commit -m "chore(infra): inicializa Next.js 15, TypeScript, Tailwind e vitest"`

---

### Tarefa 2: Migração PostgreSQL, RLS, Buckets de Storage e `supabase/seed.sql`

**Arquivos:**
- Criar: `supabase/migrations/20260915000000_initial_schema.sql`
- Criar: `supabase/seed.sql`
- Teste: `tests/unit/schema-validation.test.ts`

**Interfaces:**
- Produz: Schema DDL das 7 tabelas (`companies`, `cost_centers`, `users`, `suppliers`, `approval_levels`, `invoices`, `invoice_events`), enums estritos, regras de RLS, políticas de CORS para os buckets `invoices` e `payment-proofs`, e seed completo das 4 empresas, 6 centros de custo e 4 personas de teste.

- [ ] **Passo 1: Escrever teste de validação estática do DDL e Seed SQL**
  Criar `tests/unit/schema-validation.test.ts` conferindo a presença de todas as constraints e tabelas exigidas em `docs/iHubFiscal.md`.
- [ ] **Passo 2: Rodar o teste para verificar que falha**
  Confirmar falha por ausência dos arquivos SQL.
- [ ] **Passo 3: Escrever `20260915000000_initial_schema.sql`**
  Definir tabelas, foreign keys com `ON DELETE RESTRICT`, constraints de idempotência `UNIQUE(supplier_id, invoice_number)`, índices de performance (vencimento, status, company_id) e políticas de RLS.
- [ ] **Passo 4: Escrever `supabase/seed.sql`**
  Inserir 4 empresas da holding (Impact Hub Floripa, Salto, Impacta Mais, Seu PêJota), os 6 centros de custo, os 4 usuários de teste (`analista`, `gestor`, `cfo`, `admin`), regras de alçada financeira e regras de CORS nos buckets.
- [ ] **Passo 5: Rodar teste para verificar que passa**
  Executar `npx vitest run tests/unit/schema-validation.test.ts`.
- [ ] **Passo 6: Commit**
  `git commit -m "feat(db): adiciona migrations, schema relacional, RLS e seed inicial"`

---

### Tarefa 3: Design System, Tokens CSS e Root Layout com `next/font`

**Arquivos:**
- Criar: `src/app/layout.tsx`, `src/app/globals.css`, `tailwind.config.ts`
- Criar: `src/components/common/Button.tsx`, `src/components/common/Badge.tsx`, `src/components/common/Modal.tsx`
- Teste: `tests/unit/design-system.test.ts`

**Interfaces:**
- Produz: Componentes visuais atômicos seguindo 100% `docs/designIHF.md`. Injeção de variáveis `--poppins` e `--GT-Walsheim` sem CLS.

- [ ] **Passo 1: Escrever teste de renderização e tokens do Design System**
  Criar teste unitário verificando presença das classes `--ihf-brand-primary` (`#812926`) e isolamento com `--ihf-status-success` (`#16A34A`).
- [ ] **Passo 2: Rodar teste para verificar que falha**
- [ ] **Passo 3: Configurar `tailwind.config.ts` e `globals.css` com tokens reais**
- [ ] **Passo 4: Implementar `src/app/layout.tsx` com `next/font` e componentes `Button`, `Badge`, `Modal`**
- [ ] **Passo 5: Rodar teste para verificar aprovação**
- [ ] **Passo 6: Commit**
  `git commit -m "feat(ui): configura tokens de design system, next/font e componentes base"`

---

### Tarefa 4: Utilitários Centrais, Supabase SSR Clients e Validador Matemático

**Arquivos:**
- Criar: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/middleware.ts`
- Criar: `src/lib/crypto.ts`, `src/lib/math.ts`, `src/lib/formatters.ts`
- Teste: `tests/unit/math-crypto.test.ts`

**Interfaces:**
- Produz: `calculateSha256(buffer)`, `validateTaxMath({ amount_bruto, amount_liquido, iss, irrf, pis_cofins_csll })` com tolerância de R$ 0,02, e helpers `@supabase/ssr`.

- [ ] **Passo 1: Escrever testes unitários para cálculo de SHA-256 e validação matemática de impostos**
- [ ] **Passo 2: Rodar teste para verificar que falha**
- [ ] **Passo 3: Implementar `math.ts`, `crypto.ts`, `formatters.ts` e clientes Supabase**
- [ ] **Passo 4: Rodar testes para verificar aprovação**
- [ ] **Passo 5: Commit**
  `git commit -m "feat(core): implementa clientes supabase ssr, hashing sha256 e validador fiscal"`

---

### Tarefa 5: Route Handler de IA (`/api/extract/route.ts`) com Gemini 2.5 Flash

**Arquivos:**
- Criar: `src/app/api/extract/route.ts`, `src/lib/gemini.ts`
- Teste: `tests/unit/api-extract.test.ts`

**Interfaces:**
- Consumes: Multipart `FormData` contendo arquivo PDF.
- Produz: JSON com dados fiscais extraídos, score de confiança cromático e hash SHA-256.

- [ ] **Passo 1: Escrever testes unitários simulando requisição válida, arquivo > 4 MB e formato não-PDF**
- [ ] **Passo 2: Rodar teste para verificar que falha**
- [ ] **Passo 3: Implementar `src/lib/gemini.ts` com JSON Schema estrito do Gemini 2.5 Flash**
- [ ] **Passo 4: Implementar `src/app/api/extract/route.ts` com `runtime = 'nodejs'` e `maxDuration = 30`**
- [ ] **Passo 5: Rodar testes para validar o fluxo e as travas de 4 MB**
- [ ] **Passo 6: Commit**
  `git commit -m "feat(ai): cria rota de extração multimodal com Gemini 2.5 Flash e trava de 4MB"`

---

### Tarefa 6: Tela de Autenticação e Atalhos de Persona da Banca (`/`)

**Arquivos:**
- Criar: `src/app/page.tsx`, `src/actions/auth.ts`, `src/components/auth/LoginForm.tsx`, `src/components/auth/PersonaSwitcher.tsx`
- Teste: `tests/unit/auth-flow.test.ts`

**Interfaces:**
- Produz: Login tradicional por email/senha e atalhos rápidos de 1 clique para `analista`, `gestor`, `cfo` e `admin`. Redirecionamento inteligente para `/kanban`.

- [ ] **Passo 1: Escrever teste de renderização e troca de perfil de autenticação**
- [ ] **Passo 2: Rodar teste para verificar falha**
- [ ] **Passo 3: Implementar Server Action `loginWithPersona` e formulário corporativo em `src/app/page.tsx`**
- [ ] **Passo 4: Rodar teste e validar fluxo de login**
- [ ] **Passo 5: Commit**
  `git commit -m "feat(auth): implementa tela de login com atalhos de persona para a banca"`

---

### Tarefa 7: Portal do Fornecedor — Wizard de Envio e Split-View (`/upload`)

**Arquivos:**
- Criar: `src/app/upload/page.tsx`
- Criar: `src/components/pdf/DynamicPdfViewer.tsx`, `src/components/pdf/PdfViewer.tsx`
- Criar: `src/components/supplier/WizardStep1Upload.tsx`, `src/components/supplier/WizardStep2SplitView.tsx`
- Criar: `src/actions/invoices.ts` (`createInvoice`)
- Teste: `tests/unit/supplier-wizard.test.ts`

**Interfaces:**
- Produz: Wizard de 2 etapas público (sem login). Split-view dinâmico via `next/dynamic` com `{ ssr: false }`, conferência matemática em tempo real e emissão de protocolo `IHF-2026-XXXX`.

- [ ] **Passo 1: Escrever teste unitário do fluxo de transição entre Etapa 1 e Etapa 2**
- [ ] **Passo 2: Rodar teste para verificar falha**
- [ ] **Passo 3: Implementar `DynamicPdfViewer` isolado do SSR e componentes do Wizard**
- [ ] **Passo 4: Implementar Server Action `createInvoice` persistindo em `invoices` (`TRIAGEM`) e logando em `invoice_events`**
- [ ] **Passo 5: Rodar testes para validar o comportamento da tela dividida**
- [ ] **Passo 6: Commit**
  `git commit -m "feat(supplier): implementa portal do fornecedor com split-view e emissão de protocolo"`

---

### Tarefa 8: Quadro Kanban Operacional com `@dnd-kit` e Modais de Interceptação (`/kanban`)

**Arquivos:**
- Criar: `src/app/kanban/page.tsx`
- Criar: `src/components/kanban/KanbanBoard.tsx`, `src/components/kanban/KanbanColumn.tsx`, `src/components/kanban/InvoiceCard.tsx`
- Criar: `src/components/kanban/RejectModal.tsx`, `src/components/kanban/PaymentProofModal.tsx`
- Modificar: `src/actions/invoices.ts` (`updateInvoiceStatus`)
- Teste: `tests/unit/kanban-dnd.test.ts`

**Interfaces:**
- Produz: Quadro de 5 fases operacionais. Transições regulares otimistas; transições para `RECUSADO` ou `PAGO` interceptadas com abertura de modais obrigatórios.

- [ ] **Passo 1: Escrever testes unitários cobrindo a interceptação de destino no drag-and-drop**
- [ ] **Passo 2: Rodar teste para verificar que falha**
- [ ] **Passo 3: Implementar `KanbanBoard` com `@dnd-kit`, somatórios financeiros e cards por vertical**
- [ ] **Passo 4: Implementar `RejectModal` e `PaymentProofModal` integrados ao `onDragEnd`**
- [ ] **Passo 5: Implementar Server Action `updateInvoiceStatus` com validação de role via `@supabase/ssr`**
- [ ] **Passo 6: Rodar testes e verificar aprovação**
- [ ] **Passo 7: Commit**
  `git commit -m "feat(kanban): adiciona quadro kanban com @dnd-kit otimista e modais de interceptação"`

---

### Tarefa 9: Telas Operacionais Internas (`/conferencia/:id`, `/aprovacoes`, `/pagamentos`, `/notas/:id`)

**Arquivos:**
- Criar: `src/app/conferencia/[id]/page.tsx`, `src/app/aprovacoes/page.tsx`, `src/app/pagamentos/page.tsx`, `src/app/notas/[id]/page.tsx`
- Criar: `src/actions/approvals.ts`
- Teste: `tests/unit/operational-screens.test.ts`

**Interfaces:**
- Produz: Triagem analista human-in-the-loop, validação de alçadas orçamentárias de gestor/CFO, fila de quitação com cópia de Pix em 1 clique e linha do tempo de auditoria imutável.

- [ ] **Passo 1: Escrever teste unitário de regras de alçada (aprovação dentro do teto vs bloqueio exigindo CFO)**
- [ ] **Passo 2: Rodar teste para verificar falha**
- [ ] **Passo 3: Implementar Server Action `approveInvoiceWithCheck` e tela `/aprovacoes`**
- [ ] **Passo 4: Implementar `/conferencia/:id` com reprocessamento IA e validação de retenções**
- [ ] **Passo 5: Implementar `/pagamentos` com cópia de Pix e `/notas/:id` com histórico de auditoria**
- [ ] **Passo 6: Rodar testes e validar aprovação**
- [ ] **Passo 7: Commit**
  `git commit -m "feat(ops): implementa telas de conferência, aprovações por alçada, pagamentos e auditoria"`

---

### Tarefa 10: Dashboard Executivo da Holding (`/dashboard`)

**Arquivos:**
- Criar: `src/app/dashboard/page.tsx`, `src/components/dashboard/MetricCard.tsx`, `src/components/dashboard/VerticalChart.tsx`
- Teste: `tests/unit/dashboard-metrics.test.ts`

**Interfaces:**
- Produz: Bento Grid executivo com indicadores consolidados e segmentados das 4 verticais (Impact Hub, Salto, Impacta Mais, Seu PêJota), funil de fases e passivo circulante.

- [ ] **Passo 1: Escrever teste unitário de cálculo de agregados e somatórios por vertical**
- [ ] **Passo 2: Rodar teste para verificar falha**
- [ ] **Passo 3: Implementar Server Components de busca de dados consolidados e visualização gráfica**
- [ ] **Passo 4: Rodar testes para validar somatórios e métricas**
- [ ] **Passo 5: Commit**
  `git commit -m "feat(dashboard): implementa dashboard executivo com indicadores das 4 verticais"`

---

### Tarefa 11: Fechamento Contábil com Compilação no Cliente via `jszip` (`/fechamento`)

**Arquivos:**
- Criar: `src/app/fechamento/page.tsx`, `src/components/closing/ZipGeneratorButton.tsx`, `src/lib/csv-manifest.ts`
- Teste: `tests/unit/closing-zip.test.ts`

**Interfaces:**
- Produz: Tabela de auditoria com indicador de pareamento 100%, download paralelo de blobs via URLs assinadas e empacotamento em memória no cliente com `jszip`, disparando download direto do `.zip`.

- [ ] **Passo 1: Escrever teste unitário de geração do manifesto CSV e estrutura de pastas do ZIP**
- [ ] **Passo 2: Rodar teste para verificar falha**
- [ ] **Passo 3: Implementar `src/lib/csv-manifest.ts` seguindo as diretrizes da skill `invoice-organizer`**
- [ ] **Passo 4: Implementar `ZipGeneratorButton` com `jszip` e download nativo via Blob**
- [ ] **Passo 5: Implementar página `/fechamento` com trava de notas não pareadas**
- [ ] **Passo 6: Rodar testes para validar o empacotamento**
- [ ] **Passo 7: Commit**
  `git commit -m "feat(closing): implementa fechamento contábil e compilação do .zip via jszip no cliente"`

---

### Tarefa 12: Configurações, Verificação Ponta a Ponta e Build de Produção

**Arquivos:**
- Criar: `src/app/configuracoes/page.tsx`
- Teste: `tests/e2e/full-flow.test.ts`

**Interfaces:**
- Produz: Gestão institucional de empresas e centros de custo, verificação ponta a ponta e build verde da aplicação (`npm run build`).

- [ ] **Passo 1: Implementar tela `/configuracoes` para manutenção das empresas e alçadas**
- [ ] **Passo 2: Rodar suíte completa de testes automatizados (`npm test`)**
- [ ] **Passo 3: Executar `npm run build` e certificar que não há erros de tipagem TypeScript ou ESLint**
- [ ] **Passo 4: Validar navegação e fluxo com subagente de navegador**
- [ ] **Passo 5: Atualizar `docs/changelog.md` com a conclusão da implementação**
- [ ] **Passo 6: Commit final**
  `git commit -m "feat(app): conclui telas de configurações, testes integrados e validação de build"`

---

## Plano de Verificação

### Testes Automatizados
- `npm test`: Executa todos os testes unitários e de integração via Vitest (matemática de impostos, hash SHA-256, contratos de dados, regras de alçada e geração de CSV).
- `npm run build`: Validação rigorosa de compilação estática, rotas dinâmicas, tipagem TypeScript e empacotamento Next.js.

### Verificação Manual e Ponta a Ponta
1. **Login com Seletor**: Acessar `/`, alternar entre perfis e validar redirecionamento seguro.
2. **Upload do Fornecedor**: Submeter NFS-e em `/upload`, validar extração do Gemini 2.5 Flash no split-view, ajustar valores e emitir protocolo.
3. **Kanban e Modais**: Arrastar card entre colunas; verificar que arrastar para `RECUSADO` exige justificativa e arrastar para `PAGO` exige comprovante.
4. **Fechamento Contábil**: Acessar `/fechamento`, clicar em gerar `.zip` e certificar que o arquivo é baixado no navegador contendo o manifesto CSV e os PDFs pareados.
5. **Acesso à Fase 1**: Acessar `/portal` e certificar que a Landing Page original e seus assets continuam 100% funcionais.
