# Especificação de Arquitetura Técnica — iHubFiscal v2

> **Data**: 15/09/2026  
> **Status**: Validado com o Desenvolvedor / Pronto para Execução  
> **Sistema**: Central Inteligente de Contas a Pagar e Governança com IA (iHubFiscal)  
> **Organização**: Holding Companhia de Impacto  
> **Autor**: Moisés Branco dos Santos  
> **Fontes da Verdade**: [`docs/designIHF.md`](../../designIHF.md) (Design System), [`docs/iHubFiscal.md`](../../iHubFiscal.md) (Requisitos Funcionais & Dados), [`docs/changelog.md`](../../changelog.md) (Diário de Bordo & ADRs).

---

## 1. Visão Geral da Arquitetura

O **iHubFiscal v2** é construído sob uma arquitetura 100% *serverless* e *edge-ready*, eliminando servidores dedicados, máquinas virtuais e intermediários pesados. A solução integra três pilares de infraestrutura em nuvem gerenciada:

```mermaid
flowchart TD
    subgraph Client [Navegador do Usuário / Fornecedor]
        UI[Next.js 15 App Router + Tailwind CSS]
        PDFView[Dynamic PDF Viewer (next/dynamic ssr: false)]
        KanbanUI[Kanban com @dnd-kit (Otimista + Modais de Interceptação)]
        ZipClient[Gerador .ZIP em Memória via JSZip (Bypass 4.5MB Vercel)]
    end

    subgraph Vercel [Vercel Serverless Platform]
        IngestRoute["/api/extract (maxDuration = 30s, Trava 4MB)"]
        ServerActions["Server Actions (src/actions/*) com Validação de Sessão e RBAC"]
        SSR["@supabase/ssr (Cookies HTTP-Only)"]
    end

    subgraph GoogleCloud [Google Cloud AI]
        Gemini["Gemini 2.5 Flash (@google/genai)\nStructured Outputs (JSON Schema)"]
    end

    subgraph Supabase [Supabase BaaS (sa-east-1)]
        Auth[Supabase Auth + Seletor de Personas]
        Postgres[PostgreSQL 15+ com RLS e Schema iHubFiscal]
        Storage["Object Storage (Buckets: invoices e payment-proofs)"]
    end

    UI --> IngestRoute
    UI --> ServerActions
    IngestRoute -->|Inline Buffer PDF| Gemini
    IngestRoute -->|Upload Binário| Storage
    ServerActions -->|Validação Sessão| SSR
    SSR --> Auth
    ServerActions -->|Mutação & Auditoria| Postgres
    ServerActions -->|Upload Comprovante| Storage
    ZipClient -->|Download Paralelo de Blobs| Storage
```

---

## 2. Decisões Arquiteturais Fundamentais (ADR)

### 2.1 Bypass da Armadilha de 4.5 MB da Vercel (Compilação do `.zip` no Cliente com `jszip`)
* **Problema:** As *Serverless Functions* da Vercel impõem um limite estrito de **4.5 MB no payload de resposta** (`response body`). Um lote mensal com 15 a 20 notas fiscais em PDF e seus respectivos comprovantes bancários facilmente atinge entre 10 MB e 30 MB, resultando no erro fatal `502 / FUNCTION_PAYLOAD_TOO_LARGE`.
* **Decisão:** Eliminar qualquer rota de compilação de `.zip` no backend. A tela `/fechamento` solicita ao Supabase as URLs assinadas dos documentos do mês. O navegador realiza o download paralelo dos *blobs* e o empacotamento do arquivo `.zip` é executado **100% em memória no cliente através da biblioteca `jszip`** (com disparo de download nativo via navegador).
* **Impacto:** Custo de servidor zero, imunidade a timeouts serverless e suporte a lotes de qualquer volumetria.

