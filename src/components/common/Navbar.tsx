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
} from 'lucide-react';
import { signOut } from '@/actions/auth';

interface NavbarProps {
  userRole?: string;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  userRole = 'analista',
  userName = 'Carlos Financeiro',
}) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo iHubFiscal */}
          <div className="flex items-center gap-6">
            <Link href="/kanban" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#812926] flex items-center justify-center text-white font-bold font-['Poppins'] text-base shadow-sm">
                iH
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-[#212020] font-['Poppins'] tracking-tight leading-none">
                  iHubFiscal
                </span>
                <span className="text-[10px] font-semibold text-[#812926] tracking-wider uppercase leading-none mt-0.5">
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

            {/* Identificação de Usuário / Persona */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#e5e5e5]">
              <div className="text-right">
                <p className="text-xs font-bold text-[#212020] leading-none">
                  {userName}
                </p>
                <span className="text-[10px] font-bold text-[#812926] uppercase leading-none">
                  {userRole}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="p-1.5 text-[#c1c1c1] hover:text-[#DC2626] hover:bg-[#fee2e2] rounded-lg transition-colors"
                title="Sair / Trocar de Usuário"
              >
                <LogOut className="w-4 h-4" />
              </button>
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
