import { describe, it, expect, vi } from 'vitest';
import { POST } from '../../src/app/api/extract/route';
import { extractInvoiceDataWithGemini, INVOICE_EXTRACTION_SCHEMA } from '../../src/lib/gemini';

describe('Route Handler de IA: Extração de NFS-e (/api/extract)', () => {
  it('deve possuir schema JSON estruturado com todos os campos fiscais', () => {
    expect(INVOICE_EXTRACTION_SCHEMA).toBeDefined();
    expect(INVOICE_EXTRACTION_SCHEMA.properties).toHaveProperty('cnpj_prestador');
    expect(INVOICE_EXTRACTION_SCHEMA.properties).toHaveProperty('cnpj_tomador');
    expect(INVOICE_EXTRACTION_SCHEMA.properties).toHaveProperty('numero_nota');
    expect(INVOICE_EXTRACTION_SCHEMA.properties).toHaveProperty('valor_bruto_centavos');
    expect(INVOICE_EXTRACTION_SCHEMA.properties).toHaveProperty('valor_liquido_centavos');
    expect(INVOICE_EXTRACTION_SCHEMA.properties).toHaveProperty('confidence_score');
  });

  it('deve rejeitar requisição sem arquivo com status 400', async () => {
    const formData = new FormData();
    const request = new Request('http://localhost:3000/api/extract', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Nenhum arquivo');
  });

  it('deve rejeitar arquivo que não seja PDF com status 400', async () => {
    const formData = new FormData();
    const fakeFile = new File(['fake content'], 'test.txt', { type: 'text/plain' });
    formData.append('file', fakeFile);

    const request = new Request('http://localhost:3000/api/extract', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('PDF');
  });

  it('deve rejeitar arquivo com tamanho superior a 4 MB com status 413', async () => {
    const formData = new FormData();
    // Cria buffer simulando 4.2 MB
    const largeBuffer = new Uint8Array(4.2 * 1024 * 1024);
    const largeFile = new File([largeBuffer], 'large.pdf', { type: 'application/pdf' });
    formData.append('file', largeFile);

    const request = new Request('http://localhost:3000/api/extract', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(413);
    const body = await response.json();
    expect(body.error).toContain('4 MB');
  });
});
