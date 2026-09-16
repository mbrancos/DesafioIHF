import { describe, it, expect } from 'vitest';
import { calculateSha256 } from '../../src/lib/crypto';
import { validateTaxMath } from '../../src/lib/math';
import { formatBRL, formatCNPJ, parseCentavos } from '../../src/lib/formatters';

describe('Utilitários Centrais: Matemática Fiscal, Hashing e Formatadores', () => {
  describe('Cálculo de Hash SHA-256 (crypto.ts)', () => {
    it('deve gerar hash SHA-256 hexadecimal correto para um buffer', async () => {
      const text = 'iHubFiscal-2026';
      const buffer = new TextEncoder().encode(text).buffer;
      const hash = await calculateSha256(buffer);

      expect(typeof hash).toBe('string');
      expect(hash.length).toBe(64); // 64 caracteres hex
      expect(/^[0-9a-f]{64}$/i.test(hash)).toBe(true);
    });
  });

  describe('Validação Matemática Tributária (math.ts)', () => {
    it('deve validar consistência exata quando Líquido = Bruto - Retenções', () => {
      // Bruto: R$ 1.000,00 (100000 centavos)
      // ISS: R$ 50,00 (5000 centavos)
      // IRRF: R$ 15,00 (1500 centavos)
      // Federais: R$ 46,50 (4650 centavos)
      // Líquido esperado: 100000 - 11150 = 88850 centavos
      const result = validateTaxMath({
        amount_bruto: 100000,
        amount_liquido: 88850,
        iss: 5000,
        irrf: 1500,
        pis_cofins_csll: 4650,
      });

      expect(result.isValid).toBe(true);
      expect(result.divergenceCentavos).toBe(0);
      expect(result.expectedLiquidoCentavos).toBe(88850);
    });

    it('deve tolerar divergências de arredondamento de até R$ 0,02 (2 centavos)', () => {
      // 1 centavo de diferença
      const res1 = validateTaxMath({
        amount_bruto: 100000,
        amount_liquido: 88851,
        iss: 5000,
        irrf: 1500,
        pis_cofins_csll: 4650,
      });
      expect(res1.isValid).toBe(true);
      expect(res1.divergenceCentavos).toBe(1);

      // 2 centavos de diferença
      const res2 = validateTaxMath({
        amount_bruto: 100000,
        amount_liquido: 88848,
        iss: 5000,
        irrf: 1500,
        pis_cofins_csll: 4650,
      });
      expect(res2.isValid).toBe(true);
      expect(res2.divergenceCentavos).toBe(2);
    });

    it('deve invalidar quando a divergência for superior a R$ 0,02', () => {
      const res = validateTaxMath({
        amount_bruto: 100000,
        amount_liquido: 88800, // Diferença de R$ 0,50 (50 centavos)
        iss: 5000,
        irrf: 1500,
        pis_cofins_csll: 4650,
      });
      expect(res.isValid).toBe(false);
      expect(res.divergenceCentavos).toBe(50);
    });
  });

  describe('Formatadores Oficiais (formatters.ts)', () => {
    it('deve formatar centavos para padrão de Real brasileiro', () => {
      expect(formatBRL(100000)).toMatch(/R\$\s*1\.000,00/);
      expect(formatBRL(0)).toMatch(/R\$\s*0,00/);
      expect(formatBRL(4650)).toMatch(/R\$\s*46,50/);
    });

    it('deve formatar CNPJ com pontuação correta', () => {
      expect(formatCNPJ('11111111000111')).toBe('11.111.111/0001-11');
      expect(formatCNPJ('88888888000188')).toBe('88.888.888/0001-88');
    });

    it('deve converter string monetária em centavos inteiros', () => {
      expect(parseCentavos('R$ 1.000,00')).toBe(100000);
      expect(parseCentavos('150,50')).toBe(15050);
    });
  });
});
