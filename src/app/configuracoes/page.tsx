'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import {
  Building2,
  Layers,
  ShieldAlert,
  Server,
  FileCheck2,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  Info,
  DollarSign,
  Cpu,
} from 'lucide-react';
import { formatBRL } from '@/lib/formatters';

interface CompanyConfig {
  id: string;
  name: string;
  trade_name: string;
  cnpj: string;
  pix_key: string;
  regime: string;
  color: string;
  description: string;
}

const COMPANIES: CompanyConfig[] = [
  {
    id: '1',
    name: 'Impact Hub Floripa Coworking LTDA',
    trade_name: 'Impact Hub Floripa',
    cnpj: '18.000.000/0001-00',
    pix_key: 'financeiro@impacthubfloripa.com.br',
    regime: 'Lucro Presumido',
    color: '#1c395c',
    description: 'Espaços colaborativos, eventos corporativos, infraestrutura de inovação e comunidade.',
  },
  {
    id: '2',
    name: 'Instituto Salto de Inovação Social',
    trade_name: 'Instituto Salto',
    cnpj: '19.000.000/0001-00',
    pix_key: 'contato@institutosalto.org.br',
    regime: 'Imune / Isenta (Terceiro Setor)',
    color: '#812926',
    description: 'Programas de impacto social, capacitação empreendedora e aceleração de comunidades.',
  },
  {
    id: '3',
    name: 'Impacta Mais Consultoria e Projetos LTDA',
    trade_name: 'Impacta Mais',
    cnpj: '20.000.000/0001-00',
    pix_key: '20.000.000/0001-00',
    regime: 'Simples Nacional',
    color: '#41bed0',
    description: 'Consultoria estratégica em ESG, mensuração de impacto e projetos corporativos.',
  },
  {
    id: '4',
    name: 'Seu PêJota Gestão Contábil e BPO Financeiro LTDA',
    trade_name: 'Seu PêJota',
    cnpj: '21.000.000/0001-00',
    pix_key: 'bpo@seupejota.com.br',
    regime: 'Simples Nacional',
    color: '#b06f52',
    description: 'BPO financeiro especializado, contabilidade consultiva e gestão de departamento fiscal.',
  },
];

const COST_CENTERS = [
  { code: 'operacoes_coworking', name: 'Operações & Coworking', leader: 'Diretoria de Operações', vertical: 'Impact Hub Floripa' },
  { code: 'tecnologia_inovacao', name: 'Tecnologia & Inovação', leader: 'Head de TI & Digital', vertical: 'Holding Geral' },
  { code: 'projetos_eventos', name: 'Projetos & Eventos', leader: 'Gerente de Contas & Eventos', vertical: 'Instituto Salto' },
  { code: 'marketing_comunicacao', name: 'Marketing & Comunicação', leader: 'Coordenação de Growth', vertical: 'Impacta Mais' },
  { code: 'administrativo_financeiro', name: 'Administrativo & Financeiro', leader: 'CFO / Controladoria', vertical: 'Seu PêJota' },
  { code: 'gestao_pessoas_rh', name: 'Gestão de Pessoas & RH', leader: 'Business Partner RH', vertical: 'Holding Geral' },
];

