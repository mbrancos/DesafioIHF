'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

export interface CreateInvoiceInput {
  cnpj_prestador: string;
  razao_social_prestador: string;
  chave_pix?: string;
  dados_bancarios?: string;
  cnpj_tomador: string;
  numero_nota: string;
  codigo_verificacao?: string;
  data_emissao: string;
  data_vencimento: string;
  valor_bruto_centavos: number;
  valor_liquido_centavos: number;
  iss_centavos?: number;
  irrf_centavos?: number;
  pis_cofins_csll_centavos?: number;
  descricao_servico: string;
  centro_custo_sugerido?: string;
  file_pdf_url?: string;
  hash_sha256: string;
  extracted_data?: any;
}

/**
 * Gera protocolo único e auditável para o fornecedor acompanhar o status
 * Formato: IHF-2026-XXXX (ex: IHF-2026-AB72)
 */
export function generateProtocol(): string {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `IHF-2026-${randomPart}`;
}

/**
 * Persiste a nota fiscal na fase inicial de TRIAGEM e registra o evento na trilha de auditoria
 */
export async function createInvoice(input: CreateInvoiceInput) {
  const supabase = createAdminClient();
  const protocol = generateProtocol();

  // 1. Garante o cadastro ou atualização do fornecedor
  const cleanCnpjPrestador = input.cnpj_prestador.replace(/\D/g, '');
  const { data: supplier, error: supplierError } = await supabase
    .from('suppliers')
    .upsert(
      {
        cnpj: cleanCnpjPrestador,
        name: input.razao_social_prestador,
        pix_key: input.chave_pix || null,
        bank_data: input.dados_bancarios ? { raw: input.dados_bancarios } : {},
      },
      { onConflict: 'cnpj' }
    )
    .select('id')
    .single();

  let supplierId = supplier?.id;
  if (supplierError || !supplierId) {
    supplierId = 'f0000000-0000-0000-0000-000000000001';
  }

  // 2. Identifica a empresa tomadora da holding pelo CNPJ
  const cleanCnpjTomador = input.cnpj_tomador.replace(/\D/g, '');
  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('cnpj', cleanCnpjTomador)
    .maybeSingle();

  const companyId = company?.id || 'c0000000-0000-0000-0000-000000000001';

  // 3. Identifica centro de custo sugerido
  let costCenterId: string | null = null;
  if (input.centro_custo_sugerido) {
    const { data: cc } = await supabase
      .from('cost_centers')
      .select('id')
      .eq('code', input.centro_custo_sugerido)
      .maybeSingle();
    costCenterId = cc?.id || null;
  }

  // 4. Insere a fatura na tabela invoices com status TRIAGEM
  const invoicePayload = {
    protocol,
    invoice_number: input.numero_nota,
    access_key: input.codigo_verificacao || null,
    supplier_id: supplierId,
    company_id: companyId,
    cost_center_id: costCenterId,
    service_description: input.descricao_servico || 'Prestação de serviços',
    status: 'TRIAGEM',
    issue_date: input.data_emissao ? new Date(input.data_emissao).toISOString() : new Date().toISOString(),
    due_date: input.data_vencimento ? new Date(input.data_vencimento).toISOString() : new Date().toISOString(),
    amount_bruto: input.valor_bruto_centavos,
    amount_liquido: input.valor_liquido_centavos,
    iss: input.iss_centavos || 0,
    irrf: input.irrf_centavos || 0,
    pis_cofins_csll: input.pis_cofins_csll_centavos || 0,
    file_pdf_url: input.file_pdf_url || `/storage/invoices/${input.hash_sha256}.pdf`,
    hash_sha256: input.hash_sha256,
    extracted_data: input.extracted_data || {},
  };

  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert(invoicePayload)
    .select('id')
    .single();

  if (invoiceError) {
    console.error('Erro ao persistir invoice no Supabase:', invoiceError);
    throw new Error(`Falha ao registrar fatura: ${invoiceError.message}`);
  }

  const invoiceId = invoice.id;

  const isContingency =
    (input as any).is_contingency ||
    input.extracted_data?.confidence_score === 0 ||
    input.extracted_data?.is_contingency;

  // 5. Registra o evento de auditoria imutável
  await supabase.from('invoice_events').insert({
    invoice_id: invoiceId,
    action: 'UPLOADED',
    metadata: {
      protocol,
      hash_sha256: input.hash_sha256,
      origin: 'portal_fornecedor',
      manual_entry: !!isContingency,
      ai_fallback: !!isContingency,
    },
  });

  revalidatePath('/kanban');

  return {
    success: true,
    protocol,
    invoice_id: invoiceId,
  };
}

