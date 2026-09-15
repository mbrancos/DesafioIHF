'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { formatBRL, formatCNPJ } from '@/lib/formatters';
import { canUserApproveInvoice } from '@/lib/approvals';
import { approveInvoiceAction } from '@/actions/approvals';
import { updateInvoiceStatus } from '@/actions/invoices';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { RejectModal } from '@/components/kanban/RejectModal';
import {
  CheckCircle,
  AlertOctagon,
  Calendar,
  Building,
  FileText,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface ApprovalInvoiceItem {
  id: string;
  protocol: string;
  invoice_number: string;
  amount_bruto: number;
  amount_liquido: number;
  due_date: string;
  issue_date: string;
  service_description?: string;
  supplier: {
    name: string;
    cnpj: string;
    pix_key?: string;
  };
  company: {
    id: string;
    name: string;
    trade_name: string;
  };
  cost_center?: {
    code: string;
    name: string;
  };
}

interface ApprovalCardProps {
  invoice: ApprovalInvoiceItem;
  currentUserRole: string;
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({
  invoice,
  currentUserRole,
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const approvalCheck = canUserApproveInvoice(
    currentUserRole,
    invoice.amount_liquido
  );

  const handleApprove = () => {
    startTransition(async () => {
      try {
        await approveInvoiceAction(invoice.id, invoice.amount_liquido);
        setStatusMessage({
          type: 'success',
          text: `Fatura ${invoice.invoice_number} aprovada com sucesso! Movida para fila de pagamento.`,
        });
      } catch (err: any) {
        setStatusMessage({
          type: 'error',
          text: err?.message || 'Falha ao aprovar despesa.',
        });
      }
    });
  };

  const handleReject = (justification: string) => {
    startTransition(async () => {
      try {
        await updateInvoiceStatus(invoice.id, 'RECUSADO', { justification });
        setIsRejectModalOpen(false);
        setStatusMessage({
          type: 'success',
          text: `Fatura ${invoice.invoice_number} devolvida ao fornecedor.`,
        });
      } catch (err: any) {
        setStatusMessage({
          type: 'error',
          text: err?.message || 'Erro ao registrar devolução.',
        });
      }
    });
  };

  if (statusMessage?.type === 'success') {
    return (
      <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-2xl p-6 text-center text-[#16A34A] animate-fade-in">
        <CheckCircle className="w-8 h-8 mx-auto mb-2" />
        <p className="text-sm font-bold">{statusMessage.text}</p>
        <Link
          href="/kanban"
          className="inline-block mt-3 text-xs font-semibold text-[#812926] underline"
        >
          Visualizar no Quadro Kanban &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs hover:border-[#812926]/30 transition-all">
      {/* Cabeçalho do Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#f3f4f5]">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="brand">{invoice.company.trade_name}</Badge>
          <span className="text-xs font-mono bg-[#f7f6f2] px-2 py-0.5 rounded text-[#484848]">
            {invoice.protocol}
          </span>
          <span className="text-xs font-bold text-[#212020] font-['Poppins']">
            NF nº {invoice.invoice_number}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#484848]">
          <Calendar className="w-3.5 h-3.5 text-[#812926]" />
          <span>Vencimento: {new Date(invoice.due_date).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      {/* Detalhes do Prestador e Serviço */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Fornecedor / Prestador
          </span>
          <h4 className="text-sm font-bold text-[#212020] truncate">
            {invoice.supplier.name}
          </h4>
          <p className="text-xs text-[#484848] font-mono">
            CNPJ: {formatCNPJ(invoice.supplier.cnpj)}
          </p>
          {invoice.supplier.pix_key && (
            <p className="text-xs text-[#1c395c] font-mono mt-0.5">
              Chave Pix: {invoice.supplier.pix_key}
            </p>
          )}
        </div>

        <div>
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Centro de Custo & Descrição
          </span>
          <p className="text-xs font-semibold text-[#812926]">
            {invoice.cost_center?.name || 'Geral'}
          </p>
          <p className="text-xs text-[#484848] line-clamp-2 mt-0.5">
            {invoice.service_description || 'Prestação de serviços contínuos.'}
          </p>
        </div>
      </div>

      {/* Valores Financeiros e Alçada de Aprovação */}
      <div className="bg-[#f7f6f2] rounded-xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Valor a Autorizar (Líquido)
          </span>
          <span className="text-xl font-extrabold text-[#212020] font-['Poppins']">
            {formatBRL(invoice.amount_liquido / 100)}
          </span>
          <span className="text-[11px] text-[#484848] block">
            Bruto: {formatBRL(invoice.amount_bruto / 100)}
          </span>
        </div>

        {/* Indicador de Alçada */}
        <div>
          {approvalCheck.canApprove ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#dcfce7] border border-[#bbf7d0] text-[#16A34A] rounded-lg text-xs font-semibold">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>Você possui alçada suficiente ({currentUserRole.toUpperCase()})</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2.5 bg-[#fee2e2] border border-[#fecaca] text-[#DC2626] rounded-lg text-xs">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
              <div className="text-left">
                <span className="font-bold block">Alçada Insuficiente:</span>
                <span className="text-[11px]">{approvalCheck.reason}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {statusMessage?.type === 'error' && (
        <div className="p-3 mb-4 text-xs text-[#DC2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg">
          {statusMessage.text}
        </div>
      )}

      {/* Barra de Ações */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#f3f4f5]">
        <Link
          href={`/notas/${invoice.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#484848] hover:text-[#812926] transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ver Espelho Fiscal & Auditoria</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsRejectModalOpen(true)}
            disabled={isPending}
          >
            Devolver
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleApprove}
            isLoading={isPending}
            disabled={!approvalCheck.canApprove || isPending}
            title={
              !approvalCheck.canApprove
                ? 'Você não possui alçada orçamentária suficiente para aprovar este valor.'
                : 'Aprovar despesa e encaminhar para pagamento'
            }
          >
            Aprovar Despesa
          </Button>
        </div>
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
