'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { UploadCloud, FileCheck, AlertCircle, FileCode, CheckCircle2 } from 'lucide-react';

interface WizardStep1UploadProps {
  onProcessed: (data: any, pdfFile: File, hashSha256: string) => void;
}

export const WizardStep1Upload: React.FC<WizardStep1UploadProps> = ({ onProcessed }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Apenas arquivos no formato PDF são aceitos para a Nota Fiscal.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('O arquivo PDF excede o limite máximo de 4 MB.');
      return;
    }

    setPdfFile(file);
  };

  const handleXmlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.xml')) {
      setXmlFile(file);
    }
  };

  const handleProcess = async () => {
    if (!pdfFile) {
      setError('Selecione o arquivo PDF da NFS-e para continuar.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      if (xmlFile) {
        formData.append('xml', xmlFile);
      }

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao processar a nota fiscal.');
      }

      onProcessed(result.data, pdfFile, result.hash_sha256);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado durante a leitura da nota fiscal.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-10 shadow-card">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#812926] font-['Poppins']">
          Envio de Nota Fiscal de Serviços (NFS-e)
        </h2>
        <p className="text-xs sm:text-sm text-[#484848] mt-1.5">
          Faça o upload do documento em PDF. Nossa IA multimodal extrairá os dados para sua conferência.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 mb-6 text-xs text-[#DC2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Dropzone PDF */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-[#212020] mb-2 font-['Poppins']">
          PDF da Nota Fiscal (Obrigatório · Máx. 4 MB)
        </label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            pdfFile
              ? 'border-[#16A34A] bg-[#f0fdf4]'
              : 'border-[#e5e5e5] hover:border-[#812926] bg-[#f7f6f2]'
          }`}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handlePdfChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {pdfFile ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-10 h-10 text-[#16A34A] mb-2" />
              <p className="text-sm font-semibold text-[#212020] font-['Poppins']">
                {pdfFile.name}
              </p>
              <p className="text-xs text-[#484848] mt-0.5">
                {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB · Clique para substituir
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud className="w-10 h-10 text-[#812926] mb-2" />
              <p className="text-sm font-semibold text-[#212020] font-['Poppins']">
                Arraste seu PDF aqui ou clique para selecionar
              </p>
              <p className="text-xs text-[#c1c1c1] mt-1">Formatos aceitos: PDF</p>
            </div>
          )}
        </div>
      </div>

      {/* Input Opcional XML */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-[#484848] mb-1.5 font-['Poppins']">
          Arquivo XML da NFS-e (Opcional)
        </label>
        <div className="flex items-center gap-3 p-3 bg-[#f7f6f2] border border-[#e5e5e5] rounded-lg">
          <FileCode className="w-5 h-5 text-[#1c395c]" />
          <input
            type="file"
            accept=".xml,text/xml"
            onChange={handleXmlChange}
            className="text-xs text-[#484848] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#e5e5e5] file:text-[#212020] hover:file:bg-[#d4d4d4]"
          />
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={handleProcess}
        isLoading={isProcessing}
        disabled={!pdfFile || isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Lendo e Interpretando Documento com IA...' : 'Processar Documento e Conferir Dados'}
      </Button>
    </div>
  );
};