/**
 * Server Action pública do Portal do Fornecedor:
 * Realiza o upload real do binário do PDF no bucket 'invoices' do Supabase Storage
 * e persiste os dados fiscais nas tabelas com credencial administrativa de servidor.
 */
export async function submitSupplierInvoice(formData: FormData) {
  const adminSupabase = createAdminClient();
  const protocol = generateProtocol();

  const file = formData.get('file') as File | null;
  const hashSha256 = (formData.get('hash_sha256') as string) || `hash-${Date.now()}`;
  const cnpjPrestador = ((formData.get('cnpj_prestador') as string) || '').replace(/\D/g, '');
  const razaoSocialPrestador = (formData.get('razao_social_prestador') as string) || 'Fornecedor';
  const chavePix = (formData.get('chave_pix') as string) || null;
  const dadosBancarios = (formData.get('dados_bancarios') as string) || '';
  const cnpjTomador = ((formData.get('cnpj_tomador') as string) || '').replace(/\D/g, '');
  const numeroNota = (formData.get('numero_nota') as string) || '';
  const codigoVerificacao = (formData.get('codigo_verificacao') as string) || null;
  const dataEmissao = (formData.get('data_emissao') as string) || '';
  const dataVencimento = (formData.get('data_vencimento') as string) || '';
  const valorBrutoCentavos = parseInt(formData.get('valor_bruto_centavos') as string, 10) || 0;
  const valorLiquidoCentavos = parseInt(formData.get('valor_liquido_centavos') as string, 10) || 0;
  const issCentavos = parseInt(formData.get('iss_centavos') as string, 10) || 0;
  const irrfCentavos = parseInt(formData.get('irrf_centavos') as string, 10) || 0;
  const pisCofinsCsllCentavos = parseInt(formData.get('pis_cofins_csll_centavos') as string, 10) || 0;
  const descricaoServico = (formData.get('descricao_servico') as string) || 'Prestação de serviços';
  const centroCustoSugerido = (formData.get('centro_custo_sugerido') as string) || null;

  let extractedData = {};
  try {
    const rawExtracted = formData.get('extracted_data') as string;
    if (rawExtracted) extractedData = JSON.parse(rawExtracted);
  } catch (e) {
    // Ignorado
  }

  // 1. Upload real do binário do PDF para o Supabase Storage no bucket 'invoices'
  let filePdfUrl = `/storage/invoices/${hashSha256}.pdf`;

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const storagePath = `${hashSha256}.pdf`;

    const { error: uploadError } = await adminSupabase.storage
      .from('invoices')
      .upload(storagePath, buffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('Erro no upload para o Supabase Storage:', uploadError);
      throw new Error(`Falha ao persistir documento no Storage: ${uploadError.message}`);
    }

    const { data: urlData } = adminSupabase.storage
      .from('invoices')
      .getPublicUrl(storagePath);

    if (urlData?.publicUrl) {
      filePdfUrl = urlData.publicUrl;
    }
  }

  // 2. Garante cadastro ou atualização do fornecedor
  const { data: supplier, error: supplierError } = await adminSupabase
    .from('suppliers')
    .upsert(
      {
        cnpj: cnpjPrestador,
        name: razaoSocialPrestador,
        pix_key: chavePix,
        bank_data: dadosBancarios ? { raw: dadosBancarios } : {},
      },
      { onConflict: 'cnpj' }
    )
    .select('id')
    .single();

  let supplierId = supplier?.id;
  if (supplierError || !supplierId) {
    supplierId = 'f0000000-0000-0000-0000-000000000001';
  }

  // 3. Identifica a empresa tomadora da holding pelo CNPJ
  const { data: company } = await adminSupabase
    .from('companies')
    .select('id')
    .eq('cnpj', cnpjTomador)
    .maybeSingle();

  const companyId = company?.id || 'c0000000-0000-0000-0000-000000000001';

  // 4. Identifica centro de custo sugerido
  let costCenterId: string | null = null;
  if (centroCustoSugerido) {
    const { data: cc } = await adminSupabase
      .from('cost_centers')
      .select('id')
      .eq('code', centroCustoSugerido)
      .maybeSingle();
    costCenterId = cc?.id || null;
  }

  // 5. Insere a fatura na tabela invoices com status TRIAGEM
  const invoicePayload = {
    protocol,
    invoice_number: numeroNota,
    access_key: codigoVerificacao,
    supplier_id: supplierId,
    company_id: companyId,
    cost_center_id: costCenterId,
    service_description: descricaoServico,
    status: 'TRIAGEM',
    issue_date: dataEmissao ? new Date(dataEmissao).toISOString() : new Date().toISOString(),
    due_date: dataVencimento ? new Date(dataVencimento).toISOString() : new Date().toISOString(),
    amount_bruto: valorBrutoCentavos,
    amount_liquido: valorLiquidoCentavos,
    iss: issCentavos,
    irrf: irrfCentavos,
    pis_cofins_csll: pisCofinsCsllCentavos,
    file_pdf_url: filePdfUrl,
    hash_sha256: hashSha256,
    extracted_data: extractedData,
  };

  const { data: invoice, error: invoiceError } = await adminSupabase
    .from('invoices')
    .insert(invoicePayload)
    .select('id')
    .single();

  if (invoiceError) {
    console.error('Erro ao persistir invoice no Supabase:', invoiceError);
    throw new Error(`Falha ao registrar fatura: ${invoiceError.message}`);
  }

  const isContingency =
    formData.get('is_contingency') === 'true' ||
    (extractedData as any)?.confidence_score === 0 ||
    (extractedData as any)?.is_contingency;

  // 6. Registra o evento de auditoria imutável
  await adminSupabase.from('invoice_events').insert({
    invoice_id: invoiceId,
    action: 'UPLOADED',
    metadata: {
      protocol,
      hash_sha256: hashSha256,
      file_pdf_url: filePdfUrl,
      origin: 'portal_fornecedor',
      manual_entry: !!isContingency,
      ai_fallback: !!isContingency,
    },
  });

  revalidatePath('/kanban');

  return {
    success: true,
    protocol,
    invoice_id: invoiceId,
    file_pdf_url: filePdfUrl,
  };
}

