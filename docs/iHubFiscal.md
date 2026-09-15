# iHubFiscal

## Objetivo

Central inteligente de contas a pagar e governança fiscal da holding Companhia de Impacto, que centraliza a recepção de notas fiscais, automatiza a extração de dados via IA multimodal com conferência humana e orquestra aprovações por alçada, pagamentos e fechamento contábil com auditoria completa.

---

## Constantes e Enums do Sistema

### Fases do Ciclo de Vida (`status` em `invoices`)
- `TRIAGEM`: Nota submetida aguardando resolução de divergências fiscais na tela interna de conferência.
- `AGUARDANDO_APROVACAO`: Nota validada aguardando deliberação de alçada do gestor responsável.
- `RECUSADO`: Despesa devolvida pelo gestor com justificativa obrigatória.
- `AGENDADO_PAGAMENTO`: Nota aprovada posicionada na fila de liquidação do financeiro.
- `PAGO`: Pagamento executado com comprovante bancário vinculado.

### Taxonomia de Centros de Custo (`cost_center_enum`)
- `tecnologia_inovacao`: Licenças, software, infraestrutura cloud e automações.
- `facilities_coworking`: Manutenção de espaços físicos, internet, limpeza e insumos.
- `marketing_comunicacao`: Identidade visual, mídia, eventos corporativos e redação.
- `eventos_producao`: Locação de som, luz, palcos e transmissões de congressos.
- `projetos_aceleracao`: Metodologias de aceleração, mentorias e oficinas de impacto.
- `administrativo_legal`: Honorários advocatícios, contabilidade e custas notariais.

---

## Telas

### Autenticação

**Rota:** `/`

**Objetivo:** Autenticar usuários internos da holding com controle de acesso por perfil (analista, gestor e CFO).

**Componentes:**
- **Logo iHubFiscal**
- **Input E-mail Corporativo**
- **Input Senha**
- **Botão Entrar**: Autentica o usuário e redireciona para `/kanban` conforme perfil.
- **Link Esqueci Minha Senha**: Abre o fluxo de recuperação por e-mail.
- **Banner de Autoatendimento do Fornecedor**: Link destacado no rodapé *"É fornecedor? Envie sua NFS-e por aqui"* redirecionando para `/upload`.

### Portal do Fornecedor (Wizard de Envio e Validação)

**Rota:** `/upload`

**Objetivo:** Permitir ao fornecedor externo subir o documento e validar os dados lidos pela IA em autoatendimento, sem login.

**Fluxo de 2 Etapas:**
1. **Etapa 1 — Recepção do Arquivo:**
   - **Card Instruções de Envio**
   - **Input Upload PDF da Nota Fiscal (Obrigatório)**
   - **Input Upload XML (Opcional)**
   - **Botão Processar Documento**: Gera hash SHA-256 e aciona o pipeline de extração via IA.
2. **Etapa 2 — Conferência Assistida (Split-View em Tela):**
   - **Visualizador do PDF Original (Lado Esquerdo)**
   - **Formulário de Conferência e Ajuste (Lado Direito)**: Campos pré-preenchidos pela IA (CNPJ do Tomador, Prestador, Valores, Retenções e Vencimento) editáveis em tempo real.
   - **Input Chave Pix / Dados Bancários**: Validação da conta para recebimento.
   - **Validador Matemático Visual**: Alerta dinâmico `Valor Líquido = Valor Bruto - Deduções`.
   - **Botão Confirmar e Emitir Protocolo**: Persiste a nota no banco de dados e gera comprovante de submissão.
   - **Alerta de Protocolo de Recebimento**: Exibe o identificador único para acompanhamento do pagamento.

### Pipeline Kanban

**Rota:** `/kanban`

**Objetivo:** Visualizar e movimentar as notas fiscais pelas 5 fases operacionais em tempo real.

**Componentes:**
- **Quadro Kanban de 5 Colunas**: Mapeado estritamente para `TRIAGEM`, `AGUARDANDO_APROVACAO`, `RECUSADO`, `AGENDADO_PAGAMENTO` e `PAGO`.
- **Card da Nota Fiscal**: Exibe tomador (badge por vertical), prestador, valor líquido, vencimento e atalho para `/notas/:id`.
- **Input Busca e Filtros**: Filtro por vertical da holding, prestador, centro de custo e intervalo de datas.
- **Badge Totalizador por Fase**: Somatório financeiro e contagem de notas por coluna.
- **Botão Mover Card**: Transição de estados com validação de regras de conformidade.

