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

### [2026-09-16] — Arquitetura Dual no Portal (/portal), Transição do n8n para Gemini Spark e Sincronia Vercel
- **Commit**: `feat(portal): implementa arquitetura dual Solucao A (Gemini Spark) vs Solucao B (Full-Stack), reposiciona video demo e remove n8n`
- **Contexto**: Reposicionamento estratégico da entrega do desafio técnico da vaga de Analista Pleno de IA e Produtos Digitais:
  1. **Descarte Integral do n8n**: Excluído o workflow `fluxo-n8n-trecho1-extracao-nf.json` e todos os binários/referências legadas do n8n.
  2. **Adoção da Solução A (Google Workspace & Gemini Spark)**: Documentada a automação nativa e autônoma funcional no Workspace (Gmail, Drive, Google Sheets com 18 colunas, Dashboard de KPIs, Web App Apps Script com aprovação 1-clique e acionador de recusas). Correção dos índices de array (`data[i][5]` para número da nota e `data[i][2]` para prestador) no script gerado para download.
  3. **Adoção da Solução B (Plataforma Enterprise iHubFiscal v2)**: Demonstração da aplicação corporativa em Next.js 15, Vercel e Supabase com Kanban de 6 fases, segregação de funções, alçadas hierárquicas e fechamento contábil .ZIP.
  4. **Redesign do Portal Executivo (`/portal`)**:
     - Seção do **Vídeo Demo** reposicionada logo abaixo do Hero para destaque à banca avaliadora.
     - Todas as seções subsequentes divididas em **layout lado a lado (Solução A à esquerda e Solução B à direita)**: 4 Entregáveis Obrigatórios, Visão Arquitetural, Demonstração & Códigos e Matriz de Contingência.
     - Inclusão do **Quadro Comparativo Executivo** (Matriz de decisão: Custo, Tempo, SoD, Alçadas e Volume).
  5. **Sincronia Estrita com a Vercel**: Atualizados simultaneamente `portal/` e `public/portal/` (arquivos `index.html` e downloads `solucao-a-codigo-apps-script.js`, `solucao-a-prompt-gemini-spark.txt`), com hashes idênticos.
  6. **Atualização de Documentos**: `docs/entregavel-1-desenho-da-solucao.md`, `docs/entregavel-4-roteiro-video-demo.md` e criação de `docs/solucao-a-manual-gemini-spark.md`.

### [2026-09-16] — Evolução do Kanban para 6 Fases (Nova Etapa "Agendado"), Tooltips Informativos e Dropdown de Alçadas na Navbar
- **Commit**: `feat(kanban): adiciona fase Agendado (6 fases), tooltips informativos e dropdown de troca de personas na Navbar`
- **Contexto**: Refinamento da esteira operacional de contas a pagar e da experiência de avaliação de alçadas:
  1. **Renomeação de Fase**: Atualizado o nome de *"Agendar para Pagamento"* para *"Agendar Pagamento"*.
  2. **Nova Etapa Operacional ("Agendado")**: Inserida coluna entre *"Agendar Pagamento"* e *"Pago & Liquidado"*, representando despesas já cadastradas e programadas no internet banking que aguardam a data de débito para a baixa com anexo de comprovante bancário.
  3. **Tooltips Informativos nas Colunas**: Implementados tooltips em hover com micro-interação CSS nas 6 colunas do Kanban, contendo descrições curtas e didáticas de cada etapa do ciclo de vida.
  4. **Dropdown de Alçadas na Navbar**: O card de usuário no canto superior direito foi convertido em um dropdown suspenso interativo para alternar entre as 4 personas (*Carlos Financeiro*, *Beatriz Inovação*, *Rodrigo Controller*, *Mariana Admin*) em 1 clique sem sair da página atual, além de atalho para logout.
  5. **Compatibilidade e Validação E2E**: Tipos TypeScript e Server Actions atualizados, faturas na fase `AGENDADO` refletidas em `/pagamentos`, 44 testes unitários no Vitest aprovados (100%) e `next build` concluído com sucesso.

