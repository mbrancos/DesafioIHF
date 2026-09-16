import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { getInvoiceById } from '@/actions/invoices';
import { Navbar } from '@/components/common/Navbar';
import { DynamicPdfViewer } from '@/components/pdf/DynamicPdfViewer';
import { ConferenceForm } from '@/components/conference/ConferenceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ConferencePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ConferencePage({ params }: ConferencePageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/');
  }

  const resolvedParams = await params;
  const invoice = await getInvoiceById(resolvedParams.id);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col">
      <Navbar userRole={user.role} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto flex flex-col">
        {/* Navegação de Volta */}
        <div className="mb-4">
          <Link
            href="/kanban"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#812926] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Quadro Operacional</span>
          </Link>
        </div>

        {/* Split-View: Documento Original x Conferência Técnica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[600px]">
          {/* Coluna Esquerda: Visualizador de PDF Dinâmico (SSR False) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#e5e5e5] p-3 sm:p-4 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-[#212020] font-['Poppins']">
                Documento Fiscal Original (NFS-e)
              </span>
              <span className="text-[10px] text-[#484848] font-mono">
                SHA-256: {invoice.hash_sha256?.substring(0, 16)}...
              </span>
            </div>
            <div className="flex-1 min-h-[500px] border border-[#f3f4f5] rounded-xl overflow-hidden">
              <DynamicPdfViewer url={invoice.file_pdf_url} />
            </div>
          </div>

          {/* Coluna Direita: Formulário de Conferência e Retenções */}
          <div className="lg:col-span-6 flex flex-col">
            <ConferenceForm invoice={invoice} userRole={user.role} />
          </div>
        </div>
      </main>
    </div>
  );
}
