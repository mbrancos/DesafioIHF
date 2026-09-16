'use client';

import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, FileText, Maximize2, RotateCcw } from 'lucide-react';

export interface PdfViewerProps {
  url?: string;
  file?: File | null;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url, file }) => {
  const [zoom, setZoom] = useState<number>(100);
  const [fileUrl, setFileUrl] = useState<string | undefined>(url);

  // Gerencia ObjectURL com limpeza segura contra memory leaks
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFileUrl(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setFileUrl(url);
    }
  }, [file, url]);

  if (!fileUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[450px] p-8 border-2 border-dashed border-[#e5e5e5] rounded-xl bg-[#f7f6f2] text-center">
        <FileText className="w-12 h-12 text-[#c1c1c1] mb-3" />
        <p className="text-sm font-semibold text-[#212020] font-['Poppins']">
          Nenhum documento carregado
        </p>
        <p className="text-xs text-[#484848] mt-1">
          O PDF selecionado será renderizado aqui em tela dividida para conferência
        </p>
      </div>
    );
  }

  // Define zoom e visualização fit do PDF
  const viewerSrc = `${fileUrl}#toolbar=0&navpanes=0&view=FitH`;

  return (
    <div className="flex flex-col h-full w-full bg-[#212020] rounded-xl overflow-hidden border border-[#e5e5e5] shadow-sm">
      {/* Barra de Ferramentas de Zoom (Tokens IHF) */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#212020] text-white text-xs border-b border-[#333333] select-none flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <FileText className="w-4 h-4 text-[#41bed0] flex-shrink-0" />
          <span className="font-medium truncate max-w-[200px] text-[12px] text-[#f7f6f2]">
            {file?.name || 'Documento Fiscal (NFS-e)'}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.max(70, prev - 15))}
            className="p-1.5 hover:bg-[#333333] active:bg-[#414141] rounded text-[#f3f4f5] transition-colors"
            title="Diminuir Zoom"
            aria-label="Diminuir Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-10 text-center text-[#e5e5e5] select-none">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.min(175, prev + 15))}
            className="p-1.5 hover:bg-[#333333] active:bg-[#414141] rounded text-[#f3f4f5] transition-colors"
            title="Aumentar Zoom"
            aria-label="Aumentar Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoom !== 100 && (
            <button
              type="button"
              onClick={() => setZoom(100)}
              className="p-1.5 hover:bg-[#333333] active:bg-[#414141] rounded text-[#c1c1c1] hover:text-white transition-colors"
              title="Ajustar à Largura (100%)"
              aria-label="Ajustar à Largura"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-[#333333] active:bg-[#414141] rounded text-[#f3f4f5] hover:text-[#41bed0] transition-colors ml-1"
            title="Abrir em Nova Aba"
            aria-label="Abrir em Nova Aba"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Área de Visualização do Documento (Eliminação de Scroll Duplo) */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-[#2b2b2b] flex items-stretch justify-center">
        <div
          style={{
            width: `${zoom}%`,
            maxWidth: zoom <= 100 ? '100%' : 'none',
            transition: 'width 0.15s ease-out',
          }}
          className="h-full flex flex-col items-stretch"
        >
          <iframe
            src={viewerSrc}
            className="w-full h-full border-none block bg-white"
            title="Pré-visualização da NFS-e"
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