const APPROVAL_LEVELS = [
  {
    level: 1,
    role: 'Gestor da Unidade',
    limit: 1000000, // R$ 10.000,00
    description: 'Aprovação autônoma de despesas orçadas da sua unidade de negócio ou centro de custo.',
    badge: 'Até R$ 10.000,00',
  },
  {
    level: 2,
    role: 'CFO da Holding',
    limit: null, // Sem limite
    description: 'Aprovação extraordinária mandatória para qualquer documento fiscal acima de R$ 10.000,00.',
    badge: 'Ilimitado / Extraordinário',
  },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<'companies' | 'costCenters' | 'approvals' | 'security'>('companies');

  return (
    <div className="min-h-screen bg-ihf-bg-primary flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho */}
        <div className="pb-6 border-b border-ihf-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-ihf-primary bg-ihf-primary/10 px-2.5 py-0.5 rounded-full">
              Governança & Parâmetros
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ihf-slate-900 font-heading">
            Configurações da Holding
          </h1>
          <p className="text-sm text-ihf-slate-600 mt-1 max-w-2xl">
            Gestão consolidada das 4 empresas da Companhia de Impacto, centros de custo, matriz de alçadas
            orçamentárias e conformidade fiscal com auditoria imutável.
          </p>
        </div>

        {/* Abas de Navegação */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-ihf-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('companies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'companies'
                ? 'bg-ihf-primary text-white shadow-sm'
                : 'text-ihf-slate-600 hover:bg-ihf-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Empresas da Holding ({COMPANIES.length})
          </button>

          <button
            onClick={() => setActiveTab('costCenters')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'costCenters'
                ? 'bg-ihf-primary text-white shadow-sm'
                : 'text-ihf-slate-600 hover:bg-ihf-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            Centros de Custo ({COST_CENTERS.length})
          </button>

          <button
            onClick={() => setActiveTab('approvals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'approvals'
                ? 'bg-ihf-primary text-white shadow-sm'
                : 'text-ihf-slate-600 hover:bg-ihf-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Matriz de Alçadas
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'security'
                ? 'bg-ihf-primary text-white shadow-sm'
                : 'text-ihf-slate-600 hover:bg-ihf-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Segurança & Integrações
          </button>
        </div>

        {/* Conteúdo da Aba 1: Empresas da Holding */}
        {activeTab === 'companies' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANIES.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-2xl border border-ihf-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: comp.color }}
                />
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ihf-slate-400">
                      Entidade Legal #{comp.id}
                    </span>
                    <h2 className="text-lg font-bold text-ihf-slate-900 font-heading mt-0.5">
                      {comp.trade_name}
                    </h2>
                    <span className="text-xs text-ihf-slate-500">{comp.name}</span>
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm"
                    style={{ backgroundColor: comp.color }}
                  >
                    {comp.trade_name.substring(0, 2).toUpperCase()}
                  </div>
                </div>

                <p className="text-xs text-ihf-slate-600 mb-4 leading-relaxed">
                  {comp.description}
                </p>

                <div className="bg-ihf-slate-50 rounded-xl p-3 space-y-2 border border-ihf-slate-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-ihf-slate-500">CNPJ:</span>
                    <span className="font-mono font-medium text-ihf-slate-900">{comp.cnpj}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ihf-slate-500">Regime Tributário:</span>
                    <span className="font-medium text-ihf-slate-800">{comp.regime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ihf-slate-500">Chave Pix Padrão:</span>
                    <span className="font-mono text-xs bg-white px-2 py-0.5 rounded border border-ihf-slate-200 text-ihf-slate-700 truncate max-w-[200px]">
                      {comp.pix_key}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conteúdo da Aba 2: Centros de Custo */}
        {activeTab === 'costCenters' && (
          <div className="mt-6 bg-white rounded-2xl border border-ihf-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-ihf-slate-200 bg-ihf-slate-50/50">
              <h2 className="text-sm font-bold text-ihf-slate-900 uppercase tracking-wider">
                Estrutura de Centros de Custo (Plano de Contas Gerencial)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ihf-slate-200 bg-ihf-slate-50 text-[11px] font-bold text-ihf-slate-600 uppercase tracking-wider">
                    <th className="px-6 py-3">Código Gerencial</th>
                    <th className="px-6 py-3">Centro de Custo</th>
                    <th className="px-6 py-3">Vertical Vinculada</th>
                    <th className="px-6 py-3">Responsável</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ihf-slate-200 text-xs">
                  {COST_CENTERS.map((cc) => (
                    <tr key={cc.code} className="hover:bg-ihf-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-ihf-slate-700">
                        {cc.code}
                      </td>
                      <td className="px-6 py-4 font-semibold text-ihf-slate-900">
                        {cc.name}
                      </td>
                      <td className="px-6 py-4 text-ihf-slate-700">
                        {cc.vertical}
                      </td>
                      <td className="px-6 py-4 text-ihf-slate-600">
                        {cc.leader}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Ativo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba 3: Matriz de Alçadas */}
        {activeTab === 'approvals' && (
          <div className="mt-6 space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-amber-900 font-heading">
                  Política Corporativa de Alçadas Financeiras
                </h2>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Para garantir a governança fiscal das verticais, todo pagamento exige aprovação prévia.
                  Despesas de até R$ 10.000,00 podem ser autorizadas pelo Gestor da Unidade. Faturas com
                  valor superior a R$ 10.000,00 são automaticamente bloqueadas e exigem o crivo extraordinário do CFO da Holding.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {APPROVAL_LEVELS.map((lvl) => (
                <div
                  key={lvl.level}
                  className="bg-white rounded-2xl border border-ihf-slate-200 p-6 shadow-sm relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-ihf-primary uppercase tracking-wider bg-ihf-primary/10 px-2.5 py-1 rounded-full">
                      Nível {lvl.level}
                    </span>
                    <span className="font-mono font-bold text-xs bg-ihf-slate-100 text-ihf-slate-800 px-3 py-1 rounded-full border border-ihf-slate-200">
                      {lvl.badge}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-ihf-slate-900 font-heading">
                    {lvl.role}
                  </h2>
                  <p className="text-xs text-ihf-slate-600 mt-2 leading-relaxed">
                    {lvl.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-ihf-slate-100 flex items-center justify-between text-xs">
                    <span className="text-ihf-slate-500">Teto Monetário por Fatura:</span>
                    <span className="font-bold text-ihf-slate-900 font-mono text-sm">
                      {lvl.limit ? formatBRL(lvl.limit) : 'Sem Teto (Extraordinário)'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo da Aba 4: Segurança & Infraestrutura */}
        {activeTab === 'security' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-ihf-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">PostgreSQL + RLS</span>
                </div>
                <div className="text-sm font-bold text-ihf-slate-900">Supabase Database</div>
                <span className="text-xs text-ihf-slate-500 mt-1 block">
                  7 tabelas ativas, Row Level Security habilitado e auditoria cronológica em `invoice_events`.
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-ihf-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Cpu className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">IA Multimodal</span>
                </div>
                <div className="text-sm font-bold text-ihf-slate-900">Google Gemini 2.5 Flash</div>
                <span className="text-xs text-ihf-slate-500 mt-1 block">
                  Structured Outputs para OCR de NFS-e, tolerância a layouts escaneados e validação matemática.
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-ihf-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <Lock className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Client-Side Arch</span>
                </div>
                <div className="text-sm font-bold text-ihf-slate-900">JSZip Browser Compiling</div>
                <span className="text-xs text-ihf-slate-500 mt-1 block">
                  Compilação em memória sem limite de 4.5 MB da Vercel e sem risco de timeout de 10 segundos.
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-ihf-slate-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-ihf-slate-900 uppercase tracking-wider mb-2">
                Conformidade Legal & LGPD (legal-advisor)
              </h2>
              <p className="text-xs text-ihf-slate-600 leading-relaxed">
                O iHubFiscal adota arquitetura de segurança por design. Dados pessoais de prestadores e fornecedores são tratados exclusivamente para finalidade de adimplemento contratual e cumprimento de obrigação legal e tributária (Art. 7º, incisos II e V da Lei Geral de Proteção de Dados - Lei nº 13.709/2018). Todos os arquivos armazenados no Supabase Storage possuem controle criptográfico por hash SHA-256 e trilha de auditoria contábil.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
