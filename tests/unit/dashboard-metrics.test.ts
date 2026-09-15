import { describe, it, expect } from 'vitest';
import { calculateDashboardMetrics } from '../../src/lib/dashboard-metrics';

describe('Cálculo de Métricas Consolidadas para o Dashboard Executivo da Holding', () => {
  const mockInvoices = [
    {
      id: '1',
      status: 'PAGO',
      amount_bruto: 1000000,
      amount_liquido: 900000,
      confidence_score: 95,
      company: { id: 'c1', trade_name: 'Impact Hub Floripa' },
      cost_center: { code: 'tecnologia_inovacao', name: 'Tecnologia & Inovação' },
    },
    {
      id: '2',
      status: 'AGENDADO_PAGAMENTO',
      amount_bruto: 500000,
      amount_liquido: 450000,
      confidence_score: 90,
      company: { id: 'c1', trade_name: 'Impact Hub Floripa' },
      cost_center: { code: 'facilities_coworking', name: 'Facilities & Coworking' },
    },
    {
      id: '3',
      status: 'AGUARDANDO_APROVACAO',
      amount_bruto: 800000,
      amount_liquido: 750000,
      confidence_score: 98,
      company: { id: 'c2', trade_name: 'Salto Aceleradora' },
      cost_center: { code: 'projetos_aceleracao', name: 'Projetos de Aceleração' },
    },
    {
      id: '4',
      status: 'TRIAGEM',
      amount_bruto: 300000,
      amount_liquido: 280000,
      confidence_score: 85,
      company: { id: 'c3', trade_name: 'Impacta Mais' },
      cost_center: { code: 'marketing_comunicacao', name: 'Marketing & Comunicação' },
    },
  ];

  it('deve totalizar o passivo circulante (todas as fases ativas não liquidadas)', () => {
    const metrics = calculateDashboardMetrics(mockInvoices as any);
    // Não liquidadas: 450.000 + 750.000 + 280.000 = 1.480.000 centavos
    expect(metrics.totalPassivoCirculanteCentavos).toBe(1480000);
    // Total liquidado (PAGO): 900.000 centavos
    expect(metrics.totalLiquidadoCentavos).toBe(900000);
  });

  it('deve segmentar corretamente volumes e contagens pelas 4 verticais da holding', () => {
    const metrics = calculateDashboardMetrics(mockInvoices as any);
    expect(metrics.byCompany['Impact Hub Floripa'].count).toBe(2);
    expect(metrics.byCompany['Impact Hub Floripa'].totalLiquidoCentavos).toBe(1350000);

    expect(metrics.byCompany['Salto Aceleradora'].count).toBe(1);
    expect(metrics.byCompany['Salto Aceleradora'].totalLiquidoCentavos).toBe(750000);

    expect(metrics.byCompany['Impacta Mais'].count).toBe(1);
    expect(metrics.byCompany['Impacta Mais'].totalLiquidoCentavos).toBe(280000);

    expect(metrics.byCompany['Seu PêJota'].count).toBe(0);
  });

  it('deve calcular a média de acurácia da IA multimodal', () => {
    const metrics = calculateDashboardMetrics(mockInvoices as any);
    // (95 + 90 + 98 + 85) / 4 = 368 / 4 = 92%
    expect(metrics.averageConfidenceScore).toBe(92);
  });
});
