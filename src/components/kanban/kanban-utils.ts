export interface KanbanColumnDef {
  id: 'TRIAGEM' | 'AGUARDANDO_APROVACAO' | 'RECUSADO' | 'AGENDADO_PAGAMENTO' | 'AGENDADO' | 'PAGO';
  title: string;
  description: string;
  tooltip: string;
  color: string;
  bgHeader: string;
}

export const KANBAN_COLUMNS: KanbanColumnDef[] = [
  {
    id: 'TRIAGEM',
    title: 'Triagem & Divergências',
    description: 'Notas submetidas aguardando resolução fiscal',
    tooltip: 'Notas fiscais submetidas aguardando conferência humana de retenções municipais e federais.',
    color: '#D97706',
    bgHeader: '#fef3c7',
  },
  {
    id: 'AGUARDANDO_APROVACAO',
    title: 'Aguardando Aprovação',
    description: 'Notas validadas aguardando deliberação de alçada',
    tooltip: 'Notas fiscais validadas pelo fiscal aguardando deliberação técnica do Gestor (até R$ 10.000) ou CFO.',
    color: '#1c395c',
    bgHeader: '#e0f2fe',
  },
  {
    id: 'RECUSADO',
    title: 'Recusado / Devolvido',
    description: 'Faturas devolvidas com justificativa formal',
    tooltip: 'Faturas rejeitadas com justificativa formal registrada e devolvidas ao fornecedor para correção.',
    color: '#DC2626',
    bgHeader: '#fee2e2',
  },
  {
    id: 'AGENDADO_PAGAMENTO',
    title: 'Agendar Pagamento',
    description: 'Despesas autorizadas para inclusão no banco',
    tooltip: 'Despesas 100% aprovadas pela gestão, prontas para programação no internet banking.',
    color: '#812926',
    bgHeader: '#fde2ce',
  },
  {
    id: 'AGENDADO',
    title: 'Agendado',
    description: 'Programado no banco, aguardando data de débito',
    tooltip: 'Pagamento já programado no banco, onde o card aguarda a data de débito para realização da baixa com comprovante.',
    color: '#6D28D9',
    bgHeader: '#ede9fe',
  },
  {
    id: 'PAGO',
    title: 'Pago & Liquidado',
    description: 'Pagamento efetuado com comprovante anexado',
    tooltip: 'Pagamento efetuado e liquidado no banco, com anexo obrigatório de comprovante bancário.',
    color: '#16A34A',
    bgHeader: '#dcfce7',
  },
];

export type TransitionDecision = 'DIRECT' | 'REJECT_MODAL' | 'PAYMENT_MODAL';

/**
 * Intercepta o evento onDragEnd do @dnd-kit para exigir modal quando necessário:
 * - RECUSADO exige modal de justificativa
 * - PAGO exige modal de anexo do comprovante bancário
 */
export function shouldInterceptTransition(destinationStatus: string): TransitionDecision {
  if (destinationStatus === 'RECUSADO') {
    return 'REJECT_MODAL';
  }
  if (destinationStatus === 'PAGO') {
    return 'PAYMENT_MODAL';
  }
  return 'DIRECT';
}

export interface ColumnTotals {
  count: number;
  totalCentavos: number;
}

/**
 * Calcula totalizador financeiro e volumétrico por coluna do Kanban
 */
export function calculateColumnTotals(
  invoices: Array<{ status: string; amount_liquido: number }>
): Record<string, ColumnTotals> {
  const initial: Record<string, ColumnTotals> = {
    TRIAGEM: { count: 0, totalCentavos: 0 },
    AGUARDANDO_APROVACAO: { count: 0, totalCentavos: 0 },
    RECUSADO: { count: 0, totalCentavos: 0 },
    AGENDADO_PAGAMENTO: { count: 0, totalCentavos: 0 },
    AGENDADO: { count: 0, totalCentavos: 0 },
    PAGO: { count: 0, totalCentavos: 0 },
  };

  if (!invoices || !Array.isArray(invoices)) return initial;

  return invoices.reduce((acc, inv) => {
    if (acc[inv.status]) {
      acc[inv.status].count += 1;
      acc[inv.status].totalCentavos += inv.amount_liquido || 0;
    }
    return acc;
  }, initial);
}
