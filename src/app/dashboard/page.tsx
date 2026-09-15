import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth';
import { getInvoicesForKanban } from '@/actions/invoices';
import { calculateDashboardMetrics } from '@/lib/dashboard-metrics';
import { Navbar } from '@/components/common/Navbar';
import { formatBRL } from '@/lib/formatters';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  PieChart,
  Layers,
  Sparkles,
} from 'lucide-react';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/');
  }

  const invoices = await getInvoicesForKanban();
  const metrics = calculateDashboardMetrics(invoices);

  const verticalCards = [
    {
      name: 'Impact Hub Floripa',
      corporateName: 'Gestão de Espaços & Coworking LTDA',
      accentColor: '#812926',
      badgeBg: '#fde2ce',
      data: metrics.byCompany['Impact Hub Floripa'],
    },
    {
      name: 'Salto Aceleradora',
      corporateName: 'Aceleração de Negócios de Impacto LTDA',
      accentColor: '#ea580c',
      badgeBg: '#ffedd5',
      data: metrics.byCompany['Salto Aceleradora'],
    },
    {
      name: 'Impacta Mais',
      corporateName: 'Serviços de Eventos e Comunicação LTDA',
      accentColor: '#1c395c',
      badgeBg: '#e0f2fe',
      data: metrics.byCompany['Impacta Mais'],
    },
    {
      name: 'Seu PêJota',
      corporateName: 'BPO Financeiro & Serviços Contábeis LTDA',
      accentColor: '#7c3aed',
      badgeBg: '#f3e8ff',
      data: metrics.byCompany['Seu PêJota'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col">
      <Navbar userRole={user.role} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Cabeçalho do Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#212020] font-['Poppins'] tracking-tight">
                Dashboard Executivo da Holding
              </h1>
              <span className="text-xs bg-[#812926] text-white px-2.5 py-0.5 rounded-full font-semibold">
                Tempo Real
              </span>
            </div>
            <p className="text-xs text-[#484848] mt-1 font-['GT_Walsheim']">
              Visão consolidada do passivo circulante, saúde financeira e performance operacional das 4 verticais.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/kanban"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#812926] bg-white border border-[#e5e5e5] hover:border-[#812926] rounded-xl shadow-xs transition-colors"
            >
              <span>Ir para o Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento Grid: Cards Principais com tokens reais de docs/designIHF.md */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Azul Marinho Corporativo (--azul: #1c395c) - Passivo Circulante */}
          <div className="md:col-span-4 bg-[#1c395c] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#cfeff3] font-semibold">
                  Passivo Circulante Ativo
                </span>
                <Clock className="w-5 h-5 text-[#41bed0]" />
              </div>
              <h3 className="text-3xl font-black font-['Poppins'] mt-3">
                {formatBRL(metrics.totalPassivoCirculanteCentavos / 100)}
              </h3>
              <p className="text-xs text-[#abb5c2] mt-1">
                Total de despesas em aberto nas fases de triagem, aprovação e fila de pagamento.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#414141] flex items-center justify-between text-xs text-[#cfeff3]">
              <span>Controle Rigoroso</span>
              <span className="font-bold">4 Verticais</span>
            </div>
          </div>

          {/* Card 2: Bordô Primário da Marca (--vermelho: #812926) - Total Liquidado */}
          <div className="md:col-span-4 bg-[#812926] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#fde2ce] font-semibold">
                  Total Liquidado no Mês
                </span>
                <CheckCircle className="w-5 h-5 text-[#b9ee8d]" />
              </div>
              <h3 className="text-3xl font-black font-['Poppins'] text-[#fde2ce] mt-3">
                {formatBRL(metrics.totalLiquidadoCentavos / 100)}
              </h3>
              <p className="text-xs text-white/80 mt-1">
                Pagamentos 100% liquidados com anexo obrigatório de comprovante bancário.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-[#fde2ce]">
              <span>Pronto para Fechamento</span>
              <span className="font-bold">{metrics.byStatus.PAGO || 0} Faturas</span>
            </div>
          </div>

          {/* Card 3: Ciano Claro (--azul-claro-4: #e2f5f8) - IA Multimodal */}
          <div className="md:col-span-4 bg-[#e2f5f8] border border-[#cfeff3] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#1c395c] font-bold">
                  Acurácia da IA Multimodal
                </span>
                <Sparkles className="w-5 h-5 text-[#41bed0]" />
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <h3 className="text-3xl font-black text-[#1c395c] font-['Poppins']">
                  {metrics.averageConfidenceScore}%
                </h3>
                <span className="text-xs font-bold text-[#16A34A] bg-[#dcfce7] px-2 py-0.5 rounded">
                  Gemini 2.5 Flash
                </span>
              </div>
              <p className="text-xs text-[#484848] mt-1">
                Conferência automatizada de alíquotas com validação matemática estrita.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#cfeff3] flex items-center justify-between text-xs text-[#1c395c]">
              <span>Economia Estimada</span>
              <span className="font-bold">~18h / mês BPO</span>
            </div>
          </div>
        </div>

        {/* Bento Grid: Cards das 4 Verticais da Holding */}
        <div>
          <h2 className="text-sm font-bold text-[#212020] uppercase tracking-wider font-['Poppins'] mb-3">
            Desempenho por Empresa da Holding
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {verticalCards.map((v) => (
              <div
                key={v.name}
                className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                style={{ borderTop: `4px solid ${v.accentColor}` }}
              >
                <div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                    style={{ backgroundColor: v.badgeBg, color: v.accentColor }}
                  >
                    {v.name}
                  </span>
                  <h4 className="text-xs font-bold text-[#212020] mt-2 truncate">
                    {v.corporateName}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f3f4f5] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-[#484848] uppercase block">
                      Volume Total
                    </span>
                    <span className="text-base font-black text-[#212020] font-mono">
                      {formatBRL((v.data?.totalLiquidoCentavos || 0) / 100)}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#484848] bg-[#f7f6f2] px-2 py-1 rounded">
                    {v.data?.count || 0} NFs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funil de Fases e Distribuição de Centros de Custo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Funil das 5 Fases do Ciclo de Vida */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-xs">
            <h3 className="text-xs font-bold text-[#212020] uppercase tracking-wider font-['Poppins'] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#812926]" />
              Funil do Ciclo de Vida (Volume de Faturas)
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { label: 'Fase 1: Triagem & Divergências', count: metrics.byStatus.TRIAGEM || 0, color: '#D97706' },
                { label: 'Fase 2: Aguardando Aprovação', count: metrics.byStatus.AGUARDANDO_APROVACAO || 0, color: '#1c395c' },
                { label: 'Fase 3: Recusado / Devolvido', count: metrics.byStatus.RECUSADO || 0, color: '#DC2626' },
                { label: 'Fase 4: Agendado para Pagamento', count: metrics.byStatus.AGENDADO_PAGAMENTO || 0, color: '#812926' },
                { label: 'Fase 5: Pago & Liquidado', count: metrics.byStatus.PAGO || 0, color: '#16A34A' },
              ].map((phase) => (
                <div key={phase.label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-[#212020]">{phase.label}</span>
                    <span className="font-bold font-mono">{phase.count} notas</span>
                  </div>
                  <div className="w-full bg-[#f3f4f5] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: phase.color,
                        width: `${Math.max(8, (phase.count / Math.max(1, invoices.length)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking de Centros de Custo */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-xs">
            <h3 className="text-xs font-bold text-[#212020] uppercase tracking-wider font-['Poppins'] mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#812926]" />
              Demanda por Centro de Custo
            </h3>

            <div className="space-y-3 text-xs">
              {Object.keys(metrics.byCostCenter).length === 0 ? (
                <p className="text-[#c1c1c1] italic">Nenhum centro de custo computado ainda.</p>
              ) : (
                Object.entries(metrics.byCostCenter).map(([name, centavos]) => (
                  <div key={name} className="flex items-center justify-between py-1.5 border-b border-[#f3f4f5]">
                    <span className="text-[#484848] truncate max-w-[200px]">{name}</span>
                    <span className="font-bold text-[#212020] font-mono">
                      {formatBRL(centavos / 100)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
