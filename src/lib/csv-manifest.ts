/**
 * Utilitário de Geração de Manifesto CSV e Auditoria de Pareamento Contábil
 * Alinhado às diretrizes da skill invoice-organizer
 */

export interface InvoiceClosingItem {
  id: string;
  protocol: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  payment_date?: string | null;
  amount_bruto: number;
  amount_liquido: number;
  iss?: number;
  irrf?: number;
  pis_cofins_csll?: number;
  hash_sha256?: string;
  payment_proof_url?: string | null;
  supplier: {
    name: string;
    cnpj: string;
  };
  company: {
    trade_name: string;
  };
  cost_center?: {
    code: string;
    name: string;
  };
}

export interface PairingCheckResult {
  total: number;
  pairedCount: number;
  unpairedCount: number;
  is100PercentPaired: boolean;
  unpairedInvoices: InvoiceClosingItem[];
}

/**
 * Sanitiza o nome de fornecedores/empresas para nomes de arquivo padronizados
 * Ex: "TechCloud Soluções em Software LTDA" -> "techcloud-solucoes-em-software"
 */
export function sanitizeFileSlug(name: string): string {
  if (!name) return 'documento';

  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .replace(/\b(ltda|s\/a|sa|me|epp|eireli)\b/g, '') // Remove tipos societários redundantes no slug
    .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres não alfanuméricos por hífen
    .replace(/^-+|-+$/g, ''); // Remove hífens nas bordas
}

/**
 * Verifica o pareamento de faturas (todas as notas selecionadas devem possuir comprovante)
 */
export function checkAccountingPairing(invoices: InvoiceClosingItem[]): PairingCheckResult {
  const total = invoices.length;
  const unpairedInvoices = invoices.filter(
    (i) => !i.payment_proof_url || i.payment_proof_url.trim() === ''
  );
  const unpairedCount = unpairedInvoices.length;
  const pairedCount = total - unpairedCount;

  return {
    total,
    pairedCount,
    unpairedCount,
    is100PercentPaired: total > 0 && unpairedCount === 0,
    unpairedInvoices,
  };
}

/**
 * Formata valor em centavos para representação decimal brasileira (ex: 12000,00)
 */
function formatDecimalBr(centavos?: number): string {
  if (centavos === undefined || isNaN(centavos)) return '0,00';
  return (centavos / 100).toFixed(2).replace('.', ',');
}

/**
 * Gera o manifesto contábil em CSV (delimitador ponto e vírgula, compatível com ERPs e Excel BR)
 */
export function generateCsvManifest(invoices: InvoiceClosingItem[]): string {
  const headers = [
    'Protocolo',
    'Nota',
    'Prestador',
    'CNPJ',
    'Emissao',
    'Vencimento',
    'Pagamento',
    'Valor_Bruto',
    'ISS',
    'IRRF',
    'Federais',
    'Valor_Liquido',
    'Empresa',
    'Centro_Custo',
    'Comprovante_Anexado',
    'Hash_SHA256',
  ];

  const rows = invoices.map((inv) => {
    const hasProof = inv.payment_proof_url && inv.payment_proof_url.trim() !== '' ? 'SIM' : 'NAO';
    const cleanCnpj = inv.supplier.cnpj.replace(/\D/g, '');

    return [
      inv.protocol,
      inv.invoice_number,
      `"${inv.supplier.name.replace(/"/g, '""')}"`,
      cleanCnpj,
      inv.issue_date ? new Date(inv.issue_date).toLocaleDateString('pt-BR') : '',
      inv.due_date ? new Date(inv.due_date).toLocaleDateString('pt-BR') : '',
      inv.payment_date ? new Date(inv.payment_date).toLocaleDateString('pt-BR') : 'PENDENTE',
      formatDecimalBr(inv.amount_bruto),
      formatDecimalBr(inv.iss || 0),
      formatDecimalBr(inv.irrf || 0),
      formatDecimalBr(inv.pis_cofins_csll || 0),
      formatDecimalBr(inv.amount_liquido),
      `"${inv.company.trade_name}"`,
      `"${inv.cost_center?.name || 'Geral'}"`,
      hasProof,
      inv.hash_sha256 || '',
    ].join(';');
  });

  // Prefixo BOM (\uFEFF) para garantir que o Excel no Windows abra com acentuação correta
  return '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
}
