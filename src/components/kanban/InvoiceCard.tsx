'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';
import { Badge } from '@/components/common/Badge';
import { formatBRL, formatCNPJ } from '@/lib/formatters';
import { Calendar, Building2, AlertTriangle, CheckCircle, ExternalLink, GripVertical } from 'lucide-react';

export interface KanbanInvoiceItem {
  id: string;
  protocol: string;
  invoice_number: string;
  status: 'TRIAGEM' | 'AGUARDANDO_APROVACAO' | 'RECUSADO' | 'AGENDADO_PAGAMENTO' | 'AGENDADO' | 'PAGO';
  amount_bruto: number;
  amount_liquido: number;
  due_date: string;
  issue_date: string;
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
  confidence_score?: number;
  has_divergence?: boolean;
}

interface InvoiceCardProps {
  invoice: KanbanInvoiceItem;
  isOverlay?: boolean;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, isOverlay = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: invoice.id,
    data: invoice,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  // Mapeamento visual das verticais da holding
  const getCompanyBadgeVariant = (tradeName: string): 'brand' | 'warning' | 'info' => {
    if (tradeName.includes('Salto')) return 'warning'; // Laranja
    if (tradeName.includes('Impacta Mais')) return 'info'; // Marinho / Azul
    if (tradeName.includes('Seu PêJota')) return 'brand'; // Acento corporativo
    return 'brand'; // Impact Hub Floripa (Bordô)
  };

  // Verificação de vencimento
  const dueDate = new Date(invoice.due_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = dueDate < today && invoice.status !== 'PAGO';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white rounded-xl p-4 border transition-all duration-200 shadow-sm ${
        isOverlay
          ? 'shadow-xl rotate-2 border-[#812926] cursor-grabbing'
          : 'border-[#e5e5e5] hover:border-[#812926]/40 hover:shadow-md'
      }`}
    >
      {/* Cabeçalho do Card: Tomador e Grip de arrastar */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant={getCompanyBadgeVariant(invoice.company.trade_name)}>
            {invoice.company.trade_name}
          </Badge>
          {invoice.confidence_score !== undefined && (
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                invoice.confidence_score >= 90
                  ? 'bg-[#dcfce7] text-[#16A34A]'
                  : 'bg-[#fef3c7] text-[#D97706]'
              }`}
              title={`Confiança da IA: ${invoice.confidence_score}%`}
            >
              {invoice.confidence_score >= 90 ? (
                <CheckCircle className="w-2.5 h-2.5 mr-1 inline" />
              ) : (
                <AlertTriangle className="w-2.5 h-2.5 mr-1 inline" />
              )}
              {invoice.confidence_score}% IA
            </span>
          )}
        </div>

        {/* Alça de Arraste acessível */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing p-1 text-[#c1c1c1] hover:text-[#812926] transition-colors rounded"
          title="Arrastar nota para outra coluna"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Identificação da Nota e Prestador */}
      <div className="mb-3">
        <div className="flex items-center justify-between gap-1">
          <h4 className="text-xs font-bold text-[#212020] font-['Poppins'] truncate">
            NF nº {invoice.invoice_number || 'S/N'}
          </h4>
          <span className="text-[10px] font-mono text-[#484848] bg-[#f7f6f2] px-1.5 py-0.5 rounded">
            {invoice.protocol}
          </span>
        </div>
        <p className="text-xs font-semibold text-[#812926] truncate mt-0.5">
          {invoice.supplier.name}
        </p>
        <p className="text-[11px] text-[#484848] font-mono">
          CNPJ: {formatCNPJ(invoice.supplier.cnpj)}
        </p>
      </div>

      {/* Valores Financeiros e Vencimento */}
      <div className="pt-2 border-t border-[#f3f4f5] flex items-end justify-between">
        <div>
          <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
            Valor Líquido
          </span>
          <span className="text-sm font-bold text-[#212020] font-['Poppins']">
            {formatBRL(invoice.amount_liquido)}
          </span>
        </div>

        <div className="text-right">
          <span
            className={`inline-flex items-center text-[11px] font-medium ${
              isOverdue ? 'text-[#DC2626] font-bold' : 'text-[#484848]'
            }`}
          >
            <Calendar className="w-3 h-3 mr-1 inline" />
            {new Date(invoice.due_date).toLocaleDateString('pt-BR')}
          </span>
          {isOverdue && (
            <span className="block text-[9px] font-bold text-[#DC2626] uppercase">
              Vencida
            </span>
          )}
        </div>
      </div>

      {/* Rodapé com link de detalhes */}
      <div className="mt-3 pt-2 border-t border-dashed border-[#e5e5e5] flex items-center justify-between">
        <span className="text-[10px] text-[#484848] truncate max-w-[140px]">
          {invoice.cost_center?.name || 'Geral / A definir'}
        </span>

        <Link
          href={
            invoice.status === 'TRIAGEM'
              ? `/conferencia/${invoice.id}`
              : `/notas/${invoice.id}`
          }
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#812926] hover:text-[#1c395c] transition-colors"
        >
          <span>{invoice.status === 'TRIAGEM' ? 'Conferir' : 'Ver Detalhes'}</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
