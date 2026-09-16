/**
 * Utilitário de agregação de métricas executivas para o Dashboard da Holding Companhia de Impacto
 */

export interface CompanyMetric {
  count: number;
  totalLiquidoCentavos: number;
}

export interface DashboardMetrics {
  totalPassivoCirculanteCentavos: number;
  totalLiquidadoCentavos: number;
  averageConfidenceScore: number;
  byCompany: Record<string, CompanyMetric>;
  byStatus: Record<string, number>;
  byCostCenter: Record<string, number>;
}

export function calculateDashboardMetrics(
  invoices: Array<{
    status: string;
    amount_bruto: number;
    amount_liquido: number;
    confidence_score?: number;
    company: { trade_name: string };
    cost_center?: { name: string };
  }>
): DashboardMetrics {
  const initialCompanies: Record<string, CompanyMetric> = {
    'Impact Hub Floripa': { count: 0, totalLiquidoCentavos: 0 },
    'Salto Aceleradora': { count: 0, totalLiquidoCentavos: 0 },
    'Impacta Mais': { count: 0, totalLiquidoCentavos: 0 },
    'Seu PêJota': { count: 0, totalLiquidoCentavos: 0 },
  };

  const initialStatus: Record<string, number> = {
    TRIAGEM: 0,
    AGUARDANDO_APROVACAO: 0,
    RECUSADO: 0,
    AGENDADO_PAGAMENTO: 0,
    PAGO: 0,
  };

  const byCostCenter: Record<string, number> = {};

  let totalPassivoCirculanteCentavos = 0;
  let totalLiquidadoCentavos = 0;
  let sumConfidence = 0;
  let countConfidence = 0;

  invoices.forEach((inv) => {
    // 1. Agregação por Empresa
    const companyName = inv.company?.trade_name;
    if (companyName && initialCompanies[companyName]) {
      initialCompanies[companyName].count += 1;
      initialCompanies[companyName].totalLiquidoCentavos += inv.amount_liquido || 0;
    }

    // 2. Agregação por Fase do Ciclo de Vida
    if (initialStatus[inv.status] !== undefined) {
      initialStatus[inv.status] += 1;
    }

    // 3. Passivo Circulante vs Liquidado
    if (inv.status === 'PAGO') {
      totalLiquidadoCentavos += inv.amount_liquido || 0;
    } else if (inv.status !== 'RECUSADO') {
      // Passivo ativo não liquidado
      totalPassivoCirculanteCentavos += inv.amount_liquido || 0;
    }

    // 4. Confiança da IA
    if (inv.confidence_score !== undefined) {
      sumConfidence += inv.confidence_score;
      countConfidence += 1;
    }

    // 5. Centros de Custo
    if (inv.cost_center?.name) {
      byCostCenter[inv.cost_center.name] =
        (byCostCenter[inv.cost_center.name] || 0) + (inv.amount_liquido || 0);
    }
  });

  const averageConfidenceScore =
    countConfidence > 0 ? Math.round(sumConfidence / countConfidence) : 95;

  return {
    totalPassivoCirculanteCentavos,
    totalLiquidadoCentavos,
    averageConfidenceScore,
    byCompany: initialCompanies,
    byStatus: initialStatus,
    byCostCenter,
  };
}
