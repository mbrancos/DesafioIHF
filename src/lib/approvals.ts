/**
 * Regras de Governança e Alçadas Hierárquicas de Aprovação Financeira
 * Conforme especificação em docs/iHubFiscal.md e supabase/seed.sql
 */

export const APPROVAL_LIMITS = {
  GESTOR_MAX_CENTAVOS: 1000000, // R$ 10.000,00
  CFO_MAX_CENTAVOS: 1000000000, // R$ 10.000.000,00 (ilimitado operacional)
} as const;

export interface ApprovalCheckResult {
  canApprove: boolean;
  requiresCfo?: boolean;
  reason?: string;
}

/**
 * Avalia se o perfil do usuário possui alçada orçamentária suficiente para aprovar o valor líquido da fatura
 */
export function canUserApproveInvoice(
  role: 'analista' | 'gestor' | 'cfo' | 'admin' | string,
  amountLiquidoCentavos: number
): ApprovalCheckResult {
  // 1. Analista: não possui alçada deliberativa financeira
  if (role === 'analista') {
    return {
      canApprove: false,
      reason: 'Analistas realizam triagem e conferência técnica de retenções. A aprovação financeira requer alçada de Gestor ou CFO.',
    };
  }

  // 2. Gestor: alçada até R$ 10.000,00
  if (role === 'gestor') {
    if (amountLiquidoCentavos <= APPROVAL_LIMITS.GESTOR_MAX_CENTAVOS) {
      return {
        canApprove: true,
      };
    }
    return {
      canApprove: false,
      requiresCfo: true,
      reason: `Excede a alçada do gestor (limite de R$ 10.000,00). Esta fatura exige autorização extraordinária do CFO.`,
    };
  }

  // 3. CFO e Admin: alçada extraordinária
  if (role === 'cfo' || role === 'admin') {
    return {
      canApprove: true,
    };
  }

  return {
    canApprove: false,
    reason: 'Perfil de usuário não autorizado para deliberação financeira.',
  };
}
