import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { getInvoicesForKanban } from '@/actions/invoices';
import { Navbar } from '@/components/common/Navbar';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import Link from 'next/link';
import { Plus, Building, Search, Filter } from 'lucide-react';

interface KanbanPageProps {
  searchParams: Promise<{
    company?: string;
    q?: string;
  }>;
}

export default async function KanbanPage({ searchParams }: KanbanPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/');
  }

  const resolvedParams = await searchParams;
  const companyFilter = resolvedParams.company || 'ALL';
  const searchQuery = resolvedParams.q || '';

  const invoices = await getInvoicesForKanban({
    companyId: companyFilter,
    search: searchQuery,
  });

  const companies = [
    { id: 'ALL', label: 'Todas as Empresas (Holding)' },
    { id: 'c0000000-0000-0000-0000-000000000001', label: 'Impact Hub Floripa' },
    { id: 'c0000000-0000-0000-0000-000000000002', label: 'Salto Aceleradora' },
    { id: 'c0000000-0000-0000-0000-000000000003', label: 'Impacta Mais' },
    { id: 'c0000000-0000-0000-0000-000000000004', label: 'Seu PêJota' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col">
      <Navbar userRole={user.role} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
        {/* Cabeçalho do Kanban e Ações */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#212020] font-['Poppins'] tracking-tight">
                Quadro Operacional de Contas a Pagar
              </h1>
              <span className="text-xs bg-[#812926] text-white px-2.5 py-0.5 rounded-full font-semibold">
                5 Fases
              </span>
            </div>
            <p className="text-xs text-[#484848] mt-1 font-['GT_Walsheim']">
              Acompanhe o ciclo de vida ponta a ponta: da triagem com IA até a liquidação bancária das 4 verticais.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-[#812926] hover:bg-[#68201e] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 font-['Poppins']"
            >
              <Plus className="w-4 h-4" />
              <span>Ingestar Nova Nota Fiscal</span>
            </Link>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#e5e5e5] shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-[#484848] flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#812926]" />
              Vertical:
            </span>
            <div className="flex items-center gap-1.5">
              {companies.map((comp) => {
                const isActive = companyFilter === comp.id;
                return (
                  <Link
                    key={comp.id}
                    href={`/kanban?company=${comp.id}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#812926] text-white'
                        : 'bg-[#f7f6f2] text-[#484848] hover:bg-[#e5e5e5] hover:text-[#212020]'
                    }`}
                  >
                    {comp.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Campo de Busca Rápida */}
          <form method="GET" action="/kanban" className="w-full md:w-72 relative">
            {companyFilter !== 'ALL' && (
              <input type="hidden" name="company" value={companyFilter} />
            )}
            <Search className="w-4 h-4 text-[#c1c1c1] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Buscar por NF, prestador..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f7f6f2] border border-[#e5e5e5] rounded-xl focus:bg-white focus:outline-none focus:border-[#812926] transition-colors"
            />
          </form>
        </div>

        {/* Quadro Kanban Interativo */}
        <KanbanBoard initialInvoices={invoices} />
      </main>
    </div>
  );
}
