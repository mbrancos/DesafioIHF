/**
 * Formata um valor inteiro em centavos para a moeda brasileira (BRL).
 * Exemplo: 100000 -> "R$ 1.000,00"
 */
export function formatBRL(centavos: number | null | undefined): string {
  const value = (centavos || 0) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Converte string formatada monetária ou decimal para número inteiro de centavos.
 * Exemplos: "R$ 1.000,00" -> 100000, "150,50" -> 15050, "100" -> 10000
 */
export function parseCentavos(value: string | number): number {
  if (typeof value === 'number') {
    return Math.round(value * 100);
  }

  if (!value) return 0;

  // Remove R$, espaços e pontos de milhar, substituindo vírgula por ponto
  const cleanStr = value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = parseFloat(cleanStr);
  return isNaN(parsed) ? 0 : Math.round(parsed * 100);
}

/**
 * Aplica máscara de CNPJ (00.000.000/0000-00) a uma string numérica.
 */
export function formatCNPJ(cnpj: string | null | undefined): string {
  if (!cnpj) return '';
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length !== 14) return cnpj;

  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

/**
 * Formata timestamp ISO para padrão legível no Brasil (DD/MM/AAAA HH:mm ou DD/MM/AAAA)
 */
export function formatDate(dateString: string | Date | null | undefined, includeTime = false): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' }),
  }).format(date);
}