### Conferência Interna Human-in-the-Loop (Exceções e Triagem)

**Rota:** `/conferencia/:id`

**Objetivo:** Tela interna restrita ao Analista Financeiro para auditar e corrigir notas enviadas por e-mail ou retidas com inconsistência fiscal.

**Componentes:**
- **Visualizador do PDF Original**
- **Painel de Campos Extraídos**
- **Indicador de Confiança Cromática**: Destaque verde para leitura precisa e amarelo pulsante para dados inconclusivos.
- **Alerta de Validação Matemática**: Indicador de divergência entre valor bruto, retenções e valor líquido com tolerância de até R$ 0,02.
- **Badge Classificação Automática**: Identificação da vertical da holding e centro de custo sugerido.
- **Botão Confirmar e Persistir**: Aprova a consistência dos dados e encaminha para `AGUARDANDO_APROVACAO`.
- **Botão Reprocessar com IA**: Executa nova extração caso o arquivo exija releitura multimodal.

### Central de Aprovações

**Rota:** `/aprovacoes`

**Objetivo:** Concentrar notas pendentes de validação técnica do gestor da vertical contratante.

**Componentes:**
- **Lista de Pendências de Aprovação**
- **Badge Limite de Alçada**: Sinaliza se o documento está dentro da alçada do gestor logado.
- **Botão Aprovar**: Altera status para `AGENDADO_PAGAMENTO` e notifica o time financeiro.
- **Botão Devolver com Justificativa**: Exige preenchimento de justificativa formal, transita para `RECUSADO` e envia alerta automático ao prestador.
- **Card Notificação Acionável**: Suporte a links profundos para decisão direta via e-mail corporativo.

### Fila de Pagamentos

**Rota:** `/pagamentos`

**Objetivo:** Organizar a fila de faturas autorizadas para quitação bancária.

**Componentes:**
- **Tabela de Notas Agendadas**
- **Botão Copiar Chave Pix e Dados Bancários**: Cópia com 1 clique para a área de transferência.
- **Input Anexo do Comprovante**: Upload obrigatório do comprovante bancário (PDF/PNG).
- **Botão Registrar Baixa de Pagamento**: Transita a nota para `PAGO` mediante upload do comprovante.
- **Alerta de Vencimentos Próximos**: Destaque visual para pagamentos a vencer em até 48 horas.

### Detalhe e Auditoria da Nota

**Rota:** `/notas/:id`

**Objetivo:** Consulta detalhada, histórico imutável e auditoria de conformidade contábil.

**Componentes:**
- **Painel de Dados Fiscais e Tributários**
- **Linha do Tempo de Auditoria**: Eventos de envio, extração, aprovações e pagamentos.
- **Botão Baixar PDF e XML**: Acesso aos binários originais via URLs assinadas do Object Storage.
- **Card Comprovante de Pagamento**: Visualizador do recibo de baixa.
- **Badge Hash de Idempotência**: Exibição do SHA-256 do arquivo original.

### Dashboard Executivo

**Rota:** `/dashboard`

**Objetivo:** Fornecer à diretoria financeira e CFO visão consolidada do passivo circulante das 4 verticais.

**Componentes:**
- **Gráfico de Fluxo de Caixa Consolidado**
- **Indicadores por Vertical**: Gráficos individuais (Impact Hub, Salto, Impacta Mais e Seu PêJota).
- **Widget Notas por Fase**: Distribuição volumétrica no funil operacional.
- **Filtro de Período**: Seleção por competência fiscal ou intervalo customizado.
- **Botão Exportar Relatório**: Emissão de relatórios em PDF ou XLSX.

### Fechamento Contábil

**Rota:** `/fechamento`

**Objetivo:** Consolidar e gerar o pacote mensal de repasse para o BPO contábil.

**Componentes:**
- **Select Mês de Competência**
- **Tabela de Conferência do Lote**: Lista de faturas com seus comprovantes vinculados.
- **Indicador de Pareamento**: Bloqueio de exportação caso existam notas sem comprovante de baixa.
- **Botão Gerar Pacote .ZIP**: Agrupa em memória PDFs de notas fiscais e comprovantes bancários pareados.
- **Botão Baixar Fechamento**: Download do arquivo compilado para a contabilidade.

### Configurações

**Rota:** `/configuracoes`