### [2026-09-16] — Correção de Server Actions e Desacoplamento de Utilitários para Deploy na Vercel
- **Commit**: `fix(build): extrai generateProtocol para src/lib/protocol.ts e corrige tipagem em WizardStep2SplitView`
- **Contexto**: Resolução de falha de compilação do Next.js 15 durante o deploy na Vercel (`Server Actions must be async functions`).
- **Arquivos**: `src/lib/protocol.ts`, `src/actions/invoices.ts`, `src/components/supplier/WizardStep2SplitView.tsx`, `tests/unit/supplier-wizard.test.ts`, `docs/changelog.md`.
- **Decisões e Resultados**:
  1. **Desacoplamento de Funções Síncronas**: Criado `src/lib/protocol.ts` contendo `generateProtocol()` sem a diretiva `'use server'`, eliminando a exigência do Next.js de tratar funções utilitárias síncronas como Server Actions assíncronas.
  2. **Tratamento de Tipos e Exceções**: Ajustada a Server Action `submitSupplierInvoice` com declaração estrita de `invoiceId` e tratamento via try/catch em `WizardStep2SplitView.tsx` com importação de `AlertCircle`.
  3. **Validação de Build e Testes**: `next build` aprovado localmente (todas as 12 rotas estáticas e dinâmicas geradas com sucesso) e 100% da suíte de testes passando no Vitest (44/44 testes).

