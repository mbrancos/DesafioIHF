'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WizardStep1Upload } from '@/components/supplier/WizardStep1Upload';
import { WizardStep2SplitView } from '@/components/supplier/WizardStep2SplitView';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function SupplierUploadPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [hashSha256, setHashSha256] = useState<string>('');

  const handleProcessed = (data: any, file: File, hash: string) => {
    setExtractedData(data);
    setPdfFile(file);
    setHashSha256(hash);
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2]">
      {/* Header do Portal do Fornecedor */}
      <header className="w-full border-b border-[#e5e5e5] bg-[#ffffff] py-3.5 px-6 sm:px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/img/logo-impact-hub.svg"
              alt="Impact Hub"
              className="w-8 h-8 rounded-lg shadow-sm shrink-0 group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="text-base font-bold text-[#812926] font-['Poppins'] tracking-tight">
                iHubFiscal
              </span>
              <span className="text-[11px] text-[#414141] font-medium ml-2 border-l border-[#e5e5e5] pl-2 hidden sm:inline-block">
                Portal do Fornecedor
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-semibold text-[#484848] hover:text-[#812926] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Início / Login</span>
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal do Wizard */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {step === 1 ? (
          <WizardStep1Upload onProcessed={handleProcessed} />
        ) : (
          <WizardStep2SplitView
            initialData={extractedData}
            pdfFile={pdfFile!}
            hashSha256={hashSha256}
            onBack={handleBackToStep1}
          />
        )}
      </main>

      {/* Rodapé de Governança */}
      <footer className="w-full border-t border-[#e5e5e5] bg-[#ffffff] py-4 px-6 text-center text-xs text-[#c1c1c1]">
        iHubFiscal · Companhia de Impacto · Governança Fiscal & Tratamento de Dados LGPD
      </footer>
    </div>
  );
}
