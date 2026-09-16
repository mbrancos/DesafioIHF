import { describe, it, expect } from 'vitest';
import { shouldInterceptTransition, KANBAN_COLUMNS, calculateColumnTotals } from '../../src/components/kanban/kanban-utils';

describe('Quadro Kanban com @dnd-kit e Modais de Interceptação', () => {
  it('deve conter as 6 colunas operacionais com a adição da fase Agendado e tooltips', () => {
    expect(KANBAN_COLUMNS).toHaveLength(6);
    const ids = KANBAN_COLUMNS.map((c) => c.id);
    expect(ids).toEqual([
      'TRIAGEM',
      'AGUARDANDO_APROVACAO',
      'RECUSADO',
      'AGENDADO_PAGAMENTO',
      'AGENDADO',
      'PAGO',
    ]);

    // Valida que todas as colunas possuem tooltip informativo
    KANBAN_COLUMNS.forEach((col) => {
      expect(col.tooltip).toBeDefined();
      expect(col.tooltip.length).toBeGreaterThan(10);
    });

    // Valida renomeação do título de Agendar Pagamento
    const agendarCol = KANBAN_COLUMNS.find((c) => c.id === 'AGENDADO_PAGAMENTO');
    expect(agendarCol?.title).toBe('Agendar Pagamento');

    const agendadoCol = KANBAN_COLUMNS.find((c) => c.id === 'AGENDADO');
    expect(agendadoCol?.title).toBe('Agendado');
  });

  describe('Lógica de Interceptação no onDragEnd', () => {
    it('deve interceptar soltura na coluna RECUSADO para exigir modal de justificativa', () => {
      const decision = shouldInterceptTransition('RECUSADO');
      expect(decision).toBe('REJECT_MODAL');
    });

    it('deve interceptar soltura na coluna PAGO para exigir modal de comprovante', () => {
      const decision = shouldInterceptTransition('PAGO');
      expect(decision).toBe('PAYMENT_MODAL');
    });

    it('deve autorizar movimentação direta otimista para fases regulares', () => {
      expect(shouldInterceptTransition('AGUARDANDO_APROVACAO')).toBe('DIRECT');
      expect(shouldInterceptTransition('AGENDADO_PAGAMENTO')).toBe('DIRECT');
      expect(shouldInterceptTransition('AGENDADO')).toBe('DIRECT');
      expect(shouldInterceptTransition('TRIAGEM')).toBe('DIRECT');
    });
  });

  describe('Cálculo de Somatórios por Fase', () => {
    it('deve totalizar corretamente quantidade de notas e valor em centavos por coluna', () => {
      const mockInvoices = [
        { id: '1', status: 'TRIAGEM', amount_liquido: 10000 },
        { id: '2', status: 'TRIAGEM', amount_liquido: 25000 },
        { id: '3', status: 'AGUARDANDO_APROVACAO', amount_liquido: 50000 },
        { id: '4', status: 'PAGO', amount_liquido: 80000 },
      ];

      const totals = calculateColumnTotals(mockInvoices as any);
      expect(totals.TRIAGEM.count).toBe(2);
      expect(totals.TRIAGEM.totalCentavos).toBe(35000);

      expect(totals.AGUARDANDO_APROVACAO.count).toBe(1);
      expect(totals.AGUARDANDO_APROVACAO.totalCentavos).toBe(50000);

      expect(totals.RECUSADO.count).toBe(0);
      expect(totals.RECUSADO.totalCentavos).toBe(0);

      expect(totals.PAGO.count).toBe(1);
      expect(totals.PAGO.totalCentavos).toBe(80000);
    });
  });
});
