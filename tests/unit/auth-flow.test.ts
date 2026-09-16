import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { PERSONAS } from '../../src/components/auth/PersonaSwitcher';

describe('Fluxo de Autenticação e Demonstração da Banca (Rota /)', () => {
  const loginPagePath = path.resolve(__dirname, '../../src/app/page.tsx');
  const authActionPath = path.resolve(__dirname, '../../src/actions/auth.ts');

  it('deve conter as 4 personas pré-configuradas para validação da banca', () => {
    expect(PERSONAS).toBeDefined();
    expect(PERSONAS.length).toBe(4);

    const roles = PERSONAS.map((p) => p.role);
    expect(roles).toContain('analista');
    expect(roles).toContain('gestor');
    expect(roles).toContain('cfo');
    expect(roles).toContain('admin');
  });

  it('deve possuir a Server Action de login de persona implementada', () => {
    expect(fs.existsSync(authActionPath)).toBe(true);
    const code = fs.readFileSync(authActionPath, 'utf-8');
    expect(code).toContain('loginWithPersona');
    expect(code).toContain('logout');
  });

  it('deve possuir o link de autoatendimento para o fornecedor em /upload na tela de login', () => {
    expect(fs.existsSync(loginPagePath)).toBe(true);
    const code = fs.readFileSync(loginPagePath, 'utf-8');
    expect(code).toContain('/upload');
    expect(code).toContain('fornecedor');
  });
});
