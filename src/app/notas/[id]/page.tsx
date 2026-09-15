import React from 'react';
import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { getInvoiceById } from '@/actions/invoices';
import { Navbar } from '@/components/common/Navbar';
import { Badge } from '@/components/common/Badge';
import { formatBRL, formatCNPJ } from '@/lib/formatters';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  Calendar,
  Building,
  DollarSign,
  Download,
  History,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface InvoiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/');
  }

  const resolvedParams = await params;
  const invoice = await getInvoiceById(resolvedParams.id);

  if (!invoice) {
    notFound();
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'TRIAGEM':
        return <Badge variant="warning">Triagem & Divergências</Badge>;
      case 'AGUARDANDO_APROVACAO':
        return <Badge variant="info">Aguardando Aprovação</Badge>;
      case 'RECUSADO':
        return <Badge variant="error">Recusado / Devolvido</Badge>;
      case 'AGENDADO_PAGAMENTO':
        return <Badge variant="brand">Agendado Pagamento</Badge>;
      case 'PAGO':
        return <Badge variant="success">Pago & Liquidado</Badge>;
      default:
        return <Badge variant="info">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col">
      <Navbar userRole={user.role} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-6">
        {/* Navegação de Volta */}
        <div>
          <Link
            href="/kanban"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#812926] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Quadro Operacional</span>
          </Link>
        </div>

        {/* Cabeçalho do Detalhe da Nota */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f3f4f5]">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold bg-[#f7f6f2] text-[#484848] px-2.5 py-1 rounded-lg">
                  {invoice.protocol}
                </span>
                <h1 className="text-xl font-black text-[#212020] font-['Poppins']">
                  NFS-e nº {invoice.invoice_number}
                </h1>
                {getStatusBadge(invoice.status)}
              </div>
              <p className="text-xs text-[#484848] mt-1 font-mono">
                Chave de Acesso: {invoice.access_key || 'Não informada na emissão'}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
                Tomador da Holding
              </span>
              <p className="text-xs font-bold text-[#812926]">
                {invoice.company.trade_name}
              </p>
            </div>
          </div>

          {/* Carimbo de Integridade Criptográfica (SHA-256) */}
          <div className="mt-4 p-3 bg-[#f7f6f2] rounded-xl border border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-[#212020] uppercase tracking-wider block">
                  Assinatura Criptográfica SHA-256 (Imutabilidade)
                </span>
                <span className="text-xs font-mono text-[#484848] break-all">
                  {invoice.hash_sha256}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#16A34A] bg-[#dcfce7] px-2.5 py-1 rounded-lg self-start sm:self-auto">
              Original Autenticado
            </span>
          </div>
        </div>

        {/* Informações Fiscais e Composição de Impostos */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Coluna Prestador e Serviço */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-[#212020] uppercase tracking-wider font-['Poppins'] flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#812926]" />
              Dados do Prestador & Classificação
            </h3>

            <div>
              <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
                Razão Social
              </span>
              <p className="text-sm font-bold text-[#212020]">
                {invoice.supplier.name}
              </p>
              <p className="text-xs text-[#484848] font-mono">
                CNPJ: {formatCNPJ(invoice.supplier.cnpj)}
              </p>
            </div>

            {invoice.supplier.pix_key && (
              <div>
                <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
                  Chave Pix
                </span>
                <span className="text-xs font-mono font-semibold text-[#1c395c] bg-[#e0f2fe] px-2 py-0.5 rounded">
                  {invoice.supplier.pix_key}
                </span>
              </div>
            )}

            <div>
              <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
                Centro de Custo Atribuído
              </span>
              <p className="text-xs font-semibold text-[#812926]">
                {invoice.cost_center?.name || 'Geral'}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
                Descrição dos Serviços
              </span>
              <p className="text-xs text-[#484848] leading-relaxed mt-0.5">
                {invoice.service_description || 'Prestação de serviços contínuos.'}
              </p>
            </div>
          </div>

          {/* Coluna Valores e Retenções */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#212020] uppercase tracking-wider font-['Poppins'] flex items-center gap-1.5 mb-4">
                <DollarSign className="w-4 h-4 text-[#812926]" />
                Quadro de Retenções na Fonte
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#f3f4f5]">
                  <span className="text-[#484848]">Valor Bruto dos Serviços:</span>
                  <span className="font-bold text-[#212020] font-mono">
                    {formatBRL(invoice.amount_bruto / 100)}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#f3f4f5]">
                  <span className="text-[#484848]">ISS Retido:</span>
                  <span className="font-mono text-[#DC2626]">
                    - {formatBRL((invoice.iss || 0) / 100)}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#f3f4f5]">
                  <span className="text-[#484848]">IRRF Retido:</span>
                  <span className="font-mono text-[#DC2626]">
                    - {formatBRL((invoice.irrf || 0) / 100)}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-[#f3f4f5]">
                  <span className="text-[#484848]">PIS / COFINS / CSLL:</span>
                  <span className="font-mono text-[#DC2626]">
                    - {formatBRL((invoice.pis_cofins_csll || 0) / 100)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#f7f6f2] rounded-xl flex items-center justify-between border border-[#e5e5e5]">
              <div>
                <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
                  Valor Líquido a Pagar
                </span>
                <span className="text-xs text-[#484848]">
                  Vencimento: {new Date(invoice.due_date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <span className="text-xl font-extrabold text-[#812926] font-mono">
                {formatBRL(invoice.amount_liquido / 100)}
              </span>
            </div>
          </div>
        </div>

        {/* Linha do Tempo Imutável de Auditoria (invoice_events) */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-xs">
          <h3 className="text-xs font-bold text-[#212020] uppercase tracking-wider font-['Poppins'] flex items-center gap-1.5 mb-6">
            <History className="w-4 h-4 text-[#812926]" />
            Trilha de Auditoria Imutável (Event Sourcing)
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e5e5e5]">
            {invoice.events.map((event: any) => (
              <div key={event.id} className="relative flex items-start gap-3">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-[#812926] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#812926]" />
                </div>

                <div className="bg-[#f7f6f2] border border-[#e5e5e5] rounded-xl p-3 flex-1 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-[#212020]">
                      {event.action === 'UPLOADED'
                        ? 'Ingestão e Criação de Protocolo'
                        : event.action === 'TRIAGEM_CONCLUIDA'
                        ? 'Conferência Técnica Finalizada'
                        : event.action === 'APPROVED'
                        ? 'Despesa Aprovada por Alçada'
                        : event.action === 'PAID'
                        ? 'Liquidação e Baixa Bancária'
                        : event.action === 'REJECTED'
                        ? 'Devolução / Recusa Formal'
                        : event.action}
                    </span>
                    <span className="text-[10px] text-[#484848] font-mono">
                      {new Date(event.created_at).toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <p className="text-[#484848] text-[11px]">
                    Responsável:{' '}
                    <strong className="text-[#212020]">
                      {event.user?.name || 'Sistema'}
                    </strong>{' '}
                    ({event.user?.role || 'automático'})
                  </p>

                  {event.justification && (
                    <div className="mt-2 p-2 bg-white rounded border border-[#e5e5e5] text-[#212020] text-[11px]">
                      <strong>Justificativa:</strong> {event.justification}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anexos e Downloads */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-xs">
          <h3 className="text-xs font-bold text-[#212020] uppercase tracking-wider font-['Poppins'] flex items-center gap-1.5 mb-4">
            <FileText className="w-4 h-4 text-[#812926]" />
            Arquivos & Comprovantes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={invoice.file_pdf_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 border border-[#e5e5e5] rounded-xl hover:border-[#812926] hover:bg-[#f7f6f2] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#812926]" />
                <div className="text-left">
                  <p className="text-xs font-bold text-[#212020]">
                    Nota Fiscal Original (PDF)
                  </p>
                  <p className="text-[10px] text-[#484848]">NFS-e {invoice.invoice_number}.pdf</p>
                </div>
              </div>
              <Download className="w-4 h-4 text-[#c1c1c1] group-hover:text-[#812926]" />
            </a>

            {invoice.payment_proof_url ? (
              <a
                href={invoice.payment_proof_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 border border-[#bbf7d0] bg-[#f0fdf4] rounded-xl hover:border-[#16A34A] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#16A34A]">
                      Comprovante de Liquidação Bancária
                    </p>
                    <p className="text-[10px] text-[#15803d]">Comprovante anexo</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#16A34A]" />
              </a>
            ) : (
              <div className="flex items-center justify-between p-3 border border-dashed border-[#e5e5e5] rounded-xl text-[#c1c1c1] text-xs">
                <span>Comprovante bancário ainda não anexado</span>
                <Clock className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