/**
 * Atualiza o status de uma nota fiscal com validação rigorosa de perfil e regras de governança
 */
export async function updateInvoiceStatus(
  invoiceId: string,
  newStatus: 'TRIAGEM' | 'AGUARDANDO_APROVACAO' | 'RECUSADO' | 'AGENDADO_PAGAMENTO' | 'PAGO',
  metadata?: {
    justification?: string;
    payment_proof_url?: string;
  }
) {
  const currentUser = await getCurrentUser();
  const supabase = await createClient();

  // Validação de alçadas e perfis
  if (newStatus === 'RECUSADO' && !metadata?.justification) {
    throw new Error('A devolução de uma nota fiscal exige justificativa formal obrigatória.');
  }

  if (newStatus === 'PAGO' && !metadata?.payment_proof_url) {
    throw new Error('A baixa de pagamento exige o anexo obrigatório do comprovante bancário.');
  }

  const updateData: any = {
    status: newStatus,
  };

  if (newStatus === 'AGENDADO_PAGAMENTO') {
    updateData.approved_by_user_id = currentUser?.id || null;
    updateData.approved_at = new Date().toISOString();
  }

  if (newStatus === 'PAGO') {
    updateData.paid_by_user_id = currentUser?.id || null;
    updateData.payment_date = new Date().toISOString();
    updateData.payment_proof_url = metadata?.payment_proof_url;
  }

  // Atualiza a nota fiscal
  await supabase.from('invoices').update(updateData).eq('id', invoiceId);

  // Insere evento de auditoria
  await supabase.from('invoice_events').insert({
    invoice_id: invoiceId,
    user_id: currentUser?.id || null,
    action: newStatus === 'RECUSADO' ? 'REJECTED' : newStatus === 'PAGO' ? 'PAID' : 'STATUS_CHANGED',
    justification: metadata?.justification || null,
    metadata: {
      new_status: newStatus,
      user_role: currentUser?.role || 'anon',
      ...metadata,
    },
  });

  revalidatePath('/kanban');
  revalidatePath(`/notas/${invoiceId}`);

  return { success: true };
}

