'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, FileText, Maximize2 } from 'lucide-react';

export interface PdfViewerProps {
  url?: string;
  file?: File | null;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url, file }) => {
  const [zoom, setZoom] = useState<number>(100);

  // Se tiver um arquivo File em memória, cria ObjectURL
  const fileUrl = React.useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return url;
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

  return (
    <div className="flex flex-col h-full bg-[#333333] rounded-xl overflow-hidden border border-[#e5e5e5] shadow-inner">
      {/* Barra de Ferramentas de Zoom */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#212020] text-white text-xs border-b border-[#414141]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#41bed0]" />
          <span className="font-medium truncate max-w-[200px]">
            {file?.name || 'Documento Fiscal (NFS-e)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.max(50, prev - 15))}
            className="p-1 hover:bg-[#414141] rounded transition-colors"
            title="Diminuir Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-[11px] w-10 text-center">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.min(200, prev + 15))}
            className="p-1 hover:bg-[#414141] rounded transition-colors"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:bg-[#414141] rounded transition-colors ml-1"
            title="Abrir em Nova Aba"
          >
            <Maximize2 className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Área de Visualização do Documento */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-start min-h-[500px]">
        <div
          style={{ width: `${zoom}%`, transition: 'width 0.2s ease-out' }}
          className="bg-white shadow-2xl rounded-sm overflow-hidden min-h-[600px] flex flex-col"
        >
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0`}
            className="w-full h-[650px] border-none"
            title="Pré-visualização da NFS-e"
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
