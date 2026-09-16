'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  KanbanSquare,
  CheckSquare,
  CreditCard,
  Archive,
  UploadCloud,
  Settings,
  ExternalLink,
  LogOut,
  UserCheck,
  Menu,
  X,
  ChevronDown,
  Check,
} from 'lucide-react';
import { signOut, loginWithPersona } from '@/actions/auth';

interface NavbarProps {
  userRole?: string;
  userName?: string;
}

const PERSONAS = [
  {
    role: 'analista' as const,
    name: 'Carlos Financeiro',
    badge: 'analista',
    description: 'Operação diária e retenções',
    icon: '👤',
    badgeColor: 'bg-[#e0f2fe] text-[#1c395c]',
  },
  {
    role: 'gestor' as const,
    name: 'Beatriz Inovação',
    badge: 'gestor',
    description: 'Alçada até R$ 10.000,00',
    icon: '✨',
    badgeColor: 'bg-[#fef3c7] text-[#b45309]',
  },
  {
    role: 'cfo' as const,
    name: 'Rodrigo Controller',
    badge: 'cfo',
    description: 'Alçada ilimitada e fechamento',
    icon: '🛡️',
    badgeColor: 'bg-[#fde2ce] text-[#812926]',
  },
  {
    role: 'admin' as const,
    name: 'Mariana Admin',
    badge: 'admin',
    description: 'Parametrização e holding',
    icon: '⚙️',
    badgeColor: 'bg-[#dcfce7] text-[#16a34a]',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  userRole = 'analista',
  userName = 'Carlos Financeiro',
}) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isSwitchingRole, setIsSwitchingRole] = useState(false);

  const navItems = [
    { label: 'Kanban', href: '/kanban', icon: KanbanSquare },
    { label: 'Aprovações', href: '/aprovacoes', icon: CheckSquare },
    { label: 'Pagamentos', href: '/pagamentos', icon: CreditCard },
    { label: 'Fechamento', href: '/fechamento', icon: Archive },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Configurações', href: '/configuracoes', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const handleSwitchRole = async (targetRole: 'analista' | 'gestor' | 'cfo' | 'admin') => {
    if (targetRole === userRole) {
      setRoleDropdownOpen(false);
      return;
    }
    setIsSwitchingRole(true);
    try {
      await loginWithPersona(targetRole, pathname);
    } catch {
      window.location.reload();
    } finally {
      setIsSwitchingRole(false);
      setRoleDropdownOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo iHubFiscal */}
          <div className="flex items-center gap-6">
            <Link href="/kanban" className="flex items-center gap-2.5 group">
              <img
                src="/img/logo-impact-hub.svg"
                alt="Impact Hub"
                className="w-8 h-8 rounded-lg shadow-sm shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-[#212020] font-['Poppins'] tracking-tight leading-none">
                  iHubFiscal
                </span>
                <span className="text-[10px] font-semibold text-[#812926] tracking-wider uppercase leading-none mt-1">
                  Companhia de Impacto
                </span>
              </div>
            </Link>

            {/* Links desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors font-['Poppins'] ${
                      isActive
                        ? 'bg-[#812926]/10 text-[#812926]'
                        : 'text-[#484848] hover:text-[#212020] hover:bg-[#f7f6f2]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Ações da direita e Perfil */}
          <div className="hidden md:flex items-center gap-3">
            {/* Atalho Fornecedor */}
            <Link
              href="/upload"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1c395c] bg-[#e0f2fe] hover:bg-[#bae6fd] rounded-lg transition-colors"
              title="Portal de envio de nota do fornecedor"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Portal Fornecedor</span>
            </Link>

            {/* Link Legado da Fase 1 */}
            <Link
              href="/portal"
              target="_blank"
              className="flex items-center gap-1 text-[11px] text-[#484848] hover:text-[#812926] px-2 py-1 rounded transition-colors"
              title="Abrir Landing Page Executiva do Desafio Técnico"
            >
              <span>Landing Fase 1</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* Identificação de Usuário / Dropdown de Troca de Persona */}
            <div className="relative pl-2 border-l border-[#e5e5e5]">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-transparent hover:border-[#e5e5e5] hover:bg-[#f7f6f2] transition-all cursor-pointer group"
                title="Clique para alternar o perfil de acesso"
              >
                <div className="text-right">
                  <p className="text-xs font-bold text-[#212020] leading-none group-hover:text-[#812926] transition-colors">
                    {userName}
                  </p>
                  <span className="text-[10px] font-bold text-[#812926] uppercase leading-none mt-0.5 inline-block">
                    {userRole}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#717171] transition-transform duration-200 ${
                    roleDropdownOpen ? 'rotate-180 text-[#812926]' : ''
                  }`}
                />
              </button>

              {/* Backdrop para fechar ao clicar fora */}
              {roleDropdownOpen && (
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setRoleDropdownOpen(false)}
                />
              )}

              {/* Dropdown Menu */}
              {roleDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#e5e5e5] p-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-[#f3f4f5]">
                    <p className="text-[10px] font-bold text-[#812926] uppercase tracking-wider font-['Poppins']">
                      Alternar Alçada (1 Clique)
                    </p>
                    <p className="text-[11px] text-[#717171]">
                      Mude o perfil para testar limites e permissões
                    </p>
                  </div>

                  <div className="py-1 space-y-1">
                    {PERSONAS.map((p) => {
                      const isCurrent = userRole === p.role;
                      return (
                        <button
                          key={p.role}
                          onClick={() => handleSwitchRole(p.role)}
                          disabled={isSwitchingRole}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                            isCurrent
                              ? 'bg-[#812926]/10 border border-[#812926]/30'
                              : 'hover:bg-[#f7f6f2]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{p.icon}</span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-[#212020] font-['Poppins']">
                                  {p.name}
                                </span>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${p.badgeColor}`}
                                >
                                  {p.badge}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#717171] block mt-0.5">
                                {p.description}
                              </span>
                            </div>
                          </div>
                          {isCurrent && (
                            <Check className="w-4 h-4 text-[#812926] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-[#f3f4f5]">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#fee2e2] rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair da conta</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botão Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#484848] hover:text-[#212020] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive
                    ? 'bg-[#812926]/10 text-[#812926]'
                    : 'text-[#484848] hover:bg-[#f7f6f2]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#e5e5e5] space-y-2">
            <div className="px-1 py-1">
              <span className="text-[10px] font-bold text-[#812926] uppercase tracking-wider block mb-1 font-['Poppins']">
                Trocar Alçada (1 Clique):
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PERSONAS.map((p) => (
                  <button
                    key={p.role}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSwitchRole(p.role);
                    }}
                    className={`p-1.5 rounded-lg text-left text-[11px] font-semibold flex items-center gap-1.5 border transition-colors ${
                      userRole === p.role
                        ? 'bg-[#812926]/10 border-[#812926]/40 text-[#812926]'
                        : 'bg-[#f7f6f2] border-[#e5e5e5] text-[#212020]'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="truncate">{p.name.split(' ')[0]} ({p.badge})</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1c395c] bg-[#e0f2fe] rounded-lg"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Portal do Fornecedor</span>
            </Link>
            <Link
              href="/portal"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-[#484848]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Landing Page Fase 1</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#fee2e2] rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair ({userName} - {userRole})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
