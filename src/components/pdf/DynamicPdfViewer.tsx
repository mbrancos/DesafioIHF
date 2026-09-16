'use client';

import dynamic from 'next/dynamic';
import type { PdfViewerProps } from './PdfViewer';

/**
 * Renderizador de PDF importado dinamicamente com ssr: false
 * Previne conflitos de DOM, Canvas ou Window no SSR da Vercel
 */
export const DynamicPdfViewer = dynamic<PdfViewerProps>(
  () => import('./PdfViewer').then((mod) => mod.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-full min-h-[450px] bg-[#f7f6f2] rounded-xl border border-[#e5e5e5] text-[#414141] text-xs">
        <div className="w-8 h-8 border-3 border-[#812926] border-t-transparent rounded-full animate-spin mb-3" />
        <span>Carregando visualizador de documento...</span>
      </div>
    ),
  }
);
