import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Design System iHubFiscal (docs/designIHF.md)', () => {
  const globalsCssPath = path.resolve(__dirname, '../../src/app/globals.css');
  const buttonPath = path.resolve(__dirname, '../../src/components/common/Button.tsx');
  const badgePath = path.resolve(__dirname, '../../src/components/common/Badge.tsx');
  const modalPath = path.resolve(__dirname, '../../src/components/common/Modal.tsx');

  it('deve possuir globals.css com tokens de cores reais e variáveis de fonte', () => {
    expect(fs.existsSync(globalsCssPath)).toBe(true);
    const css = fs.readFileSync(globalsCssPath, 'utf-8');
    // Bordô primário oficial da marca
    expect(css).toContain('#812926');
    // Off-white quente de background
    expect(css).toContain('#f7f6f2');
    // Cores semânticas isoladas
    expect(css).toContain('#16A34A');
    expect(css).toContain('#D97706');
    expect(css).toContain('#DC2626');
  });

  it('deve possuir componente Button implementando as variantes oficiais', () => {
    expect(fs.existsSync(buttonPath)).toBe(true);
    const code = fs.readFileSync(buttonPath, 'utf-8');
    expect(code).toContain('Button');
    expect(code).toContain('variant');
    expect(code).toContain('primary');
  });

  it('deve possuir componente Badge com mapeamento de status fiscal', () => {
    expect(fs.existsSync(badgePath)).toBe(true);
    const code = fs.readFileSync(badgePath, 'utf-8');
    expect(code).toContain('Badge');
    expect(code).toContain('success');
    expect(code).toContain('warning');
    expect(code).toContain('error');
  });

  it('deve possuir componente Modal acessível com backdrop blur', () => {
    expect(fs.existsSync(modalPath)).toBe(true);
    const code = fs.readFileSync(modalPath, 'utf-8');
    expect(code).toContain('Modal');
    expect(code).toContain('isOpen');
    expect(code).toContain('onClose');
  });
});