**Objetivo:** Gestão de parâmetros institucionais, governança corporativa e regras operacionais.

**Componentes:**
- **Lista de Empresas da Holding**: Cadastro de CNPJs, nomes empresariais e gestores.
- **Gestão da Taxonomia de Centros de Custo**: Manutenção do catálogo restrito de categorias.
- **Configuração de Alçadas de Aprovação**: Tetos orçamentários por perfil e alçadas extraordinárias.
- **Gestão de Usuários e Permissões**: Manutenção de contas e papéis (analista, gestor, CFO).
- **Preferências de Notificação**: Canais de alerta para rotinas e lembretes de vencimento.
- *(Nota de Arquitetura: Credenciais de LLM e chaves de API residem no servidor via variáveis de ambiente `.env` e credenciais nativas do n8n, não expostas na interface)*.

---

## Personas

### Administrador do Sistema
Responsável pela sustentação e parametrização do **iHubFiscal**. Gerencia empresas da holding, contas internas, alçadas e taxonomia de custos. Possui privilégios totais de configuração.

**User Stories:**
- Como Administrador, quero cadastrar as empresas da holding com seus respectivos CNPJs para garantir o roteamento correto das despesas.
- Como Administrador, quero configurar tetos de alçada para aprovação para garantir conformidade corporativa.
- Como Administrador, quero gerenciar perfis de acesso garantindo isolamento entre gestores e financeiro.

### Analista Financeiro
Responsável pela operação diária de contas a pagar. Realiza a triagem de exceções, programa pagamentos, efetua baixas com comprovante bancário e gera lotes contábeis.

**User Stories:**
- Como Analista Financeiro, quero auditar notas com pendências matemáticas na tela interna `/conferencia/:id` para corrigir falhas de retenção.
- Como Analista Financeiro, quero copiar a chave Pix do prestador com um clique para agilizar a transferência bancária.
- Como Analista Financeiro, quero anexar o comprovante bancário na baixa para garantir conformidade no fechamento mensal.
- Como Analista Financeiro, quero filtrar notas no Kanban por vertical para balancear o fluxo de caixa.

### Gestor de Aprovações
Líder da vertical responsável pela contratação do serviço prestado. Atua na validação técnica do escopo e liberação do pagamento.

**User Stories:**
- Como Gestor de Aprovações, quero visualizar notas fiscais emitidas contra meu centro de custo para validar se o serviço foi entregue.
- Como Gestor de Aprovações, quero aprovar faturas dentro da minha alçada para cumprir prazos de vencimento.
- Como Gestor de Aprovações, quero devolver notas incorretas com justificativa formal obrigatória para notificar o fornecedor.

### CFO / Controller
Liderança financeira da holding. Responsável pela governança consolidada, aprovação de despesas extraordinárias e conformidade contábil.

**User Stories:**
- Como CFO, quero exportar o lote mensal em `.zip` contendo todas as notas fiscais pareadas aos seus comprovantes de pagamento para auditoria contábil.
- Como CFO, quero auditar a trilha imutável de eventos de uma despesa para assegurar a rastreabilidade das alçadas.
- Como CFO, quero aprovar despesas que ultrapassem o teto orçamentário dos gestores de área.

### Fornecedor PJ (Usuário Externo)
Prestador de serviço externo PJ ou MEI emitente de cobrança contra a holding.

**User Stories:**
- Como Fornecedor, quero enviar minha NFS-e em PDF via portal web sem precisar de login prévio.
- Como Fornecedor, quero conferir e ajustar os dados lidos pela IA em tela dividida antes do envio definitivo para evitar reprovações.
- Como Fornecedor, quero cadastrar minha chave Pix diretamente no envio da nota para garantir o recebimento no destino correto.
- Como Fornecedor, quero receber protocolo de confirmação e alertas detalhados em caso de devolução para providenciar correção imediata.

---

## Banco de Dados (PostgreSQL / Relacional)

### companies
Empresas da holding e suas respectivas verticais de negócio.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | pk (uuid) | Identificador único |
| `name` | text | Razão social da empresa |
| `trade_name` | text | Nome fantasia da vertical (Impact Hub, Salto, etc.) |
| `cnpj` | text (unique) | CNPJ sem máscara da empresa da holding |

### cost_centers
Catálogo taxinômico de centros de custo.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | pk (uuid) | Identificador único |
| `code` | text (unique) | Slug estrito da categoria |
| `name` | text | Nome descritivo da categoria |
| `company_id` | fk -> `companies.id` | Vínculo opcional por empresa |

