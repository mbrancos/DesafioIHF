import { describe, it, expect } from 'vitest';
import { canUserApproveInvoice } from '../../src/lib/approvals';

describe('Regras de Governança e Alçadas Hierárquicas de Aprovação', () => {
  const LIMITE_GESTOR_CENTAVOS = 1000000; // R$ 10.000,00

  it('analistas não devem ter permissão de aprovação financeira', () => {
    const result = canUserApproveInvoice('analista', 50000);
    expect(result.canApprove).toBe(false);
    expect(result.reason).toContain('Analistas realizam triagem e conferência');
  });

  it('gestores devem aprovar faturas dentro do limite da alçada de R$ 10.000,00', () => {
    // R$ 9.999,99
    const resAbaixo = canUserApproveInvoice('gestor', 999999);
    expect(resAbaixo.canApprove).toBe(true);

    // R$ 10.000,00 (no limite exato)
    const resExato = canUserApproveInvoice('gestor', LIMITE_GESTOR_CENTAVOS);
    expect(resExato.canApprove).toBe(true);
  });

  it('gestores devem ser BLOQUEADOS para faturas acima de R$ 10.000,00 com exigência expressa do CFO', () => {
    // R$ 10.000,01
    const resAcima = canUserApproveInvoice('gestor', 1000001);
    expect(resAcima.canApprove).toBe(false);
    expect(resAcima.requiresCfo).toBe(true);
    expect(resAcima.reason).toContain('Excede a alçada do gestor');
  });

  it('CFO e Admin devem ter alçada extraordinária para aprovar qualquer montante', () => {
    // Fatura alta de R$ 150.000,00
    const resCfo = canUserApproveInvoice('cfo', 15000000);
    expect(resCfo.canApprove).toBe(true);

    const resAdmin = canUserApproveInvoice('admin', 15000000);
    expect(resAdmin.canApprove).toBe(true);
  });
});