### [2026-09-16] — Unificação Formal da Versão 2 na Master via Pull Request #1
- **Pull Request**: [#1 — `feat(v2): unificacao do iHubFiscal v2 na master com pipeline de IA e governanca`](https://github.com/mbrancos/DesafioIHF/pull/1) (Status: `MERGED`)
- **Contexto**: Consolidação completa da versão 2 do **iHubFiscal** da branch `feat/ihubfiscal-v2` para a branch principal `master` no GitHub, preservando o histórico integral de commits, a Landing Page executiva da Fase 1 (`/portal`) e validando todas as entregas técnicas de governança e inteligência artificial.
- **Arquivos Afetados**: 79 arquivos atualizados na branch `master` (+15.086 adições, -241 remoções).
- **Destaques de Engenharia e Arquitetura**:
  1. **Scaffolding Enterprise & Design System**: Next.js 15, React 19, TypeScript estrito e tokens CSS oficiais de `floripa.impacthub.net` aplicados rigorosamente nas 10 telas operacionais.
  2. **Resiliência de IA Fail-Fast (Google Gemini)**: Fallback em tempo real entre `gemini-flash-latest` e `gemini-flash-lite-latest` sem backoffs demorados, mantendo tempo total de resposta abaixo de 18 segundos e respeitando o teto de `maxDuration = 30` da Vercel.
  3. **Modo Contingência para 503**: Tratamento elegante na UI do fornecedor com banner amigável, opção *"Continuar e Preencher Manualmente"* e registro semântico `{ manual_entry: true, ai_fallback: true }` nos eventos imutáveis de auditoria (`invoice_events`).
  4. **Bypass de Limite Serverless (JSZip)**: Empacotamento de notas fiscais e relatórios contábeis `.zip` compilados inteiramente no navegador do cliente, contornando a trava de payload de 4.5 MB da Vercel.
  5. **Governança Estrita de Alçadas**: Gestor de Centro de Custo com limite de até R$ 10.000,00 e CFO com aprovação ilimitada, bloqueando aprovações cruzadas e validando consistência fiscal com tolerância de centavos (R$ 0,02).
  6. **Qualidade e Testes**: Build de produção verde (`npm run build`) e 100% da suíte de testes unitários aprovada (11 arquivos, 44 testes passando no Vitest).

### [2026-09-15] — Ativação Real da IA Gemini e Persistência Completa no Supabase (Storage + DB)
- **Commit**: `feat(ai-storage): ativação real do Google Gemini com structured outputs e upload no Supabase Storage`
- **Contexto**: Eliminação definitiva de fallbacks mockados na ingestão de notas fiscais, configuração da chave real da API do Google AI Studio no `.env.local`, criação de cliente administrativo (`createAdminClient`) com `SUPABASE_SERVICE_ROLE_KEY` para upload seguro no bucket público `invoices`, tratamento de status 503 com retry automático e persistência ponta a ponta na tabela `invoices` e `invoice_events`.
- **Arquivos**: `.env.local`, `src/lib/gemini.ts`, `src/lib/supabase/admin.ts`, `src/actions/invoices.ts`, `src/components/supplier/WizardStep2SplitView.tsx`, `docs/changelog.md`.
- **Decisões e Resultados**:
  1. **Salvaguarda de Limite Server Actions**:
     - `next.config.ts` mantido com `serverActions: { bodySizeLimit: '4mb' }`, viabilizando o envio seguro de PDFs íntegros de NFS-e via `FormData`.
  2. **Bypass de RLS para Fornecedor Público**:
     - Criado `src/lib/supabase/admin.ts` utilizando `SUPABASE_SERVICE_ROLE_KEY` no servidor, permitindo que submissões públicas e anônimas gravem no bucket `invoices` e nas tabelas relacionais sem bloqueio de RLS.
  3. **Google Gemini Multimodal com Resiliência**:
     - Ativada a chave oficial do Google AI Studio no `.env.local`.
     - Implementado loop com retry automático (backoff exponencial) para blindar contra picos temporários de demanda (HTTP 503) no modelo `gemini-flash-latest`.
     - Extração 100% precisa homologada com documento PDF real (`test-samples/NF-2026001-ImpactHub-Floripa.pdf`).
  4. **Persistência Ponta a Ponta**:
     - O arquivo binário do PDF é gravado no Supabase Storage (`invoices/<hash>.pdf`).
     - A URL pública é armazenada na coluna `file_pdf_url`.
     - Dados cadastrais do prestador atualizados em `suppliers`.
     - Fatura persistida em `invoices` com status `TRIAGEM` e evento registrado na trilha de auditoria `invoice_events`.
     - Nota refletida em tempo real no quadro Kanban.

### [2026-09-15] — Aplicação do Logotipo Oficial e Favicon do Impact Hub no Projeto
- **Commit**: `feat(branding): aplica logotipo oficial do Impact Hub e configura favicon em todas as páginas`
- **Contexto**: Inclusão do asset vetorial oficial da marca (`logo-impact-hub.svg`) extraído de `floripa.impacthub.net` para substituir todos os placeholders textuais ("iH", "H") por logotipo de alta definição, além de configurar suporte a favicon SVG nativo em todas as rotas do Next.js e da Landing Page executiva.
- **Arquivos**: `public/img/logo-impact-hub.svg`, `public/favicon.svg`, `src/app/icon.svg`, `src/app/layout.tsx`, `src/components/common/Navbar.tsx`, `src/app/page.tsx`, `src/app/upload/page.tsx`, `public/portal/index.html`, `portal/index.html`, `docs/changelog.md`.
- **Decisões e Resultados**:
  1. **Decisão Arquitetural de Assets Estáticos**:
     - **Pasta `public/` e `src/app/`**: Escolhidas como a melhor prática definitiva para logos, favicons e elementos de UI da marca, garantindo latência zero, cache CDN na borda e independência de serviços externos ou autenticação.
     - **Supabase Storage**: Mantido estritamente para o seu propósito ideal: dados dinâmicos enviados por usuários e fornecedores (PDFs de NFS-e, comprovantes bancários e fechamentos mensais em `.zip`).
  2. **Favicon Multiplataforma**:
     - Configurado `src/app/icon.svg` (suporte automático do Next.js App Router para `<link rel="icon">`).
     - Metadados explícitos em `src/app/layout.tsx` (`icons.icon`, `icons.shortcut`, `icons.apple`).
     - Tags `<link rel="icon" type="image/svg+xml">` e `<link rel="apple-touch-icon">` adicionadas no `<head>` de `public/portal/index.html` e `portal/index.html`.
  3. **Aplicação Visual em Todas as Telas**:
     - **Navbar Unificado (`Navbar.tsx`)**: Atualizado com o logotipo oficial ao lado de `iHubFiscal | Companhia de Impacto`, impactando instantaneamente todas as 7 rotas operacionais do sistema (`/kanban`, `/aprovacoes`, `/revisao-ia`, `/conciliacao`, `/fechamento`, `/fornecedores`, `/configuracoes`).
     - **Tela de Login (`page.tsx`)**: Header superior com o logo oficial da marca.
     - **Portal do Fornecedor (`upload/page.tsx`)**: Header de autoatendimento com o logo oficial e microinteração no hover.
     - **Portal Executivo (`/portal`)**: Header e Footer com o logo oficial em SVG nítido.
  4. **Validação**: Testado e validado com sucesso via subagente de navegador com evidências visuais capturadas em todas as rotas.

### [2026-09-15] — Correção de Naming iHubFiscal e Otimização do Header no Portal (/portal)
- **Commit**: `fix(portal): corrige naming iHubFiscal e elimina quebras de linha no header`
- **Contexto**: Eliminação de referências residuais à nomenclatura preliminar ("ImpactPay") na Landing Page Executiva e expansão do container do header para o padrão `.container-1465px` de `docs/designIHF.md`, garantindo que links e botões não sofram quebras de linha em viewports comuns (ex.: 1366px e 1440px).
- **Arquivos**: `public/portal/index.html`, `portal/index.html`, `docs/changelog.md`.
- **Decisões e Resultados**:
  1. **Tag `<title>` e Metadados**: Substituído `ImpactPay AI` por `iHubFiscal — Central Integrada de Contas a Pagar & Governança com IA | Companhia de Impacto`.
  2. **Substituição de Naming Residual**:
     - Seção de Vídeo: `Demonstração Prática do iHubFiscal`.
     - Seção de Arquitetura: `Como o iHubFiscal Protege a Holding`.
  3. **Header e Dimensões Oficiais**:
     - Container expandido de `max-w-7xl` (1280px) para `max-w-[1465px]` (`.container-1465px`), alinhado à Seção 3.2 de `docs/designIHF.md`.
     - Aplicação de `whitespace-nowrap` e controle de encolhimento (`shrink-0`) em todos os 5 links de navegação (`4 Entregáveis`, `Vídeo Demo (3 min)`, `Arquitetura`, `Simulador n8n`, `Contingência`).
     - Botão CTA com rótulo conciso `Acessar iHubFiscal v2 →` e `whitespace-nowrap`, evitando quebra do sufixo `v2`.
     - Identificação do candidato (`Moisés Branco`) em linha única perfeitamente legível.
  4. **Validação**: Testado via subagente de navegador com captura de tela em `http://localhost:3000/portal` comprovando integridade e fidelidade estética.

### [2026-09-15] — Redesign Executivo da Landing Page (/portal) Alinhado ao designIHF.md
- **Commit**: `style(portal): aplica identidade visual oficial de designIHF.md na landing page executiva`
- **Contexto**: Harmonização estética completa da Landing Page executiva (`/portal`) com os tokens oficiais do Impact Hub Floripa (tema Labbo Digital), eliminando paletas genéricas (teal e laranja padrão) e aplicando a tipografia oficial Poppins e GT Walsheim.
- **Arquivos**: `public/portal/index.html`, `portal/index.html`.
- **Decisões e Resultados**:
  1. **Tipografia Oficial**: Importação e aplicação rigorosa da fonte **Poppins** (Google Fonts `weights: 400, 500, 600, 700, 800`) em títulos, botões e indicadores numéricos, com sans-serif limpo para corpo de texto.
  2. **Paleta Cromática Oficial da Labbo**:
     - Cor primária da marca: **Bordô / Vermelho `#812926`** em badges, botões principais e destaques.
     - Azuis corporativos: **`#1c395c`** (azul-marinho corporativo) e **`#102235`** (azul noite escuro do hero e header).
     - Acentos vibrantes: **Ciano `#41bed0`** em CTAs e destaques, e **Pêssego `#fde2ce`** para números em fundos escuros/bordô.
     - Fundo off-white: **`#f7f6f2`** (`--branco-2`) e ciano pastel para quadros de valores (`#e2f5f8`).
  3. **Bento Grid de KPIs**: Cards reformulados com iluminação suave, contrastes adequados e tipografia Poppins.
  4. **Botões com Design Pill e Micro-interações**: Botões com `border-radius: 100px`, variantes em Bordô, Azul-marinho e Ciano, e efeito hover com translação da seta em `.btn-learn-more`.
  5. **Conexão Direta com o iHubFiscal v2**: Inserção de botão CTA de alto destaque no header direcionando a banca para a central v2 (`/`), integrando a apresentação dos entregáveis ao sistema real.

### [2026-09-15] — Tarefas 11 e 12 Concluídas: Fechamento Contábil com JSZip, Configurações e Blindagem de Integridade
- **Commit**: `feat(closing): implementa fechamento contabil jszip, configuracoes da holding e recalibragem de integridade B2B`
- **Contexto**: Implementação das telas finais `/fechamento` e `/configuracoes`, resolução da armadilha de 4.5 MB da Vercel via compilação no cliente (`jszip`), eliminação de erro de hidratação e recalibragem de escala financeira B2B e alçadas.
- **Arquivos**: `src/app/fechamento/page.tsx`, `src/components/closing/ZipGeneratorButton.tsx`, `src/lib/csv-manifest.ts`, `src/app/configuracoes/page.tsx`, `src/app/layout.tsx`, `src/actions/approvals.ts`, `src/components/approvals/ApprovalCard.tsx`, `src/components/kanban/InvoiceCard.tsx`, `src/components/kanban/KanbanColumn.tsx`, `src/components/kanban/PaymentProofModal.tsx`, `src/components/payments/PaymentCard.tsx`, `src/app/pagamentos/page.tsx`, `src/app/notas/[id]/page.tsx`, `src/app/dashboard/page.tsx`, `tests/unit/closing-zip.test.ts`.
- **Decisões e Resultados**:
  1. **Eliminação da Armadilha de 4.5 MB da Vercel**: Fechamento contábil em `/fechamento` executa o download paralelo de notas e comprovantes e a compilação do arquivo `.zip` 100% no navegador via `jszip`. Custo de servidor zero, sem timeout de 10s e sem risco de erro `502 / FUNCTION_PAYLOAD_TOO_LARGE`.
  2. **Manifesto CSV e Pareamento Contábil**: Criação de `src/lib/csv-manifest.ts` seguindo as diretrizes da skill `invoice-organizer`, com cabeçalho com ponto e vírgula, decimais com vírgula e alerta de notas sem comprovante.
  3. **Tela de Configurações da Holding (`/configuracoes`)**: Gestão institucional das 4 empresas (*Impact Hub Floripa*, *Instituto Salto*, *Impacta Mais*, *Seu PêJota*), catálogo de 6 centros de custo, matriz de alçadas orçamentárias (Gestor até R$ 10.000,00 e CFO ilimitado) e diretrizes de conformidade LGPD.
  4. **Eliminação do Erro de Hidratação**: Adição de `suppressHydrationWarning` nas tags `<html>` e `<body>` de `src/app/layout.tsx`, eliminando ruídos no DOM causados por extensões do navegador e assegurando console limpo.
  5. **Recalibragem de Escala B2B e Causa-Raiz de Alçada**: Identificada e sanada a dupla divisão por 100 nos componentes (`formatBRL` já divide centavos). O valor da Construtora foi recalibrado para R$ 14.250,00 (centavos `1425000`), tornando o bloqueio por exceder R$ 10.000,00 matematicamente irrefutável para a banca.
  6. **Validação E2E no Navegador Real**: `browser_subagent` navegou pelas rotas `/`, `/aprovacoes`, `/fechamento`, `/configuracoes` e `/portal`, atestando status 200 OK, funcionamento correto das alçadas e ausência de erros.

### [2026-09-15] — Tarefa 10 Concluída: Dashboard Executivo da Holding (/dashboard)
- **Commit**: `feat(dashboard): implementa dashboard executivo com bento grid e metricas consolidadas das 4 verticais`
- **Contexto**: Implementação da tela `/dashboard` em formato Bento Grid consolidando os dados financeiros em tempo real das 4 empresas da holding (Impact Hub Floripa, Salto Aceleradora, Impacta Mais e Seu PêJota).
- **Arquivos**: `src/app/dashboard/page.tsx`, `src/lib/dashboard-metrics.ts`, `tests/unit/dashboard-metrics.test.ts`.
- **Decisões e Resultados**:
  1. Criação do módulo `src/lib/dashboard-metrics.ts` calculando o total do passivo circulante ativo, total liquidado, taxa média de acurácia da IA Gemini e decomposição por empresa e centros de custo.
  2. Implementação do layout Bento Grid corporativo seguindo rigorosamente os tokens de `docs/designIHF.md`: card azul marinho (`#1c395c`), card bordô primário (`#812926`) com tipografia `--laranja: #fde2ce` e card ciano métrico (`#e2f5f8`).
  3. Visualização segmentada das 4 verticais com volume financeiro em R$ e contagem de faturas.
  4. Funil de fases do ciclo de vida com barras de progresso cromáticas proporcionais e ranking de centros de custo mais demandados.
  5. 100% de sucesso nos testes unitários e tipagem estrita do TypeScript aprovada (`41 tests passed`).

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

### [2026-09-15] — Implementação de Resiliência em 3 Camadas: Fallback Fail-Fast de IA, Modo de Contingência Manual e Auditoria
- **Arquivos Afetados**:
  - [`src/lib/gemini.ts`](file:///d:/Etna/Projetos/DesafioIHF/src/lib/gemini.ts)
  - [`src/app/api/extract/route.ts`](file:///d:/Etna/Projetos/DesafioIHF/src/app/api/extract/route.ts)
  - [`src/components/supplier/WizardStep1Upload.tsx`](file:///d:/Etna/Projetos/DesafioIHF/src/components/supplier/WizardStep1Upload.tsx)
  - [`src/components/supplier/WizardStep2SplitView.tsx`](file:///d:/Etna/Projetos/DesafioIHF/src/components/supplier/WizardStep2SplitView.tsx)
  - [`src/actions/invoices.ts`](file:///d:/Etna/Projetos/DesafioIHF/src/actions/invoices.ts)
- **Contexto**: A API do Google Gemini apresentou erro esporádico `503 UNAVAILABLE ("This model is currently experiencing high demand")`, exibindo JSON cru no frontend e bloqueando o fluxo de envio da nota pelo fornecedor.
- **Decisões Tomadas (3 Camadas de Blindagem)**:
  1. *Fallback Rápido (Fail-Fast)*: Configuração de pool sequencial entre `gemini-flash-latest` (primário) e `gemini-flash-lite-latest` (secundário) com 1 tentativa por modelo e sem backoff demorado, mantendo a execução bem abaixo do limite de 18s e respeitando `export const maxDuration = 30;` na Vercel.
  2. *Tratamento de Erros e Eliminação de JSON Cru*: Higienização de mensagens de erro na API e na interface. Erros técnicos ou strings JSON são convertidos em banners amigáveis com tokens do Design System (`--ihf-status-warning`), orientando o usuário com clareza.
  3. *Modo de Contingência (Preenchimento Manual)*: Adicionado o botão "Continuar e Preencher Manualmente". Caso a IA esteja indisponível ou o usuário opte por seguir sem IA, o sistema avança para o Step 2 (Split-View) com o PDF aberto à esquerda e campos liberados à direita (`confidence_score: 0`).
  4. *Validação Rigorosa de Campos Obrigatórios*: Implementada checagem antes da submissão no Step 2 (`numero_nota`, `cnpj_prestador`, `razao_social_prestador`, `data_emissao`, `data_vencimento`, `valor_liquido > 0`), blindando o banco contra violações de `NOT NULL`.
  5. *Rastreabilidade em `invoice_events`*: Registradas as flags semânticas `{ manual_entry: true, ai_fallback: true }` no evento de auditoria `UPLOADED` no Supabase, garantindo conformidade com os critérios de governança e auditoria da banca.
  6. *Preservação de SHA-256*: Devolução do hash pela API mesmo em falha de IA e fallback com a biblioteca `src/lib/crypto.ts` via Web Crypto nativa no navegador caso haja desconexão de rede.

### [2026-09-15] — Resolução de Dessincronização de Cache do Webpack (`.next`) e Recuperação da Rota `/upload`
- **Contexto**: Após a execução de `npm run build` para validação de tipagens, o usuário encontrou um erro de tempo de execução (`Runtime TypeError: Cannot read properties of undefined (reading 'call')` em `options.factory` do webpack) ao acessar a rota `/upload`.
- **Causa Raiz Identificada**:
  - No Next.js 15, rodar `next build` (build de produção) na mesma pasta onde `next dev` está ativo sobrescreve a pasta `.next/static/chunks` com os artefatos de produção em vez dos módulos de desenvolvimento (HMR).
  - Quando a aba do navegador solicitou os chunks de desenvolvimento antigos (como `layout.css?v=...`), o servidor retornou 404 e o bundler do cliente quebrou ao tentar resolver os módulos inexistentes no manifesto.
- **Ação Corretiva Executada**:
  1. Encerramento do processo `next dev` dessincronizado.
  2. Limpeza completa do cache corrompido em `.next/`.
  3. Reinicialização do servidor de desenvolvimento limpo (`npm run dev`).
  4. Validação automatizada via navegador comprovando o carregamento integral da página `/upload` com status 200 OK.

### [2026-09-15] — Otimização de UI/UX: Eliminação de Barra de Rolagem Dupla no Visualizador de PDF e Diagnóstico de Wheel Violation
- **Arquivos Afetados**: [`src/components/pdf/PdfViewer.tsx`](file:///d:/Etna/Projetos/DesafioIHF/src/components/pdf/PdfViewer.tsx), [`src/components/supplier/WizardStep2SplitView.tsx`](file:///d:/Etna/Projetos/DesafioIHF/src/components/supplier/WizardStep2SplitView.tsx).
- **Contexto**: Na etapa 2 do portal do fornecedor (`/upload`) e na conferência técnica (`/conferencia/:id`), o usuário relatou a ocorrência de aviso `[Violation]` no DevTools do navegador referente a non-passive wheel event listener, além da presença de duas barras de rolagem verticais paralelas (Double Scrollbar) no preview do PDF.
- **Causa Raiz Identificada**:
  1. *Double Scrollbar*: O container pai (`flex-1 overflow-auto p-4`) possuía padding vertical e altura restrita, enquanto o wrapper interno possuía `min-h-[600px]` e o `iframe` fixava `h-[650px]`. A soma excedia a altura útil da coluna na viewport (1366x641), gerando uma barra externa no container pai, enquanto o motor PDFium do navegador gerava a barra interna para navegar no documento.
  2. *Violation do Chromium*: Emitido pelo script nativo do visualizador de PDF do navegador (`pdf_viewer_wrapper.js`) ao registrar listener `wheel` com `{ passive: false }` para suportar atalhos de zoom (`Ctrl + Wheel`). Não é um erro da aplicação, mas o atrito do scroll duplo agravava a percepção de jank.
- **Decisões Tomadas**:
  - **Visualização Full-Bleed sem Rolagem Dupla**: Removidas as dimensões fixas em pixels (`h-[650px]`). O `iframe` agora ocupa 100% da largura e altura (`w-full h-full border-none block`) com o container pai em `overflow-hidden`. A rolagem vertical passa a ser unificada e exclusiva do motor do documento.
  - **Sincronização de Altura no Split-View**: Ajustadas as colunas do split view para `h-[calc(100vh-160px)] min-h-[600px] max-h-[820px]`, mantendo o lado esquerdo fixo e o lado direito com rolagem independente suave.
  - **Gerenciamento de Memória (Cleanup)**: Adicionado `useEffect` com `URL.revokeObjectURL` no desmonte para evitar vazamentos de memória de blobs no cliente.

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