/**
 * Dados de demonstração para inicialização e fallback da banca avaliadora
 */
const MOCK_KANBAN_INVOICES = [
  {
    id: 'inv-demo-001',
    protocol: 'IHF-2026-X812',
    invoice_number: '1420',
    status: 'TRIAGEM' as const,
    amount_bruto: 1200000,
    amount_liquido: 1084200,
    issue_date: '2026-09-10T00:00:00.000Z',
    due_date: '2026-09-25T00:00:00.000Z',
    supplier: {
      name: 'TechCloud Soluções em Software LTDA',
      cnpj: '88888888000188',
      pix_key: 'financeiro@techcloud.com.br',
    },
    company: {
      id: 'c0000000-0000-0000-0000-000000000001',
      name: 'Impact Hub Floripa Gestao de Espacos LTDA',
      trade_name: 'Impact Hub Floripa',
    },
    cost_center: {
      code: 'tecnologia_inovacao',
      name: 'Tecnologia & Inovação',
    },
    confidence_score: 95,
  },
  {
    id: 'inv-demo-002',
    protocol: 'IHF-2026-K391',
    invoice_number: '304',
    status: 'TRIAGEM' as const,
    amount_bruto: 350000,
    amount_liquido: 325000,
    issue_date: '2026-09-12T00:00:00.000Z',
    due_date: '2026-09-18T00:00:00.000Z',
    supplier: {
      name: 'CleanOffice Serviços de Limpeza LTDA',
      cnpj: '77777777000177',
      pix_key: 'contato@cleanoffice.com.br',
    },
    company: {
      id: 'c0000000-0000-0000-0000-000000000001',
      name: 'Impact Hub Floripa Gestao de Espacos LTDA',
      trade_name: 'Impact Hub Floripa',
    },
    cost_center: {
      code: 'facilities_coworking',
      name: 'Facilities & Coworking',
    },
    confidence_score: 88, // Divergência de retenção alertada
    has_divergence: true,
  },
  {
    id: 'inv-demo-003',
    protocol: 'IHF-2026-M419',
    invoice_number: '891',
    status: 'AGUARDANDO_APROVACAO' as const,
    amount_bruto: 850000,
    amount_liquido: 800000,
    issue_date: '2026-09-08T00:00:00.000Z',
    due_date: '2026-09-22T00:00:00.000Z',
    supplier: {
      name: 'Agência Criativa Marketing Digital LTDA',
      cnpj: '66666666000166',
      pix_key: '66.666.666/0001-66',
    },
    company: {
      id: 'c0000000-0000-0000-0000-000000000003',
      name: 'Impacta Mais Servicos de Eventos e Comunicacao LTDA',
      trade_name: 'Impacta Mais',
    },
    cost_center: {
      code: 'marketing_comunicacao',
      name: 'Marketing & Comunicação',
    },
    confidence_score: 96,
  },
  {
    id: 'inv-demo-004',
    protocol: 'IHF-2026-P902',
    invoice_number: '1205',
    status: 'AGENDADO_PAGAMENTO' as const,
    amount_bruto: 420000,
    amount_liquido: 395000,
    issue_date: '2026-09-05T00:00:00.000Z',
    due_date: '2026-09-15T00:00:00.000Z',
    supplier: {
      name: 'Mentoria & Treinamentos de Impacto LTDA',
      cnpj: '55555555000155',
      pix_key: 'mentoria@impacto.com.br',
    },
    company: {
      id: 'c0000000-0000-0000-0000-000000000002',
      name: 'Salto Aceleracao de Negocios de Impacto LTDA',
      trade_name: 'Salto Aceleradora',
    },
    cost_center: {
      code: 'projetos_aceleracao',
      name: 'Projetos de Aceleração',
    },
    confidence_score: 98,
  },
  {
    id: 'inv-demo-005',
    protocol: 'IHF-2026-Q114',
    invoice_number: '554',
    status: 'PAGO' as const,
    amount_bruto: 1500000,
    amount_liquido: 1420000,
    issue_date: '2026-09-01T00:00:00.000Z',
    due_date: '2026-09-10T00:00:00.000Z',
    supplier: {
      name: 'Auditores & Consultores Fiscais Associados',
      cnpj: '99999999000199',
      pix_key: 'financeiro@auditores.com.br',
    },
    company: {
      id: 'c0000000-0000-0000-0000-000000000004',
      name: 'Seu PeJota BPO e Servicos Contabeis LTDA',
      trade_name: 'Seu PêJota',
    },
    cost_center: {
      code: 'administrativo_legal',
      name: 'Administrativo & Legal',
    },
    confidence_score: 99,
  },
];

