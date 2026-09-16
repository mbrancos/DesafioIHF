import { NextRequest, NextResponse } from 'next/server';
import { calculateSha256 } from '@/lib/crypto';
import { extractInvoiceDataWithGemini } from '@/lib/gemini';

// Diretivas obrigatórias de execução serverless Node.js
export const runtime = 'nodejs';
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB em bytes

export async function POST(request: Request | NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo de nota fiscal foi enviado.' },
        { status: 400 }
      );
    }

    // 1. Validação de formato (PDF obrigatório)
    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      return NextResponse.json(
        { error: 'Formato de arquivo inválido. Apenas documentos PDF são aceitos.' },
        { status: 400 }
      );
    }

    // 2. Trava de tamanho de arquivo (máximo de 4 MB)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `O arquivo excede o limite máximo permitido de 4 MB. Tamanho recebido: ${(
            file.size /
            (1024 * 1024)
          ).toFixed(2)} MB.`,
        },
        { status: 413 }
      );
    }

    let hashSha256 = '';
    try {
      // 3. Conversão para ArrayBuffer e cálculo de SHA-256
      const arrayBuffer = await file.arrayBuffer();
      hashSha256 = await calculateSha256(arrayBuffer);

      // 4. Invocação do Gemini via fail-fast com fallback de modelos
      const extractedData = await extractInvoiceDataWithGemini(arrayBuffer);

      return NextResponse.json({
        success: true,
        hash_sha256: hashSha256,
        fileName: file.name,
        fileSize: file.size,
        data: extractedData,
      });
    } catch (innerError: any) {
      console.error('Erro na extração com IA:', innerError);

      const isUnavailable =
        innerError?.message?.includes('503') ||
        innerError?.message?.includes('UNAVAILABLE') ||
        innerError?.status === 503;

      let rawMsg = innerError?.message || '';
      if (typeof rawMsg === 'string' && rawMsg.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(rawMsg);
          rawMsg = parsed?.error?.message || parsed?.message || 'Falha na comunicação com o serviço de IA.';
        } catch {
          rawMsg = 'Falha no processamento automático do documento fiscal.';
        }
      }

      const userFriendlyMessage = isUnavailable
        ? 'O serviço de inteligência artificial está temporariamente com alta demanda. Você pode tentar novamente em alguns segundos ou prosseguir com a conferência manual.'
        : rawMsg || 'Falha durante a extração automática dos dados fiscais.';

      return NextResponse.json(
        {
          success: false,
          isUnavailable,
          hash_sha256: hashSha256,
          error: userFriendlyMessage,
        },
        { status: isUnavailable ? 503 : 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro geral na rota de extração:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Falha inesperada no processamento do documento fiscal.',
      },
      { status: 500 }
    );
  }
}
