'use client';

import React, { useState, useRef } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { UploadCloud, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { formatBRL } from '@/lib/formatters';

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File, paymentDate: string, txId?: string) => Promise<void>;
  invoiceNumber?: string;
  amountLiquidoCentavos?: number;
  isPending?: boolean;
}

export const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  invoiceNumber,
  amountLiquidoCentavos,
  isPending = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [txId, setTxId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 4 * 1024 * 1024) {
      setError('O comprovante deve ter no máximo 4 MB.');
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(selected.type)) {
      setError('Formato inválido. Envie um arquivo PDF, JPG ou PNG.');
      return;
    }

    setError(null);
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('O anexo do comprovante de pagamento é obrigatório.');
      return;
    }
    if (!paymentDate) {
      setError('A data do pagamento é obrigatória.');
      return;
    }

    setError(null);
    await onConfirm(file, paymentDate, txId.trim() || undefined);
  };

  const handleClose = () => {
    setFile(null);
    setTxId('');
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Confirmar Liquidação de Pagamento ${invoiceNumber ? `nº ${invoiceNumber}` : ''}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 p-3 text-xs text-[#16A34A] bg-[#dcfce7] border border-[#bbf7d0] rounded-lg">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            {amountLiquidoCentavos ? (
              <>
                Valor a liquidar:{' '}
                <strong className="font-semibold text-[#15803d]">
                  {formatBRL(amountLiquidoCentavos)}
                </strong>
                . A baixa de contas a pagar exige anexo obrigatório do comprovante bancário para conciliação contábil.
              </>
            ) : (
              'A baixa de contas a pagar exige anexo obrigatório do comprovante bancário para conciliação contábil.'
            )}
          </span>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 text-xs text-[#DC2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload do Comprovante */}
        <div>
          <label className="block text-xs font-semibold text-[#212020] mb-1.5 font-['Poppins']">
            Comprovante Bancário (PDF, JPG ou PNG até 4MB) *
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,image/png,image/jpeg"
            className="hidden"
          />

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#e5e5e5] hover:border-[#16A34A] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#f7f6f2]"
            >
              <UploadCloud className="w-8 h-8 text-[#16A34A] mx-auto mb-2" />
              <p className="text-xs font-medium text-[#212020]">
                Clique para selecionar o comprovante de pagamento
              </p>
              <p className="text-[11px] text-[#484848] mt-1">
                Suporta PDF, JPG ou PNG (Máximo 4MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border border-[#bbf7d0] bg-[#f0fdf4] rounded-lg">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                <div className="truncate text-left">
                  <p className="text-xs font-semibold text-[#212020] truncate">{file.name}</p>
                  <p className="text-[10px] text-[#484848]">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="p-1 hover:bg-[#dcfce7] rounded text-[#484848] hover:text-[#DC2626] transition-colors"
                title="Remover arquivo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Campos adicionais de Liquidação */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
              Data do Pagamento *
            </label>
            <input
              type="date"
              required
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full p-2.5 text-xs border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#16A34A]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
              Cód. Autenticação / TXID (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: E12345678..."
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              className="w-full p-2.5 text-xs border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#16A34A]"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-2 pt-3 border-t border-[#e5e5e5]">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="secondary"
            size="md"
            isLoading={isPending}
            disabled={!file || isPending}
          >
            Confirmar Liquidação
          </Button>
        </div>
      </form>
    </Modal>
  );
};
