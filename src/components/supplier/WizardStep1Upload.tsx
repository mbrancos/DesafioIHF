'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { calculateSha256 } from '@/lib/crypto';
import {
  UploadCloud,
  FileCheck,
  AlertCircle,
  AlertTriangle,
  FileCode,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Edit3,
} from 'lucide-react';

interface WizardStep1UploadProps {
  onProcessed: (data: any, pdfFile: File, hashSha256: string) => void;
}

export const WizardStep1Upload: React.FC<WizardStep1UploadProps> = ({ onProcessed }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAiUnavailable, setIsAiUnavailable] = useState<boolean>(false);
  const [lastHashSha256, setLastHashSha256] = useState<string>('');

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setIsAiUnavailable(false);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Apenas arquivos no formato PDF são aceitos para a Nota Fiscal.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('O arquivo PDF excede o limite máximo de 4 MB.');
      return;
    }

    setPdfFile(file);
  };

  const handleXmlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.xml')) {
      setXmlFile(file);
    }
  };

  const handleProcess = async () => {
    if (!pdfFile) {
      setError('Selecione o arquivo PDF da NFS-e para continuar.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setIsAiUnavailable(false);

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      if (xmlFile) {
        formData.append('xml', xmlFile);
      }

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.hash_sha256) {
        setLastHashSha256(result.hash_sha256);
      }

      if (!response.ok || !result.success) {
        // Detecta se é erro 503 / indisponibilidade / alta demanda do Google AI
        if (
          response.status === 503 ||
          result.isUnavailable ||
          result.error?.includes('503') ||
          result.error?.includes('alta demanda') ||
          result.error?.includes('demand')
        ) {
          setIsAiUnavailable(true);
          setError(
            'Os servidores de IA estão com alta demanda temporária no momento. Você pode tentar novamente em alguns segundos ou prosseguir com o preenchimento manual.'
          );
          return;
        }

        // Garante que nenhuma string JSON bruta seja exibida na tela
        let cleanError = result.error || 'Falha ao processar a nota fiscal.';
        if (typeof cleanError === 'string' && cleanError.trim().startsWith('{')) {
          try {
            const parsed = JSON.parse(cleanError);
            cleanError =
              parsed?.error?.message ||
              parsed?.message ||
              'Falha na comunicação com o leitor de IA.';
          } catch {
            cleanError = 'Falha na leitura automática do documento fiscal.';
          }
        }
        throw new Error(cleanError);
      }

      onProcessed(result.data, pdfFile, result.hash_sha256);
    } catch (err: any) {
      let msg = err.message || 'Erro inesperado durante a leitura da nota fiscal.';
      if (typeof msg === 'string' && msg.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(msg);
          msg =
            parsed?.error?.message ||
            parsed?.message ||
            'Falha na comunicação com o leitor de IA.';
        } catch {
          msg = 'Falha no processamento automático do documento.';
        }
      }
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Modo Contingência: permite ao fornecedor avançar mesmo com a IA indisponível
   */
  const handleManualContingency = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    try {
      // 1. Preservação do SHA-256: usa o já calculado ou gera via Web Crypto no cliente
      let hash = lastHashSha256;
      if (!hash) {
        const arrayBuffer = await pdfFile.arrayBuffer();
        hash = await calculateSha256(arrayBuffer);
      }

      // 2. Estrutura com campos zerados e pontuação 0 para entrada manual
      const contingencyData = {
        cnpj_prestador: '',
        razao_social_prestador: '',
        chave_pix: '',
        dados_bancarios: '',
        cnpj_tomador: '11111111000111', // Padrão: Impact Hub Floripa
        numero_nota: '',
        codigo_verificacao: '',
        data_emissao: new Date().toISOString().split('T')[0],
        data_vencimento: '',
        valor_bruto_centavos: 0,
        valor_liquido_centavos: 0,
        iss_centavos: 0,
        irrf_centavos: 0,
        pis_cofins_csll_centavos: 0,
        descricao_servico: '',
        centro_custo_sugerido: 'tecnologia_inovacao',
        confidence_score: 0,
        is_contingency: true,
      };

      onProcessed(contingencyData, pdfFile, hash);
    } catch (err: any) {
      console.error('Erro ao acionar contingência manual:', err);
      setError('Falha ao calcular hash do arquivo para modo manual. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-10 shadow-card">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#812926] font-['Poppins']">
          Envio de Nota Fiscal de Serviços (NFS-e)
        </h2>
        <p className="text-xs sm:text-sm text-[#484848] mt-1.5">
          Faça o upload do documento em PDF. Nossa IA multimodal extrairá os dados para sua conferência.
        </p>
      </div>

      {/* Banner de Erro com Modo de Contingência */}
      {error && (
        <div className="mb-6 p-4 rounded-xl border border-[#fde68a] bg-[#fffbeb] text-[#212020] animate-fadeIn">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-[#D97706] font-['Poppins'] mb-1 text-sm">
                {isAiUnavailable
                  ? 'Leitura Automática Temporariamente Indisponível'
                  : 'Aviso de Processamento'}
              </h4>
              <p className="text-[#484848] leading-relaxed mb-3">{error}</p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleProcess}
                  isLoading={isProcessing}
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Tentar Novamente
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleManualContingency}
                  isLoading={isProcessing}
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                  Continuar e Preencher Manualmente
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dropzone PDF */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-[#212020] mb-2 font-['Poppins']">
          PDF da Nota Fiscal (Obrigatório · Máx. 4 MB)
        </label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            pdfFile
              ? 'border-[#16A34A] bg-[#f0fdf4]'
              : 'border-[#e5e5e5] hover:border-[#812926] bg-[#f7f6f2]'
          }`}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handlePdfChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {pdfFile ? (
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-10 h-10 text-[#16A34A] mb-2" />
              <p className="text-sm font-semibold text-[#212020] font-['Poppins']">
                {pdfFile.name}
              </p>
              <p className="text-xs text-[#484848] mt-0.5">
                {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB · Clique para substituir
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud className="w-10 h-10 text-[#812926] mb-2" />
              <p className="text-sm font-semibold text-[#212020] font-['Poppins']">
                Arraste seu PDF aqui ou clique para selecionar
              </p>
              <p className="text-xs text-[#c1c1c1] mt-1">Formatos aceitos: PDF</p>
            </div>
          )}
        </div>

        <div className="mt-2 text-right">
          <button
            type="button"
            onClick={async () => {
              try {
                const res = await fetch('/samples/sample.pdf');
                const blob = await res.blob();
                const file = new File([blob], 'NF-2026189-ImpactaMais-Eventos.pdf', {
                  type: 'application/pdf',
                });
                setPdfFile(file);
                setError(null);
                setIsAiUnavailable(false);
              } catch (e) {
                console.error('Erro ao carregar amostra:', e);
              }
            }}
            className="text-[11px] text-[#812926] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>Carregar PDF de Demonstração (MegaSom NFS-e 2026189)</span>
          </button>
        </div>
      </div>

      {/* Input Opcional XML */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-[#484848] mb-1.5 font-['Poppins']">
          Arquivo XML da NFS-e (Opcional)
        </label>
        <div className="flex items-center gap-3 p-3 bg-[#f7f6f2] border border-[#e5e5e5] rounded-lg">
          <FileCode className="w-5 h-5 text-[#1c395c]" />
          <input
            type="file"
            accept=".xml,text/xml"
            onChange={handleXmlChange}
            className="text-xs text-[#484848] file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#e5e5e5] file:text-[#212020] hover:file:bg-[#d4d4d4]"
          />
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={handleProcess}
        isLoading={isProcessing}
        disabled={!pdfFile || isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Lendo e Interpretando Documento com IA...' : 'Processar Documento e Conferir Dados'}
      </Button>
    </div>
  );
};
