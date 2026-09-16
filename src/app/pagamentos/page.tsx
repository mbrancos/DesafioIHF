import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { getInvoicesForKanban } from '@/actions/invoices';
import { Navbar } from '@/components/common/Navbar';
import { PaymentCard } from '@/components/payments/PaymentCard';
import { formatBRL } from '@/lib/formatters';
import Link from 'next/link';
import { CreditCard, Building, CheckCircle, Clock } from 'lucide-react';

interface PaymentsPageProps {
  searchParams: Promise<{
    company?: string;
  }>;
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/');
  }

  const resolvedParams = await searchParams;
  const companyFilter = resolvedParams.company || 'ALL';

  const allInvoices = await getInvoicesForKanban({
    companyId: companyFilter,
  });

  // Filtra as faturas autorizadas (Agendar Pagamento e Agendado)
  const paymentInvoices = allInvoices.filter(
    (i) => i.status === 'AGENDADO_PAGAMENTO' || i.status === 'AGENDADO'
  );

  const totalPagarCentavos = paymentInvoices.reduce(
    (acc, cur) => acc + (cur.amount_liquido || 0),
    0
  );

  const companies = [
    { id: 'ALL', label: 'Todas as Verticais' },
    { id: 'c0000000-0000-0000-0000-000000000001', label: 'Impact Hub Floripa' },
    { id: 'c0000000-0000-0000-0000-000000000002', label: 'Salto Aceleradora' },
    { id: 'c0000000-0000-0000-0000-000000000003', label: 'Impacta Mais' },
    { id: 'c0000000-0000-0000-0000-000000000004', label: 'Seu PêJota' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col">
      <Navbar userRole={user.role} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#212020] font-['Poppins'] tracking-tight">
                Fila de Liquidação & Pagamentos
              </h1>
              <span className="text-xs bg-[#812926] text-white px-2.5 py-0.5 rounded-full font-semibold">
                Fase 4
              </span>
            </div>
            <p className="text-xs text-[#484848] mt-1 font-['GT_Walsheim']">
              Transfira via Pix com cópia em 1 clique e anexe o comprovante obrigatório para conciliação contábil.
            </p>
          </div>

          {/* Totalizador Financeiro */}
          <div className="bg-white px-4 py-3 rounded-2xl border border-[#e5e5e5] shadow-xs text-right">
            <span className="text-[10px] text-[#484848] uppercase tracking-wider block">
              Passivo a Liquidar na Fila
            </span>
            <span className="text-lg font-black text-[#812926] font-mono">
              {formatBRL(totalPagarCentavos)}
            </span>
          </div>
        </div>

        {/* Filtros por Vertical */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          <span className="text-xs font-semibold text-[#484848] flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-[#812926]" />
            Empresa:
          </span>
          {companies.map((comp) => {
            const isActive = companyFilter === comp.id;
            return (
              <Link
                key={comp.id}
                href={`/pagamentos?company=${comp.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#812926] text-white'
                    : 'bg-white border border-[#e5e5e5] text-[#484848] hover:bg-[#f3f4f5]'
                }`}
              >
                {comp.label}
              </Link>
            );
          })}
        </div>

        {/* Lista de Faturas para Pagamento */}
        {paymentInvoices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-12 text-center shadow-xs">
            <CheckCircle className="w-12 h-12 text-[#16A34A] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#212020] font-['Poppins']">
              Fila de pagamentos em dia!
            </h3>
            <p className="text-xs text-[#484848] mt-1 max-w-md mx-auto">
              Nenhuma fatura autorizada aguardando baixa bancária no momento.
            </p>
            <Link
              href="/kanban"
              className="inline-block mt-4 text-xs font-semibold text-[#812926] underline"
            >
              Consultar o Quadro Kanban
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentInvoices.map((inv) => (
              <PaymentCard key={inv.id} invoice={inv} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
