'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { ZipGeneratorButton } from '@/components/closing/ZipGeneratorButton';
import { InvoiceClosingItem, checkAccountingPairing } from '@/lib/csv-manifest';
import { formatBRL } from '@/lib/formatters';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Building2,
  Calendar,
  Filter,
  ShieldCheck,
  ExternalLink,
  Search,
} from 'lucide-react';
import Link from 'next/link';

// Mock de faturas liquidadas com valores corporativos B2B realistas
const MOCK_CLOSING_INVOICES: InvoiceClosingItem[] = [
  {
    id: 'inv-close-1',
    protocol: 'IHF-2026-X812',
    invoice_number: '1420',
    issue_date: '2026-09-02T10:00:00.000Z',
    due_date: '2026-09-15T00:00:00.000Z',
    payment_date: '2026-09-14T14:30:00.000Z',
    amount_bruto: 800000, // R$ 8.000,00
    amount_liquido: 748000, // R$ 7.480,00
    iss: 20000, // R$ 200,00 (2.5%)
    irrf: 12000, // R$ 120,00 (1.5%)
    pis_cofins_csll: 20000, // R$ 200,00
    hash_sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    payment_proof_url: '/storage/payment-proofs/comprovante_pix_1420.pdf',
    supplier: {
      name: 'TechCloud Soluções em Nuvem LTDA',
      cnpj: '88.888.888/0001-88',
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
    id: 'inv-close-2',
    protocol: 'IHF-2026-C902',
    invoice_number: '3045',
    issue_date: '2026-09-05T09:15:00.000Z',
    due_date: '2026-09-20T00:00:00.000Z',
    payment_date: '2026-09-15T11:00:00.000Z',
    amount_bruto: 1425000, // R$ 14.250,00
    amount_liquido: 1289625, // R$ 12.896,25
    iss: 71250,
    irrf: 21375,
    pis_cofins_csll: 42750,
    hash_sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    payment_proof_url: '/storage/payment-proofs/comprovante_ted_3045.pdf',
    supplier: {
      name: 'Construtora & Engenharia Urbana LTDA',
      cnpj: '77.777.777/0001-77',
    },
    company: {
      trade_name: 'Impact Hub Floripa',
    },
    cost_center: {
      code: 'operacoes_coworking',
      name: 'Operações & Coworking',
    },
  },
  {
    id: 'inv-close-3',
    protocol: 'IHF-2026-M419',
    invoice_number: '891',
    issue_date: '2026-09-08T16:20:00.000Z',
    due_date: '2026-09-22T00:00:00.000Z',
    payment_date: '2026-09-15T16:00:00.000Z',
    amount_bruto: 395000, // R$ 3.950,00
    amount_liquido: 375250, // R$ 3.752,50
    iss: 7900,
    irrf: 5925,
    pis_cofins_csll: 5925,
    hash_sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    payment_proof_url: '/storage/payment-proofs/comprovante_pix_891.pdf',
    supplier: {
      name: 'Agência Criativa Marketing Digital LTDA',
      cnpj: '66.666.666/0001-66',
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

export default function FechamentoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2026-09');
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra as faturas pelo período, vertical e busca textual
  const filteredInvoices = useMemo(() => {
    return MOCK_CLOSING_INVOICES.filter((inv) => {
      const matchCompany =
        selectedCompany === 'ALL' || inv.company.trade_name === selectedCompany;
      const matchSearch =
        searchTerm === '' ||
        inv.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.invoice_number.includes(searchTerm) ||
        inv.protocol.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCompany && matchSearch;
    });
  }, [selectedCompany, searchTerm]);

  // Auditoria e métricas consolidadas
  const pairingResult = useMemo(
    () => checkAccountingPairing(filteredInvoices),
    [filteredInvoices]
  );

  const totalBruto = useMemo(
    () => filteredInvoices.reduce((acc, curr) => acc + curr.amount_bruto, 0),
    [filteredInvoices]
  );

  const totalLiquido = useMemo(
    () => filteredInvoices.reduce((acc, curr) => acc + curr.amount_liquido, 0),
    [filteredInvoices]
  );

  const totalRetencoes = totalBruto - totalLiquido;

  return (
    <div className="min-h-screen bg-ihf-bg-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho da Tela */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ihf-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-ihf-primary bg-ihf-primary/10 px-2.5 py-0.5 rounded-full">
                Fase 5 • Auditoria & Contabilidade Externa
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ihf-slate-900 font-heading">
              Fechamento Contábil Mensal
            </h1>
            <p className="text-sm text-ihf-slate-600 mt-1 max-w-2xl">
              Auditoria de pareamento 100% de notas e comprovantes, geração de manifesto fiscal CSV e
              compilação do pacote (.ZIP) no navegador via JSZip com zero custo de servidor.
            </p>
          </div>

          {/* Botão de Exportação com JSZip */}
          <ZipGeneratorButton
            invoices={filteredInvoices}
            periodLabel={selectedPeriod}
          />
        </div>

        {/* Barra de Filtros e Controles de Competência */}
        <div className="mt-6 bg-white p-4 rounded-xl border border-ihf-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Seletor de Competência */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ihf-slate-500" />
              <label className="text-xs font-semibold text-ihf-slate-700">Competência:</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-xs border border-ihf-slate-200 rounded-lg px-3 py-2 bg-ihf-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-ihf-primary"
              >
                <option value="2026-09">Setembro / 2026 (Atual)</option>
                <option value="2026-08">Agosto / 2026</option>
                <option value="2026-07">Julho / 2026</option>
              </select>
            </div>

            {/* Filtro de Vertical da Holding */}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-ihf-slate-500" />
              <label className="text-xs font-semibold text-ihf-slate-700">Vertical:</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="text-xs border border-ihf-slate-200 rounded-lg px-3 py-2 bg-ihf-slate-50 font-medium focus:outline-none focus:ring-2 focus:ring-ihf-primary"
              >
                <option value="ALL">Todas as Verticais</option>
                <option value="Impact Hub Floripa">Impact Hub Floripa</option>
                <option value="Instituto Salto">Instituto Salto</option>
                <option value="Impacta Mais">Impacta Mais</option>
                <option value="Seu PêJota">Seu PêJota</option>
              </select>
            </div>
          </div>

          {/* Busca textual */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-ihf-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por NF, fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-ihf-slate-200 focus:outline-none focus:ring-2 focus:ring-ihf-primary"
            />
          </div>
        </div>

        {/* Métricas e Indicadores da Competência */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-5 rounded-xl border border-ihf-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-ihf-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Liquidado</span>
              <Receipt className="w-5 h-5 text-ihf-primary" />
            </div>
            <div className="text-2xl font-bold text-ihf-slate-900 font-heading">
              {formatBRL(totalLiquido)}
            </div>
            <span className="text-xs text-ihf-slate-500 mt-1 block">
              {filteredInvoices.length} faturas no período
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-ihf-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-ihf-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Retenções Tributárias</span>
              <ShieldCheck className="w-5 h-5 text-ihf-cyan" />
            </div>
            <div className="text-2xl font-bold text-ihf-cyan font-heading">
              {formatBRL(totalRetencoes)}
            </div>
            <span className="text-xs text-ihf-slate-500 mt-1 block">
              ISS + IRRF + PIS/COFINS/CSLL
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-ihf-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-ihf-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Pareamento Contábil</span>
              {pairingResult.is100PercentPaired ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <div
              className={`text-2xl font-bold font-heading ${
                pairingResult.is100PercentPaired ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {pairingResult.total > 0
                ? `${Math.round((pairingResult.pairedCount / pairingResult.total) * 100)}%`
                : '100%'}
            </div>
            <span className="text-xs text-ihf-slate-500 mt-1 block">
              {pairingResult.pairedCount} de {pairingResult.total} faturas pareadas
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-ihf-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-ihf-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Status do Lote</span>
              <FileText className="w-5 h-5 text-ihf-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  pairingResult.is100PercentPaired
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {pairingResult.is100PercentPaired ? 'Pronto para Fechamento' : 'Aguardando Comprovantes'}
              </span>
            </div>
            <span className="text-xs text-ihf-slate-500 mt-2 block">
              Conformidade com a skill invoice-organizer
            </span>
          </div>
        </div>

        {/* Tabela de Auditoria das Faturas */}
        <div className="mt-8 bg-white rounded-xl border border-ihf-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-ihf-slate-200 flex items-center justify-between bg-ihf-slate-50/50">
            <h2 className="text-sm font-bold text-ihf-slate-900 uppercase tracking-wider">
              Lote de Faturas para Envio ao Contador ({filteredInvoices.length})
            </h2>
            <span className="text-xs text-ihf-slate-500">
              Arquivos nomeados e organizados por competência e fornecedor
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-ihf-slate-200 bg-ihf-slate-50 text-[11px] font-bold text-ihf-slate-600 uppercase tracking-wider">
                  <th className="px-6 py-3">Protocolo / NF</th>
                  <th className="px-6 py-3">Fornecedor & CNPJ</th>
                  <th className="px-6 py-3">Vertical & C. Custo</th>
                  <th className="px-6 py-3 text-right">Valor Bruto</th>
                  <th className="px-6 py-3 text-right">Retenções</th>
                  <th className="px-6 py-3 text-right">Valor Líquido</th>
                  <th className="px-6 py-3 text-center">Pareamento</th>
                  <th className="px-6 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ihf-slate-200 text-xs">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-ihf-slate-500">
                      Nenhuma fatura encontrada para os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => {
                    const hasProof = !!inv.payment_proof_url;
                    const retencoesItem =
                      inv.amount_bruto - inv.amount_liquido;

                    return (
                      <tr key={inv.id} className="hover:bg-ihf-slate-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-mono font-bold text-ihf-slate-900">
                            NF #{inv.invoice_number}
                          </div>
                          <div className="text-[11px] text-ihf-slate-500 font-mono">
                            {inv.protocol}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-semibold text-ihf-slate-900">{inv.supplier.name}</div>
                          <div className="text-[11px] text-ihf-slate-500">{inv.supplier.cnpj}</div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-ihf-slate-800">
                            {inv.company.trade_name}
                          </div>
                          <div className="text-[11px] text-ihf-slate-500">
                            {inv.cost_center?.name || 'Geral'}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right font-medium text-ihf-slate-600">
                          {formatBRL(inv.amount_bruto)}
                        </td>

                        <td className="px-6 py-4 text-right font-medium text-ihf-slate-500">
                          {formatBRL(retencoesItem)}
                        </td>

                        <td className="px-6 py-4 text-right font-bold text-ihf-slate-900">
                          {formatBRL(inv.amount_liquido)}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {hasProof ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Pareada
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Sem Comprovante
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <Link
                            href={`/notas/${inv.id}`}
                            className="inline-flex items-center gap-1 text-ihf-primary hover:text-ihf-primary-hover font-semibold transition-colors"
                          >
                            <span>Detalhes</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