### 2.2 Drag-and-Drop no Kanban com Interceptação por Modal (`@dnd-kit`)
* **Problema:** O Kanban prevê movimentação ágil e fluida entre fases operacionais, porém transitar para `RECUSADO` exige preenchimento obrigatório de justificativa formal, e transitar para `PAGO` exige anexar o comprovante de liquidação bancária. Mover o card diretamente de forma puramente otimista quebraria a integridade das regras de negócio.
* **Decisão:** No evento `onDragEnd` do `@dnd-kit`:
  * Para destinos regulares (`TRIAGEM` $\to$ `AGUARDANDO_APROVACAO` $\to$ `AGENDADO_PAGAMENTO`): o estado é atualizado otimisticamente na tela e a persistência é sincronizada via Server Action em segundo plano (com *rollback* automático caso o gestor não possua teto de alçada).
  * Para destinos restritos (`RECUSADO` e `PAGO`): a movimentação imediata é **interceptada e pausada**. O card permanece provisoriamente na coluna de origem enquanto abre-se o modal correspondente:
    * Modal de Recusa: exige preenchimento de texto da justificativa formal.
    * Modal de Pagamento: exige o anexo do comprovante bancário (PDF/imagem).
  * A transição só é efetivada se o modal for submetido com sucesso. Em caso de cancelamento pelo usuário, o card é destravado em sua coluna original.

### 2.3 Isolamento Semântico e Fidelidade Estrita ao Design System
* **Bordô (`--ihf-brand-primary: #812926`)**: Reservado exclusivamente para a identidade corporativa da marca (logo, cabeçalhos, títulos principais e botões de ação primária).
* **Verde de Confiança (`--ihf-status-success: #16A34A` / `--ihf-brand-forest: #063b27`)**: Papel estritamente semântico de sucesso e alta confiança de leitura de IA ($\ge 90\%$).
* **Amarelo Pulsante (`--ihf-status-warning: #D97706`)**: Papel semântico para dados inconclusivos ou de baixa confiança ($< 90\%$) que demandam revisão humana.
* **Proibição de Desvios**: Elimina-se qualquer termo ambíguo como "verde bordô", mantendo papéis cromáticos completamente isolados conforme `docs/designIHF.md`.

### 2.4 Prevenção de CLS com `next/font`
* As fontes oficiais são importadas em `src/app/layout.tsx`:
  * **Poppins** via `next/font/google` (pesos 400, 500, 600, 700) com variável CSS `--poppins`.
  * **GT Walsheim** via `next/font/local` (pesos 400, 600, 700) com variável CSS `--GT-Walsheim`.
* Garante *zero Cumulative Layout Shift* (CLS) e *preloading* nativo na Vercel.

---

## 3. Topologia de Pastas e Estrutura de Diretórios

