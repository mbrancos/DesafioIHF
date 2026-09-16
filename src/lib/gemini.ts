import { GoogleGenAI, Type } from '@google/genai';

export interface ExtractedInvoiceData {
  cnpj_prestador: string;
  razao_social_prestador: string;
  chave_pix?: string;
  dados_bancarios?: string;
  cnpj_tomador: string;
  razao_social_tomador?: string;
  numero_nota: string;
  codigo_verificacao?: string;
  data_emissao: string;
  data_vencimento: string;
  valor_bruto_centavos: number;
  valor_liquido_centavos: number;
  iss_centavos: number;
  irrf_centavos: number;
  pis_cofins_csll_centavos: number;
  descricao_servico: string;
  centro_custo_sugerido?: string;
  confidence_score: number; // 0 a 100
}

export const INVOICE_EXTRACTION_SCHEMA = {
  type: 'object',
  properties: {
    cnpj_prestador: { type: 'string', description: 'CNPJ do prestador emissor sem pontuação' },
    razao_social_prestador: { type: 'string', description: 'Razão social completa do prestador' },
    chave_pix: { type: 'string', description: 'Chave Pix informada na nota ou corpo do documento' },
    dados_bancarios: { type: 'string', description: 'Informações de banco, agência e conta se informadas' },
    cnpj_tomador: { type: 'string', description: 'CNPJ da empresa tomadora da holding' },
    razao_social_tomador: { type: 'string', description: 'Razão social ou nome da vertical tomadora' },
    numero_nota: { type: 'string', description: 'Número oficial da NFS-e' },
    codigo_verificacao: { type: 'string', description: 'Código de autenticidade ou chave de verificação' },
    data_emissao: { type: 'string', description: 'Data de emissão oficial (formato YYYY-MM-DD)' },
    data_vencimento: { type: 'string', description: 'Data de vencimento do boleto ou fatura (YYYY-MM-DD)' },
    valor_bruto_centavos: { type: 'integer', description: 'Valor total dos serviços/bruto em centavos de Real' },
    valor_liquido_centavos: { type: 'integer', description: 'Valor líquido a pagar em centavos de Real' },
    iss_centavos: { type: 'integer', description: 'Valor de retenção de ISS em centavos' },
    irrf_centavos: { type: 'integer', description: 'Valor de retenção de IRRF em centavos' },
    pis_cofins_csll_centavos: { type: 'integer', description: 'Valor retido agrupado de PIS, COFINS e CSLL em centavos' },
    descricao_servico: { type: 'string', description: 'Discriminação resumida dos serviços prestados' },
    centro_custo_sugerido: {
      type: 'string',
      description: 'Classificação sugerida',
      enum: [
        'tecnologia_inovacao',
        'facilities_coworking',
        'marketing_comunicacao',
        'eventos_producao',
        'projetos_aceleracao',
        'administrativo_legal',
      ],
    },
    confidence_score: { type: 'integer', description: 'Score de confiança geral da leitura visual de 0 a 100' },
  },
  required: [
    'cnpj_prestador',
    'razao_social_prestador',
    'cnpj_tomador',
    'numero_nota',
    'data_emissao',
    'data_vencimento',
    'valor_bruto_centavos',
    'valor_liquido_centavos',
    'confidence_score',
  ],
};

/**
 * Executa a extração multimodal de NFS-e utilizando o Google Gemini 2.5 Flash via SDK oficial @google/genai.
 */
export async function extractInvoiceDataWithGemini(
  pdfBuffer: Buffer | ArrayBuffer
): Promise<ExtractedInvoiceData> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'mock_key') {
    if (process.env.NODE_ENV === 'test') {
      return {
        cnpj_prestador: '88888888000188',
        razao_social_prestador: 'TechCloud Solucoes em Software LTDA',
        chave_pix: 'financeiro@techcloud.com.br',
        dados_bancarios: 'Banco Inter (077) Ag 0001 CC 1234567-8',
        cnpj_tomador: '11111111000111',
        razao_social_tomador: 'Impact Hub Floripa Gestao de Espacos LTDA',
        numero_nota: '2026001',
        codigo_verificacao: 'VERIF-98765-ABC',
        data_emissao: '2026-09-10',
        data_vencimento: '2026-09-25',
        valor_bruto_centavos: 100000,
        valor_liquido_centavos: 88850,
        iss_centavos: 5000,
        irrf_centavos: 1500,
        pis_cofins_csll_centavos: 4650,
        descricao_servico: 'Serviços de infraestrutura cloud e suporte técnico mensal',
        centro_custo_sugerido: 'tecnologia_inovacao',
        confidence_score: 98,
      };
    }
    throw new Error(
      'A chave GEMINI_API_KEY não foi configurada nas variáveis de ambiente do servidor.'
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const buffer = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);
  const base64Pdf = buffer.toString('base64');

  // Modelos oficiais validados para fallback rápido (fail-fast)
  const modelsToTry = ['gemini-flash-latest', 'gemini-flash-lite-latest'];
  let lastError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    try {
      console.log(`[Gemini Extraction] Tentativa com modelo: ${currentModel}`);
      const response = await ai.models.generateContent({
        model: currentModel,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Você é o auditor fiscal sênior da holding Companhia de Impacto (iHubFiscal).
Analise com extrema precisão este documento PDF de Nota Fiscal de Serviços Eletrônica (NFS-e) brasileira.
Extraia todos os campos fiscais, tributários, bancários e de vencimento estritamente no formato do JSON Schema solicitado.
Calcule com precisão os centavos de real (ex: R$ 1.250,50 vira 125050).
Identifique a chave Pix informada para pagamento.
Caso o CNPJ do tomador seja de uma das 4 verticais da holding:
- 11.111.111/0001-11: Impact Hub Floripa
- 22.222.222/0001-22: Salto Aceleradora
- 33.333.333/0001-33: Impacta Mais
- 44.444.444/0001-44: Seu PêJota
Sugira o centro de custo mais adequado. Atribua uma pontuação de confiança de 0 a 100 com base na legibilidade dos dados.`,
              },
              {
                inlineData: {
                  data: base64Pdf,
                  mimeType: 'application/pdf',
                },
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
          responseSchema: INVOICE_EXTRACTION_SCHEMA as any,
        },
      });

      const rawText = typeof (response as any).text === 'function' ? (response as any).text() : response.text;
      const responseText = typeof rawText === 'string' ? rawText : '';
      if (!responseText) {
        throw new Error('O modelo Gemini não retornou dados estruturados para este documento.');
      }

      console.log(`[Gemini Extraction] Sucesso na extração com modelo: ${currentModel}`);
      return JSON.parse(responseText) as ExtractedInvoiceData;
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini Extraction] Falha no modelo ${currentModel}:`, err?.message || err);

      // Se houver próximo modelo para tentar, avança imediatamente sem delay
      if (i < modelsToTry.length - 1) {
        console.warn(`[Gemini Extraction] Chaveando imediatamente para o modelo fallback: ${modelsToTry[i + 1]}`);
        continue;
      }
      break;
    }
  }

  throw lastError || new Error('Falha ao processar o documento com IA após tentar os modelos disponíveis.');
}
