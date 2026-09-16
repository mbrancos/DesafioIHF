export interface KanbanColumnDef {
  id: 'TRIAGEM' | 'AGUARDANDO_APROVACAO' | 'RECUSADO' | 'AGENDADO_PAGAMENTO' | 'PAGO';
  title: string;
  description: string;
  color: string;
  bgHeader: string;
}

export const KANBAN_COLUMNS: KanbanColumnDef[] = [
  {
    id: 'TRIAGEM',
    title: 'Triagem & Divergências',
    description: 'Notas submetidas aguardando resolução fiscal',
    color: '#D97706',
    bgHeader: '#fef3c7',
  },
  {
    id: 'AGUARDANDO_APROVACAO',
    title: 'Aguardando Aprovação',
    description: 'Notas validadas aguardando deliberação de alçada',
    color: '#1c395c',
    bgHeader: '#e0f2fe',
  },
  {
    id: 'RECUSADO',
    title: 'Recusado / Devolvido',
    description: 'Faturas devolvidas com justificativa formal',
    color: '#DC2626',
    bgHeader: '#fee2e2',
  },
  {
    id: 'AGENDADO_PAGAMENTO',
    title: 'Agendado para Pagamento',
    description: 'Despesas autorizadas na fila de quitação',
    color: '#812926',
    bgHeader: '#fde2ce',
  },
  {
    id: 'PAGO',
    title: 'Pago & Liquidado',
    description: 'Pagamento efetuado com comprovante anexado',
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
