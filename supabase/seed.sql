-- ==============================================================================
-- iHubFiscal v2: Dados Iniciais (Seed) para Testes e Demonstração da Banca
-- ==============================================================================

-- 1. Empresas da Holding Companhia de Impacto
INSERT INTO public.companies (id, name, trade_name, cnpj)
VALUES 
    ('c0000000-0000-0000-0000-000000000001', 'Impact Hub Floripa Gestao de Espacos LTDA', 'Impact Hub Floripa', '11111111000111'),
    ('c0000000-0000-0000-0000-000000000002', 'Salto Aceleracao de Negocios de Impacto LTDA', 'Salto Aceleradora', '22222222000122'),
    ('c0000000-0000-0000-0000-000000000003', 'Impacta Mais Servicos de Eventos e Comunicacao LTDA', 'Impacta Mais', '33333333000133'),
    ('c0000000-0000-0000-0000-000000000004', 'Seu PeJota BPO e Servicos Contabeis LTDA', 'Seu PêJota', '44444444000144')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    trade_name = EXCLUDED.trade_name,
    cnpj = EXCLUDED.cnpj;

-- 2. Catálogo Taxonômico dos 6 Centros de Custo
INSERT INTO public.cost_centers (id, code, name, company_id)
VALUES
    ('d0000000-0000-0000-0000-000000000001', 'tecnologia_inovacao', 'Tecnologia & Inovação (Cloud, Licenças e Dev)', 'c0000000-0000-0000-0000-000000000001'),
    ('d0000000-0000-0000-0000-000000000002', 'facilities_coworking', 'Facilities & Coworking (Manutenção, Insumos e Limpeza)', 'c0000000-0000-0000-0000-000000000001'),
    ('d0000000-0000-0000-0000-000000000003', 'marketing_comunicacao', 'Marketing & Comunicação (Branding, Anúncios e Mídia)', 'c0000000-0000-0000-0000-000000000003'),
    ('d0000000-0000-0000-0000-000000000004', 'eventos_producao', 'Eventos & Produção (Sonorização, Palco e Transmissão)', 'c0000000-0000-0000-0000-000000000003'),
    ('d0000000-0000-0000-0000-000000000005', 'projetos_aceleracao', 'Projetos de Aceleração (Mentorias e Oficinas de Impacto)', 'c0000000-0000-0000-0000-000000000002'),
    ('d0000000-0000-0000-0000-000000000006', 'administrativo_legal', 'Administrativo & Legal (Honorários, Contabilidade e Cartório)', 'c0000000-0000-0000-0000-000000000004')
ON CONFLICT (code) DO UPDATE SET 
    name = EXCLUDED.name,
    company_id = EXCLUDED.company_id;

-- 3. Usuários Internos com as 4 Personas de Teste
INSERT INTO public.users (id, name, email, role, company_id)
VALUES
    ('u0000000-0000-0000-0000-000000000001', 'Carlos Financeiro', 'analista@impacthub.net', 'analista', 'c0000000-0000-0000-0000-000000000001'),
    ('u0000000-0000-0000-0000-000000000002', 'Beatriz Inovação', 'gestor@impacthub.net', 'gestor', 'c0000000-0000-0000-0000-000000000001'),
    ('u0000000-0000-0000-0000-000000000003', 'Rodrigo Controller', 'cfo@impacthub.net', 'cfo', 'c0000000-0000-0000-0000-000000000001'),
    ('u0000000-0000-0000-0000-000000000004', 'Mariana Admin', 'admin@impacthub.net', 'admin', 'c0000000-0000-0000-0000-000000000001')
ON CONFLICT (email) DO UPDATE SET 
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    company_id = EXCLUDED.company_id;

-- 4. Alçadas Hierárquicas de Aprovação
INSERT INTO public.approval_levels (id, level, max_amount, approver_user_id, company_id)
VALUES
    -- Gestor aprova até R$ 10.000,00 (1.000.000 centavos)
    ('a0000000-0000-0000-0000-000000000001', 1, 1000000, 'u0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001'),
    -- CFO possui alçada extraordinária ilimitada (R$ 10.000.000,00)
    ('a0000000-0000-0000-0000-000000000002', 2, 1000000000, 'u0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO UPDATE SET
    max_amount = EXCLUDED.max_amount,
    approver_user_id = EXCLUDED.approver_user_id;

-- 5. Fornecedor Piloto Mock
INSERT INTO public.suppliers (id, cnpj, name, pix_key, bank_data)
VALUES
    ('s0000000-0000-0000-0000-000000000001', '88888888000188', 'TechCloud Solucoes em Software LTDA', 'financeiro@techcloud.com.br', '{"banco": "Banco Inter (077)", "agencia": "0001", "conta": "1234567-8"}'::jsonb)
ON CONFLICT (cnpj) DO UPDATE SET 
    name = EXCLUDED.name,
    pix_key = EXCLUDED.pix_key,
    bank_data = EXCLUDED.bank_data;
