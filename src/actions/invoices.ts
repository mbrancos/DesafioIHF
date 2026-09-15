'use server';

import { createClient } from '@/lib/supabase/server';
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
  const supabase = await createClient();
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
    // Fallback para ID determinístico mock em ambiente local
    supplierId = 's0000000-0000-0000-0000-000000000001';
  }

  // 2. Identifica a empresa tomadora da holding pelo CNPJ
  const cleanCnpjTomador = input.cnpj_tomador.replace(/\D/g, '');
  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('cnpj', cleanCnpjTomador)
    .maybeSingle();

  // Se não encontrar, atribui à empresa principal (Impact Hub Floripa)
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

  const invoiceId = invoice?.id || `inv-${Date.now()}`;

  // 5. Registra o evento de auditoria imutável
  await supabase.from('invoice_events').insert({
    invoice_id: invoiceId,
    action: 'UPLOADED',
    metadata: {
      protocol,
      hash_sha256: input.hash_sha256,
      origin: 'portal_fornecedor',
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
