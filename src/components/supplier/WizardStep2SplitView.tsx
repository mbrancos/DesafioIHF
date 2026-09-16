'use client';

import React, { useState, useTransition } from 'react';
import { DynamicPdfViewer } from '@/components/pdf/DynamicPdfViewer';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { validateTaxMath } from '@/lib/math';
import { formatBRL, formatCNPJ, parseCentavos } from '@/lib/formatters';
import { submitSupplierInvoice } from '@/actions/invoices';
import { CheckCircle2, AlertTriangle, AlertCircle, ShieldCheck, ArrowLeft, Copy, Check } from 'lucide-react';

interface WizardStep2SplitViewProps {
  initialData: any;
  pdfFile: File;
  hashSha256: string;
  onBack: () => void;
}

export const WizardStep2SplitView: React.FC<WizardStep2SplitViewProps> = ({
  initialData,
  pdfFile,
  hashSha256,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    cnpj_prestador: initialData?.cnpj_prestador || '',
    razao_social_prestador: initialData?.razao_social_prestador || '',
    chave_pix: initialData?.chave_pix || '',
    dados_bancarios: initialData?.dados_bancarios || '',
    cnpj_tomador: initialData?.cnpj_tomador || '11111111000111',
    numero_nota: initialData?.numero_nota || '',
    codigo_verificacao: initialData?.codigo_verificacao || '',
    data_emissao: initialData?.data_emissao || '',
    data_vencimento: initialData?.data_vencimento || '',
    valor_bruto: (initialData?.valor_bruto_centavos ? initialData.valor_bruto_centavos / 100 : 0).toFixed(2),
    valor_liquido: (initialData?.valor_liquido_centavos ? initialData.valor_liquido_centavos / 100 : 0).toFixed(2),
    iss: (initialData?.iss_centavos ? initialData.iss_centavos / 100 : 0).toFixed(2),
    irrf: (initialData?.irrf_centavos ? initialData.irrf_centavos / 100 : 0).toFixed(2),
    pis_cofins_csll: (initialData?.pis_cofins_csll_centavos ? initialData.pis_cofins_csll_centavos / 100 : 0).toFixed(2),
    descricao_servico: initialData?.descricao_servico || '',
    centro_custo_sugerido: initialData?.centro_custo_sugerido || 'tecnologia_inovacao',
  });

  const [isPending, startTransition] = useTransition();
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);
  const [copiedProtocol, setCopiedProtocol] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    type: 'DUPLICATE' | 'SERVER_ERROR';
    title: string;
    message: string;
    protocol?: string | null;
  } | null>(null);

  const isContingency = initialData?.confidence_score === 0 || initialData?.is_contingency;

  // Validação matemática em tempo real
  const mathValidation = React.useMemo(() => {
    return validateTaxMath({
      amount_bruto: Math.round(parseFloat(formData.valor_bruto || '0') * 100),
      amount_liquido: Math.round(parseFloat(formData.valor_liquido || '0') * 100),
      iss: Math.round(parseFloat(formData.iss || '0') * 100),
      irrf: Math.round(parseFloat(formData.irrf || '0') * 100),
      pis_cofins_csll: Math.round(parseFloat(formData.pis_cofins_csll || '0') * 100),
    });
  }, [formData.valor_bruto, formData.valor_liquido, formData.iss, formData.irrf, formData.pis_cofins_csll]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
    if (submissionFeedback) setSubmissionFeedback(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSubmissionFeedback(null);

    // Validação estrita de campos obrigatórios para prevenir erros NOT NULL no banco
    if (!formData.numero_nota.trim()) {
      setValidationError('O Número da Nota Fiscal é obrigatório.');
      return;
    }
    const cleanCnpj = formData.cnpj_prestador.replace(/\D/g, '');
    if (cleanCnpj.length < 11) {
      setValidationError('Informe um CNPJ ou CPF válido para o prestador de serviços.');
      return;
    }
    if (!formData.razao_social_prestador.trim()) {
      setValidationError('A Razão Social do prestador é obrigatória.');
      return;
    }
    if (!formData.data_emissao) {
      setValidationError('A Data de Emissão da nota é obrigatória.');
      return;
    }
    if (!formData.data_vencimento) {
      setValidationError('A Data de Vencimento da nota é obrigatória.');
      return;
    }
    const bruto = parseFloat(formData.valor_bruto || '0');
    const liquido = parseFloat(formData.valor_liquido || '0');
    if (bruto <= 0 || liquido <= 0) {
      setValidationError('Os valores Bruto e Líquido devem ser maiores que zero.');
      return;
    }

    startTransition(async () => {
      const payload = new FormData();
      if (pdfFile) {
        payload.append('file', pdfFile);
      }
      payload.append('hash_sha256', hashSha256);
      payload.append('cnpj_prestador', formData.cnpj_prestador);
      payload.append('razao_social_prestador', formData.razao_social_prestador);
      payload.append('chave_pix', formData.chave_pix);
      payload.append('dados_bancarios', formData.dados_bancarios);
      payload.append('cnpj_tomador', formData.cnpj_tomador);
      payload.append('numero_nota', formData.numero_nota);
      payload.append('codigo_verificacao', formData.codigo_verificacao);
      payload.append('data_emissao', formData.data_emissao);
      payload.append('data_vencimento', formData.data_vencimento);
      payload.append('valor_bruto_centavos', String(Math.round(bruto * 100)));
      payload.append('valor_liquido_centavos', String(Math.round(liquido * 100)));
      payload.append('iss_centavos', String(Math.round(parseFloat(formData.iss || '0') * 100)));
      payload.append('irrf_centavos', String(Math.round(parseFloat(formData.irrf || '0') * 100)));
      payload.append('pis_cofins_csll_centavos', String(Math.round(parseFloat(formData.pis_cofins_csll || '0') * 100)));
      payload.append('descricao_servico', formData.descricao_servico);
      payload.append('centro_custo_sugerido', formData.centro_custo_sugerido);
      if (isContingency) {
        payload.append('is_contingency', 'true');
      }
      if (initialData) {
        payload.append('extracted_data', JSON.stringify(initialData));
      }

      try {
        setSubmissionFeedback(null);
        const res = await submitSupplierInvoice(payload);

        if (res.success && res.protocol) {
          setSubmittedProtocol(res.protocol);
          return;
        }

        // Caso de nota fiscal já existente
        if (res.errorType === 'DUPLICATE_INVOICE') {
          setSubmissionFeedback({
            type: 'DUPLICATE',
            title: 'Esta Nota Fiscal Já Foi Enviada Anteriormente',
            message: `Identificamos que a NFS-e nº ${res.invoiceNumber || formData.numero_nota} deste prestador já consta registrada em nosso sistema.${
              res.protocol ? ` Protocolo ativo: ${res.protocol}.` : ''
            } Não é necessário reenviá-la.`,
            protocol: res.protocol,
          });
          return;
        }

        // Outro erro retornado do servidor
        setSubmissionFeedback({
          type: 'SERVER_ERROR',
          title: 'Não Foi Possível Concluir o Envio',
          message: res.message || 'Houve uma instabilidade temporária ao registrar a nota. Por favor, tente novamente em instantes.',
        });
      } catch (err: any) {
        setSubmissionFeedback({
          type: 'SERVER_ERROR',
          title: 'Instabilidade Temporária no Envio',
          message: 'Os dados da nota estão corretos, mas o servidor encontrou uma oscilação momentânea ao emitir o protocolo. Por favor, tente clicar novamente no botão abaixo.',
        });
      }
    });
  };

  const copyProtocol = () => {
    if (!submittedProtocol) return;
    navigator.clipboard.writeText(submittedProtocol);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2000);
  };

  // Se já enviou, exibe recibo de protocolo emitido
  if (submittedProtocol) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#e5e5e5] p-8 text-center shadow-card animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#16A34A] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#812926] font-['Poppins']">
          Nota Fiscal Submetida com Sucesso!
        </h2>
        <p className="text-xs sm:text-sm text-[#484848] mt-1.5 mb-6">
          Sua NFS-e foi recebida e entrou na fila de conferência e aprovação do financeiro.
        </p>

        <div className="bg-[#f7f6f2] border border-[#e5e5e5] rounded-xl p-6 mb-6">
          <span className="text-xs font-semibold text-[#484848] uppercase tracking-wider block mb-1 font-['Poppins']">
            Protocolo de Recebimento
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-[#1c395c]">
              {submittedProtocol}
            </span>
            <button
              onClick={copyProtocol}
              className="p-2 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#812926] text-[#414141] transition-colors"
              title="Copiar Protocolo"
            >
              {copiedProtocol ? <Check className="w-5 h-5 text-[#16A34A]" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-[11px] text-[#c1c1c1] mt-2 font-mono truncate">
            Hash SHA-256: {hashSha256}
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="primary" onClick={onBack}>
            Enviar Outra Nota Fiscal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Top Header do Split-View */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-white p-4 rounded-xl border border-[#e5e5e5]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-[#f7f6f2] hover:bg-[#e5e5e5] text-[#212020] transition-colors"
            title="Voltar ao Upload"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#812926] font-['Poppins']">
              Etapa 2 — Conferência Assistida em Tela Dividida
            </h2>
            <p className="text-xs text-[#484848]">
              Compare o documento original à esquerda com os dados extraídos à direita e faça ajustes se necessário.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isContingency ? (
            <Badge variant="warning" size="md">
              Modo Contingência · Entrada Manual (0%)
            </Badge>
          ) : initialData?.confidence_score >= 90 ? (
            <Badge variant="success" size="md">
              Alta Confiança IA ({initialData.confidence_score}%)
            </Badge>
          ) : (
            <Badge variant="warning" size="md">
              Atenção: Conferir Dados ({initialData?.confidence_score || 75}%)
            </Badge>
          )}
        </div>
      </div>

      {/* Grade do Split-View (Lado Esquerdo: PDF / Lado Direito: Formulário) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lado Esquerdo: Visualizador de PDF (Altura sincronizada, zero scroll duplo) */}
        <div className="lg:col-span-6 h-[calc(100vh-160px)] min-h-[600px] max-h-[820px] sticky top-4">
          <DynamicPdfViewer file={pdfFile} />
        </div>

        {/* Lado Direito: Formulário de Conferência */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#e5e5e5] p-5 sm:p-6 shadow-sm overflow-y-auto h-[calc(100vh-160px)] min-h-[600px] max-h-[820px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Alerta de Validação de Campos Obrigatórios */}
            {validationError && (
              <div className="p-3.5 rounded-lg border border-[#fecaca] bg-[#fee2e2] text-[#DC2626] text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold font-['Poppins']">Preenchimento Incompleto</p>
                  <p className="mt-0.5">{validationError}</p>
                </div>
              </div>
            )}

            {/* Alerta Estruturado de Resposta do Envio (Duplicidade ou Erro) */}
            {submissionFeedback && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 animate-fadeIn ${
                  submissionFeedback.type === 'DUPLICATE'
                    ? 'border-[#fde68a] bg-[#fffbeb] text-[#92400e]'
                    : 'border-[#fecaca] bg-[#fee2e2] text-[#991b1b]'
                }`}
              >
                {submissionFeedback.type === 'DUPLICATE' ? (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#D97706]" />
                ) : (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#DC2626]" />
                )}
                <div className="flex-1 text-xs">
                  <p className="font-bold text-sm font-['Poppins'] text-[#212020] mb-1">
                    {submissionFeedback.title}
                  </p>
                  <p className="leading-relaxed text-[#484848] mb-3">
                    {submissionFeedback.message}
                  </p>

                  {submissionFeedback.type === 'DUPLICATE' && (
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#fef3c7]">
                      {submissionFeedback.protocol && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-[#fde68a] font-mono font-bold text-xs text-[#1c395c]">
                          Protocolo: {submissionFeedback.protocol}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={onBack}
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-[#812926] text-white hover:bg-[#6b2220] transition-colors"
                      >
                        Enviar Outra Nota Fiscal
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Banner de Modo Contingência */}
            {isContingency && (
              <div className="p-3.5 rounded-lg border border-[#fde68a] bg-[#fffbeb] text-[#212020] text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#D97706] font-['Poppins']">
                    Preenchimento Manual Assistido
                  </p>
                  <p className="text-[#484848] mt-0.5 leading-relaxed">
                    A leitura automática foi dispensada ou estava sob alta demanda. Digite os dados da nota fiscal conferindo o PDF original à esquerda. Todos os campos obrigatórios devem ser preenchidos.
                  </p>
                </div>
              </div>
            )}

            {/* Validador Matemático Visual */}
            <div
              className={`p-3.5 rounded-lg border flex items-start gap-3 transition-colors ${
                mathValidation.isValid
                  ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#16A34A]'
                  : 'bg-[#fffbeb] border-[#fde68a] text-[#D97706]'
              }`}
            >
              {mathValidation.isValid ? (
                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <p className="font-bold font-['Poppins']">
                  {mathValidation.isValid
                    ? 'Validação Matemática Aprovada'
                    : 'Atenção: Divergência de Valores'}
                </p>
                <p className="mt-0.5 leading-relaxed">
                  {mathValidation.isValid
                    ? `Líquido = Bruto - Retenções (${formatBRL(mathValidation.expectedLiquidoCentavos)}). Consistente.`
                    : `Líquido calculado esperado: ${formatBRL(
                        mathValidation.expectedLiquidoCentavos
                      )}. Diferença de ${formatBRL(mathValidation.divergenceCentavos)}.`}
                </p>
              </div>
            </div>

            {/* Dados do Prestador */}
            <div className="border-b border-[#e5e5e5] pb-4">
              <h4 className="text-xs font-bold text-[#812926] uppercase tracking-wider mb-3 font-['Poppins']">
                Dados do Prestador (Emissor)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    CNPJ do Prestador
                  </label>
                  <input
                    type="text"
                    name="cnpj_prestador"
                    required
                    value={formData.cnpj_prestador}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#812926]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Razão Social
                  </label>
                  <input
                    type="text"
                    name="razao_social_prestador"
                    required
                    value={formData.razao_social_prestador}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#812926]"
                  />
                </div>
              </div>
            </div>

            {/* Dados de Pagamento (Chave Pix) */}
            <div className="border-b border-[#e5e5e5] pb-4 bg-[#f7f6f2] p-3 rounded-lg border">
              <h4 className="text-xs font-bold text-[#1c395c] uppercase tracking-wider mb-2 font-['Poppins']">
                Dados para Recebimento (Pix / Bancário)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Chave Pix (Preferencial)
                  </label>
                  <input
                    type="text"
                    name="chave_pix"
                    placeholder="CNPJ, E-mail, Celular ou Aleatória"
                    value={formData.chave_pix}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md bg-white focus:outline-none focus:border-[#1c395c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Dados Bancários
                  </label>
                  <input
                    type="text"
                    name="dados_bancarios"
                    placeholder="Banco, Agência e Conta"
                    value={formData.dados_bancarios}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md bg-white focus:outline-none focus:border-[#1c395c]"
                  />
                </div>
              </div>
            </div>

            {/* Dados da Nota Fiscal */}
            <div className="border-b border-[#e5e5e5] pb-4">
              <h4 className="text-xs font-bold text-[#812926] uppercase tracking-wider mb-3 font-['Poppins']">
                Identificação do Documento Fiscal
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Número da Nota
                  </label>
                  <input
                    type="text"
                    name="numero_nota"
                    required
                    value={formData.numero_nota}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#812926]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Cód. Verificação
                  </label>
                  <input
                    type="text"
                    name="codigo_verificacao"
                    value={formData.codigo_verificacao}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#812926]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Data de Emissão
                  </label>
                  <input
                    type="date"
                    name="data_emissao"
                    required
                    value={formData.data_emissao}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#812926]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Vencimento
                  </label>
                  <input
                    type="date"
                    name="data_vencimento"
                    required
                    value={formData.data_vencimento}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#812926]"
                  />
                </div>
              </div>
            </div>

            {/* Valores e Retenções */}
            <div className="border-b border-[#e5e5e5] pb-4">
              <h4 className="text-xs font-bold text-[#812926] uppercase tracking-wider mb-3 font-['Poppins']">
                Valores e Retenções Tributárias (R$)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#212020] mb-1 font-['Poppins']">
                    Valor Bruto
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="valor_bruto"
                    required
                    value={formData.valor_bruto}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#e5e5e5] rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#484848] mb-1 font-['Poppins']">
                    ISS Retido
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="iss"
                    value={formData.iss}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#e5e5e5] rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#484848] mb-1 font-['Poppins']">
                    IRRF Retido
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="irrf"
                    value={formData.irrf}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#e5e5e5] rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#484848] mb-1 font-['Poppins']">
                    PIS/COF/CSLL
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="pis_cofins_csll"
                    value={formData.pis_cofins_csll}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#e5e5e5] rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#16A34A] mb-1 font-['Poppins']">
                    Valor Líquido
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="valor_liquido"
                    required
                    value={formData.valor_liquido}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#16A34A] rounded-md font-mono font-bold bg-[#f0fdf4]"
                  />
                </div>
              </div>
            </div>

            {/* Descrição e Classificação */}
            <div>
              <label className="block text-xs font-semibold text-[#212020] mb-1 font-['Poppins']">
                Descrição dos Serviços Prestados
              </label>
              <textarea
                name="descricao_servico"
                rows={2}
                value={formData.descricao_servico}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-[#e5e5e5] rounded-md focus:outline-none focus:border-[#812926]"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isPending}
              className="w-full mt-4"
            >
              Confirmar e Emitir Protocolo
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