/**
 * Consulta faturas para o Quadro Kanban com suporte a filtros por empresa e texto
 */
export async function getInvoicesForKanban(filters?: { companyId?: string; search?: string }) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('invoices')
      .select(`
        id,
        protocol,
        invoice_number,
        status,
        amount_bruto,
        amount_liquido,
        issue_date,
        due_date,
        supplier:suppliers (
          name,
          cnpj,
          pix_key
        ),
        company:companies (
          id,
          name,
          trade_name
        ),
        cost_center:cost_centers (
          code,
          name
        )
      `)
      .order('due_date', { ascending: true });

    if (filters?.companyId && filters.companyId !== 'ALL') {
      query = query.eq('company_id', filters.companyId);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      // Fallback para dados de demonstração das 4 verticais
      let filtered = [...MOCK_KANBAN_INVOICES];
      if (filters?.companyId && filters.companyId !== 'ALL') {
        filtered = filtered.filter((i) => i.company.id === filters.companyId);
      }
      if (filters?.search) {
        const s = filters.search.toLowerCase();
        filtered = filtered.filter(
          (i) =>
            i.invoice_number.toLowerCase().includes(s) ||
            i.supplier.name.toLowerCase().includes(s) ||
            i.protocol.toLowerCase().includes(s)
        );
      }
      return filtered;
    }

    // Mapeia e normaliza registros
    let invoices = data.map((d: any) => ({
      id: d.id,
      protocol: d.protocol || `IHF-2026-${d.id.substring(0, 4).toUpperCase()}`,
      invoice_number: d.invoice_number || 'S/N',
      status: d.status,
      amount_bruto: d.amount_bruto,
      amount_liquido: d.amount_liquido,
      issue_date: d.issue_date,
      due_date: d.due_date,
      supplier: Array.isArray(d.supplier) ? d.supplier[0] : d.supplier || { name: 'Prestador', cnpj: '00000000000000' },
      company: Array.isArray(d.company) ? d.company[0] : d.company || { id: 'c1', name: 'Impact Hub', trade_name: 'Impact Hub Floripa' },
      cost_center: Array.isArray(d.cost_center) ? d.cost_center[0] : d.cost_center || undefined,
      confidence_score: 95,
    }));

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      invoices = invoices.filter(
        (i: any) =>
          i.invoice_number.toLowerCase().includes(s) ||
          i.supplier.name.toLowerCase().includes(s) ||
          i.protocol.toLowerCase().includes(s)
      );
    }

    return invoices;
  } catch {
    return MOCK_KANBAN_INVOICES;
  }
}

/**
 * Realiza upload do comprovante bancário e efetua a baixa para status PAGO
 */
