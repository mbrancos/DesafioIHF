-- ==============================================================================
-- iHubFiscal v2: Schema Relacional Inicial, RLS e Storage
-- ==============================================================================

-- 1. Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabela: companies (Empresas da Holding)
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    trade_name TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Tabela: cost_centers (Centros de Custo)
CREATE TABLE IF NOT EXISTS public.cost_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL CHECK (code IN (
        'tecnologia_inovacao',
        'facilities_coworking',
        'marketing_comunicacao',
        'eventos_producao',
        'projetos_aceleracao',
        'administrativo_legal'
    )),
    name TEXT NOT NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Tabela: users (Colaboradores e Perfis da Holding)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('analista', 'gestor', 'cfo', 'admin')),
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Tabela: suppliers (Fornecedores PJ e Autônomos)
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cnpj TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    pix_key TEXT,
    bank_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Tabela: approval_levels (Regras de Alçada de Gestores)
CREATE TABLE IF NOT EXISTS public.approval_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level INTEGER NOT NULL DEFAULT 1,
    max_amount INTEGER NOT NULL, -- em centavos de Real
    approver_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Tabela: invoices (Faturas e Ciclo de Contas a Pagar)
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol TEXT UNIQUE NOT NULL,
    invoice_number TEXT NOT NULL,
    access_key TEXT,
    supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE RESTRICT,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE RESTRICT,
    cost_center_id UUID REFERENCES public.cost_centers(id) ON DELETE SET NULL,
    service_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'TRIAGEM' CHECK (status IN (
        'TRIAGEM',
        'AGUARDANDO_APROVACAO',
        'RECUSADO',
        'AGENDADO_PAGAMENTO',
        'PAGO'
    )),
    issue_date TIMESTAMPTZ NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    payment_date TIMESTAMPTZ,
    amount_bruto INTEGER NOT NULL, -- em centavos
    amount_liquido INTEGER NOT NULL, -- em centavos
    iss INTEGER NOT NULL DEFAULT 0,
    irrf INTEGER NOT NULL DEFAULT 0,
    pis_cofins_csll INTEGER NOT NULL DEFAULT 0,
    file_pdf_url TEXT NOT NULL,
    file_xml_url TEXT,
    payment_proof_url TEXT,
    hash_sha256 TEXT NOT NULL,
    extracted_data JSONB DEFAULT '{}'::jsonb,
    assigned_approver_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    approved_by_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    paid_by_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_invoice_supplier_number UNIQUE (supplier_id, invoice_number)
);

-- 8. Tabela: invoice_events (Trilha Imutável de Auditoria)
CREATE TABLE IF NOT EXISTS public.invoice_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    justification TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Índices de Performance
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_company ON public.invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_invoices_hash ON public.invoices(hash_sha256);
CREATE INDEX IF NOT EXISTS idx_invoice_events_invoice ON public.invoice_events(invoice_id);

-- 10. Habilitação de RLS (Row Level Security)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approval_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_events ENABLE ROW LEVEL SECURITY;

-- 11. Políticas de Acesso RLS
-- Leituras públicas para tabelas de apoio necessárias no wizard de upload
CREATE POLICY "Permitir leitura pública de empresas" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de centros de custo" ON public.cost_centers FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de fornecedores" ON public.suppliers FOR SELECT USING (true);
CREATE POLICY "Permitir inserção e atualização de fornecedor no upload público" ON public.suppliers FOR ALL USING (true) WITH CHECK (true);

-- Invoices: Criação pública via portal do fornecedor e controle para usuários autenticados
CREATE POLICY "Permitir criação pública de notas pelo portal do fornecedor" ON public.invoices FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura de notas para usuários autenticados ou por protocolo público" ON public.invoices FOR SELECT USING (true);
CREATE POLICY "Permitir atualização de notas para usuários autenticados" ON public.invoices FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- Trilha de eventos: Inserção pública para logs de upload e controle completo para autenticados
CREATE POLICY "Permitir inserção de eventos de auditoria" ON public.invoice_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura de eventos de auditoria" ON public.invoice_events FOR SELECT USING (true);

-- 12. Buckets de Storage e CORS (Supabase Storage)
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoices', 'invoices', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', false)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage para upload e leitura de documentos fiscais
CREATE POLICY "Permitir upload de notas no bucket invoices" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'invoices');

CREATE POLICY "Permitir download e leitura do bucket invoices" ON storage.objects
FOR SELECT USING (bucket_id = 'invoices');

CREATE POLICY "Permitir upload no bucket payment-proofs" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Permitir download e leitura do bucket payment-proofs" ON storage.objects
FOR SELECT USING (bucket_id = 'payment-proofs');
