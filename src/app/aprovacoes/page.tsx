import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { getInvoicesForApproval } from '@/actions/approvals';
import { Navbar } from '@/components/common/Navbar';
import { ApprovalCard } from '@/components/approvals/ApprovalCard';
import Link from 'next/link';
import { CheckSquare, Building, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ApprovalsPageProps {
  searchParams: Promise<{
    company?: string;
  }>;
}

export default async function ApprovalsPage({ searchParams }: ApprovalsPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/');
  }

  const resolvedParams = await searchParams;
  const companyFilter = resolvedParams.company || 'ALL';

  const invoices = await getInvoicesForApproval(companyFilter);

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
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#212020] font-['Poppins'] tracking-tight">
              Central de Deliberação & Aprovações
            </h1>
            <span className="text-xs bg-[#1c395c] text-white px-2.5 py-0.5 rounded-full font-semibold">
              Fase 2
            </span>
          </div>
          <p className="text-xs text-[#484848] mt-1 font-['GT_Walsheim']">
            Aprovação com checagem rígida de alçadas orçamentárias (Gestor até R$ 10.000,00 · CFO ilimitado).
          </p>
        </div>

        {/* Banner Informativo do Perfil Logado */}
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#812926]/10 flex items-center justify-center text-[#812926]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#484848]">Você está autenticado como:</p>
              <h3 className="text-sm font-bold text-[#212020]">
                {user.name} ({user.role.toUpperCase()})
              </h3>
            </div>
          </div>

          <div className="text-xs text-[#484848] sm:text-right">
            <span className="font-semibold text-[#212020] block">
              {user.role === 'gestor'
                ? 'Alçada Padrão: até R$ 10.000,00'
                : user.role === 'cfo' || user.role === 'admin'
                ? 'Alçada Extraordinária: Sem Limite Teto'
                : 'Sem Alçada Financeira (Apenas Triagem Técnica)'}
            </span>
            <span className="text-[11px] text-[#484848]">
              {user.role === 'analista'
                ? 'Troque para Gestor ou CFO na tela inicial para aprovar faturas.'
                : 'Faturas acima da sua alçada serão bloqueadas automaticamente.'}
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
                href={`/aprovacoes?company=${comp.id}`}
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

        {/* Lista de Faturas Pendentes de Aprovação */}
        {invoices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-12 text-center shadow-xs">
            <CheckSquare className="w-12 h-12 text-[#16A34A] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#212020] font-['Poppins']">
              Nenhuma fatura aguardando aprovação
            </h3>
            <p className="text-xs text-[#484848] mt-1 max-w-md mx-auto">
              Todas as notas validadas já foram deliberadas ou encaminhadas para pagamento.
            </p>
            <Link
              href="/kanban"
              className="inline-block mt-4 text-xs font-semibold text-[#812926] underline"
            >
              Voltar ao Quadro Operacional
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((inv) => (
              <ApprovalCard
                key={inv.id}
                invoice={inv}
                currentUserRole={user.role}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
