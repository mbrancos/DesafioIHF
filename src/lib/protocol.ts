/**
 * Utilitário de geração de protocolos fiscais do iHubFiscal
 * Formato: IHF-2026-XXXX (ex: IHF-2026-AB72)
 */
export function generateProtocol(): string {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `IHF-2026-${randomPart}`;
}
