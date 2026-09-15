import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { generateProtocol } from '../../src/actions/invoices';

describe('Portal do Fornecedor (Wizard /upload e Split-View)', () => {
  const dynamicViewerPath = path.resolve(__dirname, '../../src/components/pdf/DynamicPdfViewer.tsx');
  const uploadPagePath = path.resolve(__dirname, '../../src/app/upload/page.tsx');
  const invoiceActionPath = path.resolve(__dirname, '../../src/actions/invoices.ts');

  it('deve gerar número de protocolo padronizado no formato IHF-2026-XXXX', () => {
    const protocol = generateProtocol();
    expect(protocol).toMatch(/^IHF-2026-[A-Z0-9]{4,6}$/);
  });

  it('deve possuir DynamicPdfViewer configurado com ssr: false', () => {
    expect(fs.existsSync(dynamicViewerPath)).toBe(true);
    const code = fs.readFileSync(dynamicViewerPath, 'utf-8');
    expect(code).toContain('dynamic');
    expect(code).toContain('ssr: false');
  });

  it('deve possuir Server Action createInvoice para persistência em TRIAGEM', () => {
    expect(fs.existsSync(invoiceActionPath)).toBe(true);
    const code = fs.readFileSync(invoiceActionPath, 'utf-8');
    expect(code).toContain('createInvoice');
    expect(code).toContain('TRIAGEM');
  });

  it('deve renderizar o wizard na rota /upload', () => {
    expect(fs.existsSync(uploadPagePath)).toBe(true);
    const code = fs.readFileSync(uploadPagePath, 'utf-8');
    expect(code).toContain('WizardStep1Upload');
    expect(code).toContain('WizardStep2SplitView');
  });
});
