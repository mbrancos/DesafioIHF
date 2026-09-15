export interface TaxValidationParams {
  amount_bruto: number; // centavos
  amount_liquido: number; // centavos
  iss?: number; // centavos
  irrf?: number; // centavos
  pis_cofins_csll?: number; // centavos
}

export interface TaxValidationResult {
  isValid: boolean;
  divergenceCentavos: number;
  expectedLiquidoCentavos: number;
  totalRetencoesCentavos: number;
}

/**
 * Valida a consistência matemática da nota fiscal:
 * Líquido = Bruto - (ISS + IRRF + PIS/COFINS/CSLL)
 * Tolerância máxima de até R$ 0,02 (2 centavos) para absorver dízimas e arredondamentos fiscais.
 */
export function validateTaxMath(params: TaxValidationParams): TaxValidationResult {
  const bruto = Math.max(0, Math.round(params.amount_bruto || 0));
  const liquido = Math.max(0, Math.round(params.amount_liquido || 0));
  const iss = Math.max(0, Math.round(params.iss || 0));
  const irrf = Math.max(0, Math.round(params.irrf || 0));
  const federais = Math.max(0, Math.round(params.pis_cofins_csll || 0));

  const totalRetencoes = iss + irrf + federais;
  const expectedLiquido = Math.max(0, bruto - totalRetencoes);
  const divergence = Math.abs(liquido - expectedLiquido);

  return {
    isValid: divergence <= 2,
    divergenceCentavos: divergence,
    expectedLiquidoCentavos: expectedLiquido,
    totalRetencoesCentavos: totalRetencoes,
  };
}
