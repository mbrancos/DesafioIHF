'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { KanbanColumnDef } from './kanban-utils';
import { InvoiceCard, KanbanInvoiceItem } from './InvoiceCard';
import { formatBRL } from '@/lib/formatters';

interface KanbanColumnProps {
  column: KanbanColumnDef;
  invoices: KanbanInvoiceItem[];
  totalCentavos: number;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  invoices,
  totalCentavos,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  });

  return (
    <div className="flex flex-col min-w-[280px] sm:min-w-[300px] max-w-[320px] flex-1 bg-[#f7f6f2] rounded-2xl border border-[#e5e5e5] shadow-xs">
      {/* Cabeçalho da Coluna com Barra de Fase */}
      <div
        className="p-3.5 border-b border-[#e5e5e5] rounded-t-2xl relative overflow-hidden"
        style={{ borderTop: `4px solid ${column.color}` }}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-bold text-[#212020] font-['Poppins'] flex items-center gap-1.5">
            <span>{column.title}</span>
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: column.bgHeader,
                color: column.color,
              }}
            >
              {invoices.length}
            </span>
          </h3>
        </div>

        {/* Totalizador Financeiro */}
        <div className="mt-2 flex items-baseline justify-between text-xs">
          <span className="text-[11px] text-[#484848]">Volume Previsto:</span>
          <span className="font-bold text-[#212020] font-mono">
            {formatBRL(totalCentavos / 100)}
          </span>
        </div>
        <p className="text-[10px] text-[#484848] mt-1 truncate">
          {column.description}
        </p>
      </div>

      {/* Área Droppable para os Cards */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] min-h-[350px] transition-colors rounded-b-2xl ${
          isOver ? 'bg-[#f2eae9] ring-2 ring-inset ring-[#812926]/30' : 'bg-transparent'
        }`}
      >
        {invoices.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-[#e5e5e5] rounded-xl text-[#c1c1c1]">
            <p className="text-xs font-medium">Nenhuma fatura nesta fase</p>
            <p className="text-[10px] text-[#484848] mt-1">
              Arraste uma nota para esta coluna
            </p>
          </div>
        ) : (
          invoices.map((inv) => <InvoiceCard key={inv.id} invoice={inv} />)
        )}
      </div>
    </div>
  );
};
