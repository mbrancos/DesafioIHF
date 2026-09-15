import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { PersonaSwitcher } from '@/components/auth/PersonaSwitcher';
import { FileUp, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#f7f6f2]">
      {/* Barra Superior Minimalista */}
      <header className="w-full border-b border-[#e5e5e5] bg-[#ffffff] py-3.5 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/img/logo-impact-hub.svg"
            alt="Impact Hub"
            className="w-8 h-8 rounded-lg shadow-sm shrink-0"
          />
          <div>
            <span className="text-base font-bold text-[#812926] font-['Poppins'] tracking-tight">
              iHubFiscal
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] text-[#414141] font-medium border-l border-[#e5e5e5] pl-2">
              Companhia de Impacto
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/portal"
            target="_blank"
            className="text-xs font-semibold text-[#1c395c] hover:text-[#812926] flex items-center gap-1.5 transition-colors"
          >
            <span>Ver Entregáveis Fase 1</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Conteúdo Central: Card de Autenticação */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-xl bg-[#ffffff] rounded-2xl shadow-card border border-[#e5e5e5] p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fde2ce] text-[#812926] text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Governança Fiscal & Contas a Pagar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#812926] font-['Poppins'] tracking-tight">
              Acesso Corporativo
            </h1>
            <p className="text-xs sm:text-sm text-[#484848] mt-1">
              Central de autorizações, triagem com IA e alçadas da holding
            </p>
          </div>

          {/* Formulário Tradicional */}
          <LoginForm />

          {/* Atalhos Rápidos para a Banca Avaliadora */}
          <PersonaSwitcher />
        </div>
      </div>

      {/* Banner de Autoatendimento do Fornecedor */}
      <footer className="w-full border-t border-[#e5e5e5] bg-[#ffffff] py-4 px-6 sm:px-12">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#e2f5f8] text-[#1c395c]">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#212020] font-['Poppins']">
                É fornecedor ou prestador PJ?
              </p>
              <p className="text-[11px] text-[#484848]">
                Envie sua NFS-e por aqui sem necessidade de login prévio
              </p>
            </div>
          </div>

          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#41bed0] text-[#1c395c] font-semibold text-xs hover:bg-[#34a7b8] transition-colors whitespace-nowrap font-['Poppins']"
          >
            <span>Portal de Envio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
