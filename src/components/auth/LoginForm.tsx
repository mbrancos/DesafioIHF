'use client';

import React, { useState, useTransition } from 'react';
import { loginWithCredentials } from '@/actions/auth';
import { Button } from '@/components/common/Button';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginWithCredentials(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs text-[#DC2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-[#212020] mb-1.5 font-['Poppins']">
          E-mail Corporativo
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c1c1c1]" />
          <input
            type="email"
            name="email"
            required
            placeholder="colaborador@impacthub.net"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#ffffff] border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#812926] focus:ring-1 focus:ring-[#812926] transition-colors"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-[#212020] font-['Poppins']">
            Senha de Acesso
          </label>
          <a href="#" className="text-[11px] text-[#812926] hover:underline">
            Esqueceu?
          </a>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c1c1c1]" />
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#ffffff] border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#812926] focus:ring-1 focus:ring-[#812926] transition-colors"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isPending}
        className="w-full mt-2"
      >
        Entrar no Sistema
      </Button>
    </form>
  );
};
