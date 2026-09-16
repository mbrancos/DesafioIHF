import { describe, it, expect } from 'vitest';
import { generateCsvManifest, checkAccountingPairing, sanitizeFileSlug } from '../../src/lib/csv-manifest';

describe('Fechamento Contábil: Manifesto CSV, Pareamento e Nomenclatura Padronizada', () => {
  const mockInvoices = [
    {
      id: 'inv-1',
      protocol: 'IHF-2026-X812',
      invoice_number: '1420',
      issue_date: '2026-09-10T00:00:00.000Z',
      due_date: '2026-09-25T00:00:00.000Z',
      payment_date: '2026-09-15T00:00:00.000Z',
      amount_bruto: 1200000,
      amount_liquido: 1084200,
      iss: 60000,
      irrf: 18000,
      pis_cofins_csll: 55800,
      hash_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      payment_proof_url: '/storage/payment-proofs/comprovante-1420.pdf',
      supplier: {
        name: 'TechCloud Soluções em Software LTDA',
        cnpj: '88888888000188',
      },
      company: {
        trade_name: 'Impact Hub Floripa',
      },
      cost_center: {
        code: 'tecnologia_inovacao',
        name: 'Tecnologia & Inovação',
      },
    },
    {
      id: 'inv-2',
      protocol: 'IHF-2026-M419',
      invoice_number: '891',
      issue_date: '2026-09-08T00:00:00.000Z',
      due_date: '2026-09-22T00:00:00.000Z',
      payment_date: null,
      amount_bruto: 850000,
      amount_liquido: 800000,
      iss: 0,
      irrf: 0,
      pis_cofins_csll: 50000,
      hash_sha256: 'abcd1234efgh5678',
      payment_proof_url: null, // Sem comprovante
      supplier: {
        name: 'Agência Criativa Marketing Digital LTDA',
        cnpj: '66666666000166',
      },
      company: {
        trade_name: 'Impacta Mais',
      },
      cost_center: {
        code: 'marketing_comunicacao',
        name: 'Marketing & Comunicação',
      },
    },
  ];

  describe('Sanitização e Nomenclatura Padronizada (invoice-organizer)', () => {
    it('deve sanitizar o nome da empresa para slugs seguros sem acentos ou caracteres especiais', () => {
      expect(sanitizeFileSlug('TechCloud Soluções em Software LTDA')).toBe('techcloud-solucoes-em-software');
      expect(sanitizeFileSlug('Agência Criativa & Eventos!')).toBe('agencia-criativa-eventos');
    });
  });

  describe('Verificação de Pareamento Contábil', () => {
    it('deve identificar faturas sem comprovante anexado para bloqueio ou alerta de fechamento', () => {
      const pairing = checkAccountingPairing(mockInvoices as any);
      expect(pairing.total).toBe(2);
      expect(pairing.pairedCount).toBe(1);
      expect(pairing.unpairedCount).toBe(1);
      expect(pairing.is100PercentPaired).toBe(false);
      expect(pairing.unpairedInvoices[0].invoice_number).toBe('891');
    });
  });

  describe('Geração de Manifesto CSV', () => {
    it('deve gerar o CSV com cabeçalho fiscal em ponto e vírgula e decimais em vírgula', () => {
      const csv = generateCsvManifest(mockInvoices as any);
      expect(csv).toContain('Protocolo;Nota;Prestador;CNPJ;Emissao;Vencimento;Pagamento;Valor_Bruto;ISS;IRRF;Federais;Valor_Liquido;Empresa;Centro_Custo;Comprovante_Anexado;Hash_SHA256');
      expect(csv).toContain('IHF-2026-X812;1420;"TechCloud Soluções em Software LTDA";88888888000188');
      expect(csv).toContain('12000,00'); // R$ 12.000,00 formatado para Excel BR
      expect(csv).toContain('SIM'); // Comprovante anexado
      expect(csv).toContain('NAO'); // Sem comprovante
    });
  });
});
