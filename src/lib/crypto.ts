/**
 * Utilitário universal de cálculo de hash SHA-256 compatível com Node.js e Navegadores.
 */
export async function calculateSha256(data: ArrayBuffer | Uint8Array): Promise<string> {
  // 1. Tenta usar a Web Crypto API (disponível no browser moderno e no Node.js 18+)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data as ArrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // 2. Fallback para módulo nativo node:crypto se rodando em ambiente Node puro
  try {
    const nodeCrypto = await import('crypto');
    const u8Array = data instanceof Uint8Array ? data : new Uint8Array(data);
    const buffer = Buffer.from(u8Array);
    return nodeCrypto.createHash('sha256').update(buffer).digest('hex');
  } catch (error) {
    throw new Error('Ambiente de execução não suporta SHA-256 criptográfico.');
  }
}