```
d:/Etna/Projetos/DesafioIHF/
├── .env.local                          # Segredos locais (Supabase URLs, Service Keys, GEMINI_API_KEY)
├── .env.example                        # Modelo público versionado
├── package.json                        # Dependências oficiais (Next 15, React 19, @google/genai, etc.)
├── tsconfig.json                       # Configuração TypeScript estrita com alias @/*
├── tailwind.config.ts                  # Tokens exatos de docs/designIHF.md injetados
├── next.config.ts                      # Configurações do Next.js
├── public/
│   ├── portal/                         # Landing Page executiva da Fase 1 (index.html + assets)
│   └── fonts/                          # Arquivos locais .woff2 da GT Walsheim
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root Layout com injeção de fontes e tokens
│   │   ├── page.tsx                    # Rota / (Login com botões de atalho de personas para a banca)
│   │   ├── upload/page.tsx             # Rota /upload (Portal do Fornecedor - Wizard 2 etapas)
│   │   ├── kanban/page.tsx             # Rota /kanban (Quadro 5 fases com @dnd-kit e modais)
│   │   ├── conferencia/[id]/page.tsx   # Rota /conferencia/:id (Triagem analista com split-view)
│   │   ├── aprovacoes/page.tsx         # Rota /aprovacoes (Central de alçadas do gestor/CFO)
│   │   ├── pagamentos/page.tsx         # Rota /pagamentos (Fila de baixa com anexo de comprovante)
│   │   ├── notas/[id]/page.tsx         # Rota /notas/:id (Auditoria e detalhes imutáveis)
│   │   ├── dashboard/page.tsx          # Rota /dashboard (Métricas consolidadas das 4 verticais)
│   │   ├── fechamento/page.tsx         # Rota /fechamento (Conciliação e gerador JSZip no cliente)
│   │   ├── configuracoes/page.tsx      # Rota /configuracoes (Empresas, alçadas e taxonomia)
│   │   └── api/
│   │       └── extract/route.ts        # Ingestão de PDF, SHA-256 e Gemini 2.5 Flash (maxDuration = 30)
│   ├── actions/                        # Server Actions autenticadas com @supabase/ssr
│   │   ├── invoices.ts                 # createInvoice, updateInvoiceStatus, rejectWithJustification, payInvoice
│   │   ├── approvals.ts                # checkApprovalLimit, approveInvoice
│   │   └── auth.ts                     # loginWithPersona, logout
│   ├── components/
│   │   ├── common/                     # Header, Sidebar, Botões, Badges, Modais, Inputs
│   │   ├── pdf/
│   │   │   ├── DynamicPdfViewer.tsx    # Wrapper exportado com dynamic(() => ..., { ssr: false })
│   │   │   └── PdfCanvas.tsx           # Renderizador real de páginas do PDF
│   │   ├── kanban/
│   │   │   ├── KanbanBoard.tsx         # Orquestrador @dnd-kit com detecção de destino
│   │   │   ├── KanbanColumn.tsx        # Coluna de fase com totalizador financeiro
│   │   │   ├── InvoiceCard.tsx         # Card arrastável com badge de vertical e valor
│   │   │   ├── RejectModal.tsx         # Modal de justificativa de devolução
│   │   │   └── PaymentProofModal.tsx   # Modal de anexo de comprovante de quitação
│   │   ├── supplier/
│   │   │   ├── WizardStep1Upload.tsx   # Dropzone de PDF com trava visual de 4 MB
│   │   │   └── WizardStep2SplitView.tsx# Visualizador de PDF à esquerda e formulário à direita
│   │   └── closing/
│   │       └── ZipGeneratorButton.tsx  # Download paralelo e compilação em memória com JSZip
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Cliente para Client Components
│   │   │   ├── server.ts               # Cliente para Server Components e Server Actions (@supabase/ssr)
│   │   │   └── middleware.ts           # Proteção de rotas corporativas
│   │   ├── gemini.ts                   # Instância @google/genai com JSON Schema estrito
│   │   ├── crypto.ts                   # Função de cálculo de hash SHA-256 do arquivo
│   │   └── formatters.ts               # Formatação de moedas (centavos para BRL), datas e CNPJs
│   └── types/
│       ├── database.ts                 # Tipagens geradas do schema PostgreSQL
│       └── invoice.ts                  # Interfaces de estado, DTOs e enums do sistema
```

---

## 4. Especificação dos Componentes e Fluxos

### 4.1 Pipeline de Ingestão e IA (`/api/extract/route.ts`)
1. **Configuração Serverless**:
   ```typescript
   export const maxDuration = 30; // Segundos (máximo permitido no plano Hobby da Vercel)
   export const dynamic = 'force-dynamic';
   ```
2. **Validações Iniciais**:
   * Verifica se a requisição contém um arquivo com `Content-Type: application/pdf`.
   * Verifica se `file.size <= 4 * 1024 * 1024` (4 MB). Caso exceda, retorna erro HTTP `413 Payload Too Large` com mensagem orientando a compressão do arquivo.
3. **Criptografia & Upload**:
   * Calcula o hash SHA-256 do `ArrayBuffer`.
   * Verifica duplicidade na tabela `invoices` (`hash_sha256 = :hash`). Se já existir, rejeita com protocolo existente.
   * Faz upload no bucket Supabase Storage: `invoices/raw/${sha256}.pdf`.
