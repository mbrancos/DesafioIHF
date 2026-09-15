import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Validação de Migrações e Seed do PostgreSQL (Supabase)', () => {
  const migrationPath = path.resolve(__dirname, '../../supabase/migrations/20260915000000_initial_schema.sql');
  const seedPath = path.resolve(__dirname, '../../supabase/seed.sql');

  it('deve existir o arquivo de migração DDL inicial', () => {
    expect(fs.existsSync(migrationPath)).toBe(true);
  });

  it('deve conter todas as 7 tabelas relacionais obrigatórias do iHubFiscal', () => {
    const ddl = fs.readFileSync(migrationPath, 'utf-8');
    const requiredTables = [
      'companies',
      'cost_centers',
      'users',
      'suppliers',
      'approval_levels',
      'invoices',
      'invoice_events',
    ];

    requiredTables.forEach((table) => {
      expect(ddl).toContain(`CREATE TABLE IF NOT EXISTS public.${table}`);
    });
  });

  it('deve declarar as 5 fases do ciclo de vida e a taxonomia de 6 centros de custo', () => {
    const ddl = fs.readFileSync(migrationPath, 'utf-8');
    // 5 fases
    ['TRIAGEM', 'AGUARDANDO_APROVACAO', 'RECUSADO', 'AGENDADO_PAGAMENTO', 'PAGO'].forEach((phase) => {
      expect(ddl).toContain(phase);
    });

    // 6 centros de custo
    [
      'tecnologia_inovacao',
      'facilities_coworking',
      'marketing_comunicacao',
      'eventos_producao',
      'projetos_aceleracao',
      'administrativo_legal',
    ].forEach((cc) => {
      expect(ddl).toContain(cc);
    });
  });

  it('deve conter configuração dos buckets invoices e payment-proofs com CORS', () => {
    const ddl = fs.readFileSync(migrationPath, 'utf-8');
    expect(ddl).toContain('storage.buckets');
    expect(ddl).toContain("'invoices'");
    expect(ddl).toContain("'payment-proofs'");
  });

  it('deve conter as 4 empresas e os 4 usuários de teste no seed.sql', () => {
    expect(fs.existsSync(seedPath)).toBe(true);
    const seed = fs.readFileSync(seedPath, 'utf-8');

    // 4 empresas da holding
    expect(seed).toContain('Impact Hub Floripa');
    expect(seed).toContain('Salto Aceleradora');
    expect(seed).toContain('Impacta Mais');
    expect(seed).toContain('Seu PêJota');

    // 4 perfis de teste
    ['analista', 'gestor', 'cfo', 'admin'].forEach((role) => {
      expect(seed).toContain(role);
    });
  });
});
