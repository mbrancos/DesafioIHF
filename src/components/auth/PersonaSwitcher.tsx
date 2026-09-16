'use client';

import React, { useTransition } from 'react';
import { loginWithPersona } from '@/actions/auth';
import { Badge } from '@/components/common/Badge';
import { UserCheck, ShieldAlert, Sparkles, Settings } from 'lucide-react';

export interface PersonaItem {
  role: 'analista' | 'gestor' | 'cfo' | 'admin';
  name: string;
  email: string;
  title: string;
  description: string;
  badgeVariant: 'info' | 'warning' | 'brand' | 'lime';
  icon: any;
}

export const PERSONAS: PersonaItem[] = [
  {
    role: 'analista',
    name: 'Carlos Financeiro',
    email: 'analista@impacthub.net',
    title: 'Analista Financeiro',
    description: 'Operação diária, conferência de retenções e baixas bancárias com comprovante',
    badgeVariant: 'info',
    icon: UserCheck,
  },
  {
    role: 'gestor',
    name: 'Beatriz Inovação',
    email: 'gestor@impacthub.net',
    title: 'Gestor de Inovação',
    description: 'Aprovação técnica de serviços com teto de alçada de até R$ 10.000,00',
    badgeVariant: 'warning',
    icon: Sparkles,
  },
  {
    role: 'cfo',
    name: 'Rodrigo Controller',
    email: 'cfo@impacthub.net',
    title: 'CFO / Controller',
    description: 'Governança consolidada, aprovações extraordinárias e fechamento contábil',
    badgeVariant: 'brand',
    icon: ShieldAlert,
  },
  {
    role: 'admin',
    name: 'Mariana Admin',
    email: 'admin@impacthub.net',
    title: 'Administrador',
    description: 'Parametrização de empresas da holding, centros de custo e permissões',
    badgeVariant: 'lime',
    icon: Settings,
  },
];

export const PersonaSwitcher: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  const handleSelectPersona = (role: 'analista' | 'gestor' | 'cfo' | 'admin') => {
    startTransition(async () => {
      await loginWithPersona(role);
    });
  };

  return (
    <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#812926] font-['Poppins']">
          ⚡ Acesso Rápido para a Banca Avaliadora
        </h4>
        <span className="text-[11px] text-[#414141] font-medium">1 clique para alternar alçada</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PERSONAS.map((persona) => {
          const Icon = persona.icon;
          return (
            <button
              key={persona.role}
              onClick={() => handleSelectPersona(persona.role)}
              disabled={isPending}
              className="flex flex-col text-left p-3.5 rounded-lg border border-[#e5e5e5] bg-[#ffffff] hover:border-[#812926] hover:shadow-md transition-all group disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1.5 w-full">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-[#f7f6f2] text-[#812926] group-hover:bg-[#812926] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-xs text-[#212020] font-['Poppins']">
                    {persona.title}
                  </span>
                </div>
                <Badge variant={persona.badgeVariant} size="sm">
                  {persona.role}
                </Badge>
              </div>
              <p className="text-[11px] text-[#484848] line-clamp-2 leading-relaxed">
                {persona.description}
              </p>
              <span className="text-[10px] text-[#c1c1c1] mt-2 font-mono">{persona.email}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