4. **Chamada ao Google Gemini 2.5 Flash**:
   * Utiliza `@google/genai` com `gemini-2.5-flash`.
   * Parâmetro `responseSchema` com JSON Schema estrito exigindo os campos fiscais em formato tipado (valores inteiros em centavos, datas ISO, strings sem formatação).
   * Retorna payload limpo e score de confiança cromático para o frontend.

### 4.2 Wizard do Fornecedor (`/upload`)
* **Etapa 1**: Dropzone estilizada com tokens do Design System, barra de progresso e cálculo SHA-256.
* **Etapa 2**: Split-view responsivo. Lado esquerdo com `DynamicPdfViewer` exibindo o PDF original; lado direito com formulário pré-preenchido pela IA, permitindo edição de CNPJ, valores e chave Pix.
* **Validação Matemática Visual**: Indicador visual `Líquido = Bruto - Retenções`. Se divergência for $> \text{R\$\ } 0,02$, exibe alerta amarelo e sinaliza campo inconsistente.
* **Submissão**: Ao confirmar, invoca Server Action que persiste a nota em status `TRIAGEM` e gera o protocolo `IHF-2026-XXXX`.

### 4.3 Kanban Operacional (`/kanban`)
* Organizado nas 5 colunas estritas: `TRIAGEM`, `AGUARDANDO_APROVACAO`, `RECUSADO`, `AGENDADO_PAGAMENTO`, `PAGO`.
* Integrado com `@dnd-kit`.
* Mover para `RECUSADO` abre `RejectModal` (justificativa obrigatória).
* Mover para `PAGO` abre `PaymentProofModal` (anexo obrigatório do comprovante bancário).
* Outras transições atualizam a interface instantaneamente (otimista) e persistem via Server Action com validação de alçada de gestor.

### 4.4 Central de Aprovações (`/aprovacoes`)
* Carrega apenas despesas da vertical ou centro de custo sob gestão do usuário logado.
* Exibe badge de conformidade: dentro do limite de alçada ou necessidade de aprovação extraordinária do CFO.
* Ações: Aprovar com 1 clique ou Devolver com justificativa.

### 4.5 Fechamento Contábil e Pacote `.zip` (`/fechamento`)
* Tabela de auditoria do mês com indicador de pareamento (100% das notas devem ter comprovante).
* Botão "Compilar Pacote Contábil (.ZIP)":
  * Busca lista de faturas do mês via Supabase.
  * Baixa em paralelo os PDFs das notas e comprovantes via `fetch` de URLs assinadas.
  * Gera manifesto de conciliação em `.csv`.
  * Cria estrutura de pastas no `.zip`:
    * `/notas_fiscais/`
    * `/comprovantes/`
    * `manifesto_conciliacao_MM_AAAA.csv`
  * Dispara download direto no navegador do usuário via Blob URL.

### 4.6 Login e Demonstração para a Banca (`/`)
* Card de autenticação institucional com bordô primário (`#812926`) e logo iHubFiscal.
* Painel de atalhos rápidos de demonstração:
  * *"Entrar como Analista Financeiro (Operação & Triagem)"*
  * *"Entrar como Gestor de Inovação (Alçada até R$ 10.000)"*
  * *"Entrar como CFO (Alçada Ilimitada & Fechamento)"*
  * *"Entrar como Administrador (Parametrização & Governança)"*
* Permite à banca testar todos os cenários e permissões de forma ágil e segura.

---

## 5. Estratégia de Verificação e Testes

1. **Testes Unitários e de Integração (Vitest)**:
   * Validador matemático de deduções e retenções tributárias.
   * Regras de alçada hierárquica e transição de estados de `invoices`.
   * Geração e formatação de manifesto CSV contábil.
2. **Testes de API e Ingestão**:
   * Mock da resposta do Gemini para garantir validação de contratos de saída JSON.
   * Validação de rejeição de arquivos $> 4\text{ MB}$ e formatos não-PDF.
3. **Verificação de Interface Ponta a Ponta**:
   * Subagente de navegador validando o fluxo de envio em `/upload`, conferência e transição no `/kanban`.
