'use client';

import React, { useState, useTransition } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  KANBAN_COLUMNS,
  shouldInterceptTransition,
  calculateColumnTotals,
} from './kanban-utils';
import { KanbanColumn } from './KanbanColumn';
import { InvoiceCard, KanbanInvoiceItem } from './InvoiceCard';
import { RejectModal } from './RejectModal';
import { PaymentProofModal } from './PaymentProofModal';
import { updateInvoiceStatus, uploadPaymentProofAndMarkPaid } from '@/actions/invoices';

interface KanbanBoardProps {
  initialInvoices: KanbanInvoiceItem[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialInvoices }) => {
  const [invoices, setInvoices] = useState<KanbanInvoiceItem[]>(initialInvoices);
  const [activeInvoice, setActiveInvoice] = useState<KanbanInvoiceItem | null>(null);

  // Estados de interceptação para modais obrigatórios
  const [pendingRejectInvoice, setPendingRejectInvoice] = useState<KanbanInvoiceItem | null>(null);
  const [pendingPaymentInvoice, setPendingPaymentInvoice] = useState<KanbanInvoiceItem | null>(null);
  const [isPendingAction, startTransition] = useTransition();
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Sensores com tolerância de movimento de 5px para não interferir em links/cliques
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const columnTotals = calculateColumnTotals(invoices);

  const handleDragStart = (event: DragStartEvent) => {
    const item = event.active.data.current as KanbanInvoiceItem;
    setActiveInvoice(item || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveInvoice(null);

    if (!over) return;

    const invoiceId = active.id as string;
    const currentInvoice = invoices.find((i) => i.id === invoiceId);
    if (!currentInvoice) return;

    // Identifica a coluna destino (o droppable pode ser o ID da coluna ou um container interno)
    let destinationStatus = (over.id as string) as KanbanInvoiceItem['status'];
    const validColumnIds = KANBAN_COLUMNS.map((c) => c.id);

    if (!validColumnIds.includes(destinationStatus)) {
      const overData = over.data.current;
      if (overData?.columnId && validColumnIds.includes(overData.columnId)) {
        destinationStatus = overData.columnId;
      } else {
        return;
      }
    }

    // Se soltou na mesma coluna, nada a fazer
    if (currentInvoice.status === destinationStatus) {
      return;
    }

    // Avalia regra de governança / interceptação
    const decision = shouldInterceptTransition(destinationStatus);

    if (decision === 'REJECT_MODAL') {
      setPendingRejectInvoice(currentInvoice);
      return;
    }

    if (decision === 'PAYMENT_MODAL') {
      setPendingPaymentInvoice(currentInvoice);
      return;
    }

    // Transição direta otimista
    const previousInvoices = [...invoices];
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status: destinationStatus } : i))
    );

    startTransition(async () => {
      try {
        await updateInvoiceStatus(invoiceId, destinationStatus);
        setFeedbackMessage({
          type: 'success',
          text: `Nota ${currentInvoice.invoice_number} movida para ${destinationStatus}.`,
        });
        setTimeout(() => setFeedbackMessage(null), 3000);
      } catch (err: any) {
        // Reverte estado otimista em caso de falha
        setInvoices(previousInvoices);
        setFeedbackMessage({
          type: 'error',
          text: err?.message || 'Falha ao atualizar status da nota fiscal.',
        });
        setTimeout(() => setFeedbackMessage(null), 4000);
      }
    });
  };

  // Confirmação do Modal de Devolução / Recusa
  const handleConfirmReject = async (justification: string) => {
    if (!pendingRejectInvoice) return;
    const invoiceId = pendingRejectInvoice.id;
    const previousInvoices = [...invoices];

    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status: 'RECUSADO' } : i))
    );

    startTransition(async () => {
      try {
        await updateInvoiceStatus(invoiceId, 'RECUSADO', { justification });
        setPendingRejectInvoice(null);
        setFeedbackMessage({
          type: 'success',
          text: `Nota ${pendingRejectInvoice.invoice_number} devolvida com justificativa registrada.`,
        });
        setTimeout(() => setFeedbackMessage(null), 3000);
      } catch (err: any) {
        setInvoices(previousInvoices);
        setFeedbackMessage({
          type: 'error',
          text: err?.message || 'Erro ao registrar devolução da nota.',
        });
      }
    });
  };

  // Confirmação do Modal de Liquidação / Pagamento com Comprovante
  const handleConfirmPayment = async (file: File, paymentDate: string, txId?: string) => {
    if (!pendingPaymentInvoice) return;
    const invoiceId = pendingPaymentInvoice.id;
    const previousInvoices = [...invoices];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('payment_date', paymentDate);
    if (txId) formData.append('tx_id', txId);

    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status: 'PAGO' } : i))
    );

    startTransition(async () => {
      try {
        await uploadPaymentProofAndMarkPaid(invoiceId, formData);
        setPendingPaymentInvoice(null);
        setFeedbackMessage({
          type: 'success',
          text: `Pagamento da nota ${pendingPaymentInvoice.invoice_number} liquidado com comprovante anexado!`,
        });
        setTimeout(() => setFeedbackMessage(null), 3000);
      } catch (err: any) {
        setInvoices(previousInvoices);
        setFeedbackMessage({
          type: 'error',
          text: err?.message || 'Erro ao realizar upload do comprovante bancário.',
        });
      }
    });
  };

  return (
    <div className="relative">
      {/* Toast de Feedback */}
      {feedbackMessage && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 transition-all ${
            feedbackMessage.type === 'success'
              ? 'bg-[#16A34A] text-white'
              : 'bg-[#DC2626] text-white'
          }`}
        >
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Orquestrador de Arraste DndContext */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
          {KANBAN_COLUMNS.map((column) => {
            const columnInvoices = invoices.filter((i) => i.status === column.id);
            const total = columnTotals[column.id]?.totalCentavos || 0;

            return (
              <KanbanColumn
                key={column.id}
                column={column}
                invoices={columnInvoices}
                totalCentavos={total}
              />
            );
          })}
        </div>

        {/* Overlay ao arrastar */}
        <DragOverlay>
          {activeInvoice ? <InvoiceCard invoice={activeInvoice} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      {/* Modal de Recusa / Devolução */}
      <RejectModal
        isOpen={Boolean(pendingRejectInvoice)}
        onClose={() => setPendingRejectInvoice(null)}
        onConfirm={handleConfirmReject}
        invoiceNumber={pendingRejectInvoice?.invoice_number}
        isPending={isPendingAction}
      />

      {/* Modal de Anexo de Comprovante de Pagamento */}
      <PaymentProofModal
        isOpen={Boolean(pendingPaymentInvoice)}
        onClose={() => setPendingPaymentInvoice(null)}
        onConfirm={handleConfirmPayment}
        invoiceNumber={pendingPaymentInvoice?.invoice_number}
        amountLiquidoCentavos={pendingPaymentInvoice?.amount_liquido}
        isPending={isPendingAction}
      />
    </div>
  );
};
