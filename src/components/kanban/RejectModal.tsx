'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { AlertCircle } from 'lucide-react';

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (justification: string) => void;
  invoiceNumber?: string;
  isPending?: boolean;
}

export const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  invoiceNumber,
  isPending = false,
}) => {
  const [justification, setJustification] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!justification.trim() || justification.trim().length < 5) {
      setError('A justificativa de recusa deve ter pelo menos 5 caracteres.');
      return;
    }
    setError(null);
    onConfirm(justification.trim());
  };

  const handleClose = () => {
    setJustification('');
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Devolver Nota Fiscal ${invoiceNumber ? `nº ${invoiceNumber}` : ''}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 p-3 text-xs text-[#DC2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            A recusa de uma fatura exige justificativa formal para notificação do prestador e auditoria.
          </span>
        </div>

        {error && <p className="text-xs text-[#DC2626] font-medium">{error}</p>}

        <div>
          <label className="block text-xs font-semibold text-[#212020] mb-1.5 font-['Poppins']">
            Motivo da Recusa / Devolução *
          </label>
          <textarea
            rows={4}
            required
            placeholder="Descreva o motivo (ex: Tomador incorreto, valor de retenção divergente, serviço não concluído)..."
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="w-full p-3 text-xs border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#DC2626] transition-colors"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" size="md" onClick={handleClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button type="submit" variant="danger" size="md" isLoading={isPending}>
            Confirmar Devolução
          </Button>
        </div>
      </form>
    </Modal>
  );
};
