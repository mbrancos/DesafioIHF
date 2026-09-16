'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { RejectModal } from '@/components/kanban/RejectModal';
import { updateInvoiceStatus } from '@/actions/invoices';
import { validateTaxMath } from '@/lib/math';
import { formatBRL, formatCNPJ } from '@/lib/formatters';
import {
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Building,
  Calendar,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

interface ConferenceFormProps {
  invoice: any;
  userRole: string;
}

export const ConferenceForm: React.FC<ConferenceFormProps> = ({
  invoice,
  userRole,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estados de edição pelo analista
  const [valorBruto, setValorBruto] = useState<number>(invoice.amount_bruto / 100);
  const [valorLiquido, setValorLiquido] = useState<number>(invoice.amount_liquido / 100);
  const [iss, setIss] = useState<number>((invoice.iss || 0) / 100);
  const [irrf, setIrrf] = useState<number>((invoice.irrf || 0) / 100);
  const [pisCofinsCsll, setPisCofinsCsll] = useState<number>(
    (invoice.pis_cofins_csll || 0) / 100
  );
  const [dueDate, setDueDate] = useState<string>(
    invoice.due_date ? invoice.due_date.split('T')[0] : ''
  );
  const [costCenterCode, setCostCenterCode] = useState<string>(
    invoice.cost_center?.code || 'tecnologia_inovacao'
  );

  // Validação matemática contínua
  const mathValidation = validateTaxMath({
    amount_bruto: Math.round(valorBruto * 100),
    amount_liquido: Math.round(valorLiquido * 100),
    iss: Math.round(iss * 100),
    irrf: Math.round(irrf * 100),
    pis_cofins_csll: Math.round(pisCofinsCsll * 100),
  });

  const handleApproveTechnical = () => {
    startTransition(async () => {
      try {
        setErrorMessage(null);
        await updateInvoiceStatus(invoice.id, 'AGUARDANDO_APROVACAO', {
          justification: 'Triagem e conferência técnica aprovada pelo analista fiscal.',
        });
        router.push('/kanban');
      } catch (err: any) {
        setErrorMessage(err?.message || 'Erro ao aprovar conferência.');
      }
    });
  };

  const handleReject = (justification: string) => {
    startTransition(async () => {
      try {
        setErrorMessage(null);
        await updateInvoiceStatus(invoice.id, 'RECUSADO', { justification });
        setIsRejectModalOpen(false);
        router.push('/kanban');
      } catch (err: any) {
        setErrorMessage(err?.message || 'Erro ao registrar devolução.');
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 sm:p-6 shadow-xs flex flex-col h-full overflow-y-auto">
      {/* Cabeçalho da Conferência */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f3f4f5] mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#212020] font-['Poppins']">
              Conferência Técnica & Retenções
            </h2>
            <span className="text-[10px] font-semibold bg-[#fef3c7] text-[#D97706] px-2 py-0.5 rounded">
              Fase 1 · Triagem
            </span>
          </div>
          <p className="text-xs text-[#484848] mt-0.5">
            Protocolo: <strong className="font-mono">{invoice.protocol}</strong> · NF nº{' '}
            <strong>{invoice.invoice_number}</strong>
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-semibold text-[#812926] bg-[#812926]/10 px-2 py-1 rounded">
            {invoice.company.trade_name}
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 mb-4 text-xs text-[#DC2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Alerta Matemático de Consistência */}
      <div
        className={`p-3.5 rounded-xl border mb-5 flex items-start gap-2.5 text-xs ${
          mathValidation.isValid
            ? 'bg-[#dcfce7] border-[#bbf7d0] text-[#16A34A]'
            : 'bg-[#fef3c7] border-[#fde68a] text-[#D97706]'
        }`}
      >
        {mathValidation.isValid ? (
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-[#16A34A]" />
        ) : (
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#D97706]" />
        )}
        <div>
          <p className="font-bold">
            {mathValidation.isValid
              ? 'Conferência Fiscal Consistente'
              : 'Divergência de Retenções Fiscais Detectada'}
          </p>
          <p className="text-[11px] mt-0.5">
            {mathValidation.isValid
              ? 'O valor líquido confere exatamente com as retenções na fonte (tolerância fiscal de até R$ 0,02).'
              : `Divergência de ${formatBRL(mathValidation.divergenceCentavos / 100)} entre líquido declarado e retenções calculadas.`}
          </p>
        </div>
      </div>

      {/* Formulário de Conferência */}
      <div className="space-y-4 flex-1">
        {/* Prestador */}
        <div className="p-3 bg-[#f7f6f2] rounded-xl border border-[#e5e5e5]">
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Dados do Prestador PJ
          </span>
          <p className="text-xs font-bold text-[#212020] mt-0.5">
            {invoice.supplier.name}
          </p>
          <p className="text-xs text-[#484848] font-mono">
            CNPJ: {formatCNPJ(invoice.supplier.cnpj)}
          </p>
          {invoice.supplier.pix_key && (
            <p className="text-xs text-[#1c395c] font-mono mt-0.5">
              Chave Pix: {invoice.supplier.pix_key}
            </p>
          )}
        </div>

        {/* Datas e Centro de Custo */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
              Data de Vencimento
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 text-xs border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#812926]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
              Centro de Custo
            </label>
            <select
              value={costCenterCode}
              onChange={(e) => setCostCenterCode(e.target.value)}
              className="w-full p-2 text-xs border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#812926]"
            >
              <option value="tecnologia_inovacao">Tecnologia & Inovação</option>
              <option value="facilities_coworking">Facilities & Coworking</option>
              <option value="marketing_comunicacao">Marketing & Comunicação</option>
              <option value="eventos_producao">Eventos & Produção</option>
              <option value="projetos_aceleracao">Projetos de Aceleração</option>
              <option value="administrativo_legal">Administrativo & Legal</option>
            </select>
          </div>
        </div>

        {/* Grade de Impostos e Retenções */}
        <div className="pt-2 border-t border-[#f3f4f5]">
          <span className="text-xs font-bold text-[#212020] block mb-2 font-['Poppins']">
            Composição de Retenções na Fonte
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <div>
              <label className="block text-[10px] text-[#484848]">Valor Bruto (R$)</label>
              <input
                type="number"
                step="0.01"
                value={valorBruto}
                onChange={(e) => setValorBruto(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-xs font-mono font-bold border border-[#e5e5e5] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#484848]">ISS Retido (R$)</label>
              <input
                type="number"
                step="0.01"
                value={iss}
                onChange={(e) => setIss(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-xs font-mono border border-[#e5e5e5] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#484848]">IRRF Retido (R$)</label>
              <input
                type="number"
                step="0.01"
                value={irrf}
                onChange={(e) => setIrrf(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-xs font-mono border border-[#e5e5e5] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#484848]">PIS/COF/CSLL (R$)</label>
              <input
                type="number"
                step="0.01"
                value={pisCofinsCsll}
                onChange={(e) => setPisCofinsCsll(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-xs font-mono border border-[#e5e5e5] rounded-lg"
              />
            </div>
          </div>

          <div className="p-3 bg-[#f7f6f2] rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold text-[#212020]">
              Valor Líquido Apurado:
            </span>
            <span className="text-base font-extrabold text-[#812926] font-mono">
              {formatBRL(valorLiquido)}
            </span>
          </div>
        </div>
      </div>

      {/* Ações Inferiores */}
      <div className="flex items-center justify-between gap-3 pt-4 mt-6 border-t border-[#e5e5e5]">
        <Button
          type="button"
          variant="danger"
          size="md"
          onClick={() => setIsRejectModalOpen(true)}
          disabled={isPending}
        >
          Devolver com Recusa
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleApproveTechnical}
          isLoading={isPending}
          disabled={isPending}
        >
          <span>Aprovar Triagem Técnica</span>
          <ArrowRight className="w-4 h-4 ml-1.5 inline" />
        </Button>
      </div>

      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        invoiceNumber={invoice.invoice_number}
        isPending={isPending}
      />
    </div>
  );
};
