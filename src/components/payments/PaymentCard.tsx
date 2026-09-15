'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { formatBRL, formatCNPJ } from '@/lib/formatters';
import { uploadPaymentProofAndMarkPaid } from '@/actions/invoices';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { PaymentProofModal } from '@/components/kanban/PaymentProofModal';
import {
  CreditCard,
  Copy,
  Check,
  Calendar,
  Building,
  UploadCloud,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface PaymentInvoiceItem {
  id: string;
  protocol: string;
  invoice_number: string;
  amount_bruto: number;
  amount_liquido: number;
  due_date: string;
  issue_date: string;
  supplier: {
    name: string;
    cnpj: string;
    pix_key?: string;
    bank_data?: any;
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

interface PaymentCardProps {
  invoice: PaymentInvoiceItem;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ invoice }) => {
  const [copiedPix, setCopiedPix] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyPix = () => {
    if (!invoice.supplier.pix_key) return;
    navigator.clipboard.writeText(invoice.supplier.pix_key);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleConfirmPayment = async (
    file: File,
    paymentDate: string,
    txId?: string
  ) => {
    startTransition(async () => {
      try {
        setErrorMessage(null);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('payment_date', paymentDate);
        if (txId) formData.append('tx_id', txId);

        await uploadPaymentProofAndMarkPaid(invoice.id, formData);
        setIsPaymentModalOpen(false);
        setIsPaidSuccess(true);
      } catch (err: any) {
        setErrorMessage(err?.message || 'Erro ao registrar comprovante.');
      }
    });
  };

  if (isPaidSuccess) {
    return (
      <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-2xl p-6 text-center text-[#16A34A] animate-fade-in">
        <CheckCircle className="w-8 h-8 mx-auto mb-2" />
        <h4 className="text-sm font-bold">Pagamento Liquidado com Sucesso!</h4>
        <p className="text-xs text-[#15803d] mt-1">
          Fatura nº {invoice.invoice_number} movida para a fase PAGO com comprovante anexado.
        </p>
        <Link
          href={`/notas/${invoice.id}`}
          className="inline-block mt-3 text-xs font-semibold text-[#812926] underline"
        >
          Ver Comprovante e Auditoria &rarr;
        </Link>
      </div>
    );
  }

  const dueDate = new Date(invoice.due_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = dueDate < today;

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs hover:border-[#812926]/40 transition-all">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#f3f4f5]">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="brand">{invoice.company.trade_name}</Badge>
          <span className="text-xs font-mono bg-[#f7f6f2] px-2 py-0.5 rounded text-[#484848]">
            {invoice.protocol}
          </span>
          <span className="text-xs font-bold text-[#212020] font-['Poppins']">
            NF nº {invoice.invoice_number}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
              isOverdue
                ? 'bg-[#fee2e2] text-[#DC2626]'
                : 'bg-[#f7f6f2] text-[#484848]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Vence em: {dueDate.toLocaleDateString('pt-BR')}</span>
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 mb-4 text-xs text-[#DC2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Conteúdo: Fornecedor, Pix e Valor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-center">
        <div className="md:col-span-5">
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Favorecido / Prestador
          </span>
          <h4 className="text-sm font-bold text-[#212020] truncate">
            {invoice.supplier.name}
          </h4>
          <p className="text-xs text-[#484848] font-mono">
            CNPJ: {formatCNPJ(invoice.supplier.cnpj)}
          </p>
        </div>

        {/* Chave Pix e Cópia em 1 Clique */}
        <div className="md:col-span-4">
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Dados para Transferência
          </span>
          {invoice.supplier.pix_key ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono font-semibold bg-[#e0f2fe] text-[#1c395c] px-2 py-1 rounded-md truncate max-w-[200px]">
                {invoice.supplier.pix_key}
              </span>
              <button
                type="button"
                onClick={handleCopyPix}
                className="p-1.5 bg-[#f7f6f2] hover:bg-[#812926] hover:text-white rounded-md text-[#484848] transition-colors"
                title="Copiar Chave Pix"
              >
                {copiedPix ? (
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ) : (
            <p className="text-xs text-[#484848] mt-1 italic">
              Transferência bancária tradicional (TED/DOC)
            </p>
          )}
        </div>

        {/* Valor Líquido */}
        <div className="md:col-span-3 text-left md:text-right">
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Valor a Pagar (Líquido)
          </span>
          <span className="text-lg font-black text-[#212020] font-['Poppins']">
            {formatBRL(invoice.amount_liquido / 100)}
          </span>
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f3f4f5]">
        <Link
          href={`/notas/${invoice.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#484848] hover:text-[#812926]"
        >
          <span>Visualizar Espelho</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setIsPaymentModalOpen(true)}
          isLoading={isPending}
          disabled={isPending}
        >
          <UploadCloud className="w-4 h-4 mr-1.5" />
          <span>Anexar Comprovante & Liquidar</span>
        </Button>
      </div>

      <PaymentProofModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handleConfirmPayment}
        invoiceNumber={invoice.invoice_number}
        amountLiquidoCentavos={invoice.amount_liquido}
        isPending={isPending}
      />
    </div>
  );
};