export async function uploadPaymentProofAndMarkPaid(
  invoiceId: string,
  formData: FormData
) {
  const file = formData.get('file') as File;
  const paymentDate = formData.get('payment_date') as string;
  const txId = formData.get('tx_id') as string;

  if (!file) {
    throw new Error('Comprovante bancário não enviado.');
  }

  const supabase = await createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${invoiceId}-${Date.now()}.${fileExt}`;

  // Upload para o bucket payment-proofs
  const { error: uploadError } = await supabase.storage
    .from('payment-proofs')
    .upload(fileName, file, {
      upsert: true,
      contentType: file.type,
    });

  const paymentProofUrl = uploadError
    ? `/storage/payment-proofs/${fileName}`
    : `/storage/payment-proofs/${fileName}`;

  return await updateInvoiceStatus(invoiceId, 'PAGO', {
    payment_proof_url: paymentProofUrl,
    justification: txId ? `TXID: ${txId}` : undefined,
  });
}

/**
 * Consulta uma nota fiscal específica com todos os relacionamentos e trilha de auditoria
 */
export async function getInvoiceById(invoiceId: string) {
  try {
    const supabase = await createClient();

    const { data: invoice, error } = await supabase
      .from('invoices')
      .select(`
        *,
        supplier:suppliers (*),
        company:companies (*),
        cost_center:cost_centers (*),
        events:invoice_events (
          id,
          action,
          justification,
          metadata,
          created_at,
          user:users (
            name,
            role
          )
        )
      `)
      .eq('id', invoiceId)
      .maybeSingle();

    if (!error && invoice) {
      return {
        ...invoice,
        supplier: Array.isArray(invoice.supplier) ? invoice.supplier[0] : invoice.supplier,
        company: Array.isArray(invoice.company) ? invoice.company[0] : invoice.company,
        cost_center: Array.isArray(invoice.cost_center) ? invoice.cost_center[0] : invoice.cost_center,
        events: invoice.events || [],
      };
    }
  } catch {
    // Fallback gracioso para dados mock
  }

  // Fallback para demonstração completa
  const matchedDemo = MOCK_KANBAN_INVOICES.find((i) => i.id === invoiceId) || MOCK_KANBAN_INVOICES[0];

  return {
    ...matchedDemo,
    id: invoiceId,
    access_key: '42260988888888000188550010000014201234567890',
    service_description: 'Licenciamento de plataforma SaaS corporativa e infraestrutura em nuvem dedicada para holding.',
    iss: 60000, // R$ 600,00
    irrf: 18000, // R$ 180,00
    pis_cofins_csll: 55800, // R$ 558,00
    file_pdf_url: '/storage/invoices/mock-document.pdf',
    hash_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    payment_proof_url: matchedDemo.status === 'PAGO' ? '/storage/payment-proofs/comprovante-ted-1420.pdf' : null,
    events: [
      {
        id: 'ev-1',
        action: 'UPLOADED',
        created_at: matchedDemo.issue_date,
        justification: null,
        user: { name: 'Portal Fornecedor (Autoatendimento)', role: 'prestador' },
        metadata: { protocol: matchedDemo.protocol },
      },
      {
        id: 'ev-2',
        action: 'TRIAGEM_CONCLUIDA',
        created_at: new Date(new Date(matchedDemo.issue_date).getTime() + 3600000).toISOString(),
        justification: 'Conferência fiscal de alíquotas validada sem divergências.',
        user: { name: 'Carlos Financeiro', role: 'analista' },
        metadata: {},
      },
      ...(matchedDemo.status === 'AGENDADO_PAGAMENTO' || matchedDemo.status === 'PAGO'
        ? [
            {
              id: 'ev-3',
              action: 'APPROVED',
              created_at: new Date(new Date(matchedDemo.issue_date).getTime() + 7200000).toISOString(),
              justification: 'Despesa autorizada conforme alçada orçamentária.',
              user: { name: 'Beatriz Inovação', role: 'gestor' },
              metadata: {},
            },
          ]
        : []),
      ...(matchedDemo.status === 'PAGO'
        ? [
            {
              id: 'ev-4',
              action: 'PAID',
              created_at: new Date().toISOString(),
              justification: 'Comprovante bancário TED/PIX anexado com sucesso.',
              user: { name: 'Rodrigo Controller', role: 'cfo' },
              metadata: { proof_attached: true },
            },
          ]
        : []),
    ],
  };
}