### users
Usuários autenticados internos da holding.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | pk (uuid) | Identificador único |
| `name` | text | Nome completo do colaborador |
| `email` | text (unique) | E-mail corporativo |
| `role` | text | Perfil de acesso (`analista`, `gestor`, `cfo`, `admin`) |
| `company_id` | fk -> `companies.id` | Vínculo com a empresa primária |

### suppliers
Fornecedores PJ e autônomos cadastrados no ecossistema.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | pk (uuid) | Identificador único |
| `cnpj` | text (unique) | CNPJ do prestador emissor |
| `name` | text | Razão social ou nome civil completo |
| `pix_key` | text | Chave Pix cadastrada para pagamentos |
| `bank_data` | jsonb | Informações bancárias complementares |

### approval_levels
Regras de alçada para aprovação hierárquica.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | pk (uuid) | Identificador único |
| `level` | integer | Nível hierárquico da alçada |
| `max_amount` | integer | Teto máximo autorizado em centavos de Real |
| `approver_user_id`| fk -> `users.id` | Usuário designado para a alçada |
| `company_id` | fk -> `companies.id` | Empresa da holding associada |

### invoices
Faturas fiscais de serviços e controle do ciclo de contas a pagar.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | pk (uuid) | Identificador único da fatura |
| `protocol` | text (unique) | Protocolo gerado no envio (ex: `IHF-2026-0001`) |
| `invoice_number` | text | Número oficial da NFS-e emitido pela prefeitura |
| `access_key` | text | Chave de autenticidade / código de verificação |
| `supplier_id` | fk -> `suppliers.id` | Fornecedor emissor da cobrança |
| `company_id` | fk -> `companies.id` | Empresa tomadora do serviço na holding |
| `cost_center_id` | fk -> `cost_centers.id`| Centro de custo classificado |
| `service_description` | text | Descrição resumida da prestação de serviços |
| `status` | text | Enum estrito da fase (`TRIAGEM`, etc.) |
| `issue_date` | timestamp | Data oficial de emissão da nota |
| `due_date` | timestamp | Data de vencimento da fatura |
| `payment_date` | timestamp (nullable) | Data em que a liquidação bancária ocorreu |
| `amount_bruto` | integer | Valor bruto da nota em centavos |
| `amount_liquido` | integer | Valor líquido a pagar em centavos |
| `iss` | integer | Retenção de ISS em centavos |
| `irrf` | integer | Retenção de IRRF em centavos |
| `pis_cofins_csll` | integer | Retenções federais agrupadas em centavos |
| `file_pdf_url` | text | URL assinada do PDF no Object Storage |
| `file_xml_url` | text (nullable) | URL assinada do XML no Object Storage |
| `payment_proof_url`| text (nullable) | URL assinada do comprovante de pagamento |
| `hash_sha256` | text | Assinatura criptográfica do binário do PDF |
| `extracted_data` | jsonb | Payload completo extraído pelo modelo de IA |
| `assigned_approver_id`| fk -> `users.id` | Gestor designado para autorizar o valor |
| `approved_by_user_id` | fk -> `users.id` (nullable) | Gestor que efetivamente aprovou a nota |
| `approved_at` | timestamp (nullable) | Data e hora do aceite de aprovação |
| `paid_by_user_id` | fk -> `users.id` (nullable) | Analista que efetuou a baixa com comprovante |
| `created_at` | timestamp | Registro de criação (default: `now()`) |

*Constraint de Idempotência:* `UNIQUE (supplier_id, invoice_number)` para prevenir lançamentos fiscais em duplicidade.

### invoice_events
Trilha de auditoria imutável dos eventos do ciclo de vida.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | pk (uuid) | Identificador único do evento |
| `invoice_id` | fk -> `invoices.id` | Fatura vinculada |
| `user_id` | fk -> `users.id` (nullable)| Usuário autor da ação (nulo para eventos de IA/Portal público) |
| `action` | text | Ação (`UPLOADED`, `EXTRACTED`, `APPROVED`, `REJECTED`, `PAID`) |
| `justification` | text (nullable) | Motivo obrigatório preenchido em caso de recusa |
| `metadata` | jsonb | Metadados complementares do evento |
| `created_at` | timestamp | Carimbo temporal do evento (default: `now()`) |

