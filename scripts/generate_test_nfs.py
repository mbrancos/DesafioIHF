import os
import subprocess

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>NFS-e Nº {numero_nf}</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 10mm;
  }}
  body {{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
    color: #111;
    margin: 0;
    padding: 0;
    line-height: 1.3;
  }}
  .border-box {{
    border: 1px solid #333;
    margin-bottom: 6px;
    background: #fff;
  }}
  .header-table {{
    width: 100%;
    border-collapse: collapse;
  }}
  .header-table td {{
    padding: 6px;
    vertical-align: middle;
  }}
  .title-area {{
    text-align: center;
    border-left: 1px solid #333;
    border-right: 1px solid #333;
  }}
  .title-area h2 {{
    margin: 2px 0;
    font-size: 13px;
    text-transform: uppercase;
  }}
  .title-area h3 {{
    margin: 2px 0;
    font-size: 11px;
    font-weight: normal;
  }}
  .nf-box {{
    text-align: center;
    width: 150px;
    font-size: 11px;
  }}
  .nf-box strong {{
    font-size: 14px;
    color: #b71c1c;
  }}
  .section-title {{
    background: #e0e0e0;
    font-weight: bold;
    padding: 3px 6px;
    font-size: 10px;
    text-transform: uppercase;
    border-bottom: 1px solid #333;
  }}
  .content-table {{
    width: 100%;
    border-collapse: collapse;
  }}
  .content-table td {{
    padding: 4px 6px;
    vertical-align: top;
    border-bottom: 1px solid #eee;
  }}
  .content-table td strong {{
    display: inline-block;
    min-width: 110px;
    color: #333;
  }}
  .service-desc {{
    padding: 8px;
    min-height: 90px;
    font-size: 11px;
    white-space: pre-line;
  }}
  .tax-table {{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }}
  .tax-table th {{
    background: #f5f5f5;
    border: 1px solid #ccc;
    padding: 4px;
    font-size: 9px;
  }}
  .tax-table td {{
    border: 1px solid #ccc;
    padding: 4px;
    font-size: 10px;
  }}
  .total-box {{
    background: #f1f8e9;
    border: 2px solid #2e7d32;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }}
  .total-box .highlight {{
    font-size: 16px;
    font-weight: bold;
    color: #1b5e20;
  }}
  .footer-info {{
    font-size: 8px;
    color: #555;
    text-align: center;
    margin-top: 10px;
  }}
  .badge-tag {{
    display: inline-block;
    padding: 2px 6px;
    font-size: 9px;
    font-weight: bold;
    border-radius: 3px;
    background: #e8eaf6;
    color: #283593;
    margin-left: 8px;
  }}
</style>
</head>
<body>

<div class="border-box">
  <table class="header-table">
    <tr>
      <td style="width: 100px; text-align: center;">
        <div style="font-size: 24px;">🏛️</div>
        <strong>PREFEITURA MUNICIPAL</strong>
      </td>
      <td class="title-area">
        <h2>NOTA FISCAL DE SERVIÇOS ELETRÔNICA — NFS-e</h2>
        <h3>Documento Auxiliar da NFS-e (DANFSE)</h3>
        <span style="font-size: 9px; color: #555;">Sistema de Emissão e Escrituração Tributária Digital</span>
      </td>
      <td class="nf-box">
        Número da Nota:<br>
        <strong>{numero_nf}</strong><br>
        <span style="font-size: 9px;">Série: 1 | Cód. Verif: <strong>{cod_verificacao}</strong></span><br>
        <span style="font-size: 9px;">Emissão: <strong>{data_emissao}</strong></span>
      </td>
    </tr>
  </table>
</div>

<div class="border-box">
  <div class="section-title">PRESTADOR DE SERVIÇOS (EMISSOR DA NOTA)</div>
  <table class="content-table">
    <tr>
      <td colspan="2"><strong>Razão Social:</strong> {prestador_razao}</td>
      <td><strong>Nome Fantasia:</strong> {prestador_fantasia}</td>
    </tr>
    <tr>
      <td><strong>CNPJ / CPF:</strong> {prestador_cnpj}</td>
      <td><strong>Inscrição Municipal:</strong> {prestador_im}</td>
      <td><strong>Município/UF:</strong> {prestador_cidade}</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Endereço:</strong> {prestador_endereco} | <strong>E-mail:</strong> {prestador_email}</td>
    </tr>
  </table>
</div>

<div class="border-box">
  <div class="section-title">TOMADOR DE SERVIÇOS (CONTRATANTE / HOLDING) <span class="badge-tag">{vertical_tag}</span></div>
  <table class="content-table">
    <tr>
      <td colspan="2"><strong>Razão Social:</strong> {tomador_razao}</td>
      <td><strong>CNPJ:</strong> {tomador_cnpj}</td>
    </tr>
    <tr>
      <td><strong>Inscrição Estadual:</strong> Isento</td>
      <td><strong>Município/UF:</strong> {tomador_cidade}</td>
      <td><strong>E-mail Financeiro:</strong> financeiro@companhiadeimpacto.fake</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Endereço:</strong> {tomador_endereco}</td>
    </tr>
  </table>
</div>

<div class="border-box">
  <div class="section-title">DISCRIMINAÇÃO DOS SERVIÇOS PRESTADOS</div>
  <div class="service-desc">
{discriminacao_servicos}
  </div>
</div>

<div class="border-box">
  <div class="section-title">DETALHAMENTO DE RETENÇÕES TRIBUTÁRIAS & IMPOSTOS</div>
  <table class="tax-table">
    <tr>
      <th>PIS</th>
      <th>COFINS</th>
      <th>INSS</th>
      <th>IRRF</th>
      <th>CSLL</th>
      <th>Outras Retenções</th>
      <th>ISS Retido na Fonte</th>
    </tr>
    <tr>
      <td>R$ {ret_pis}</td>
      <td>R$ {ret_cofins}</td>
      <td>R$ 0,00</td>
      <td>R$ {ret_irrf}</td>
      <td>R$ {ret_csll}</td>
      <td>R$ 0,00</td>
      <td>R$ {ret_iss}</td>
    </tr>
  </table>
</div>

<div class="border-box" style="margin-bottom: 10px;">
  <div class="section-title">DEMONSTRATIVO DE VALORES & VENCIMENTO</div>
  <table class="content-table">
    <tr>
      <td><strong>Valor Bruto dos Serviços:</strong></td>
      <td style="text-align: right; font-size: 12px; font-weight: bold;">R$ {valor_bruto}</td>
      <td style="border-left: 1px solid #eee;"><strong>Data de Vencimento:</strong></td>
      <td style="text-align: right; font-size: 13px; font-weight: bold; color: #b71c1c;">{data_vencimento}</td>
    </tr>
    <tr>
      <td><strong>(-) Total de Retenções na Fonte:</strong></td>
      <td style="text-align: right; font-size: 12px; color: #c62828;">- R$ {total_retencoes}</td>
      <td style="border-left: 1px solid #eee;"><strong>Forma de Pagamento:</strong></td>
      <td style="text-align: right;">Boleto Bancário / Pix</td>
    </tr>
    <tr style="background: #e8f5e9;">
      <td><strong style="color: #1b5e20; font-size: 13px;">(=) VALOR LÍQUIDO A PAGAR:</strong></td>
      <td style="text-align: right; font-size: 15px; font-weight: bold; color: #1b5e20;">R$ {valor_liquido}</td>
      <td style="border-left: 1px solid #c8e6c9;"><strong>Centro de Custo Sugerido:</strong></td>
      <td style="text-align: right; font-weight: bold;">{centro_custo}</td>
    </tr>
  </table>
</div>

<div class="border-box" style="padding: 6px; font-size: 9px; background: #fafafa;">
  <strong>OUTRAS INFORMAÇÕES / DADOS BANCÁRIOS PARA PAGAMENTO:</strong><br>
  Banco: {banco_info} | Chave Pix: {pix_info}<br>
  Linha Digitável do Boleto: {linha_digitavel}<br>
  <em>Nota emitida com amparo na Legislação Tributária Municipal vigente. Documento gerado para fins de validação no fluxo de Contas a Pagar.</em>
</div>

<div class="footer-info">
  Companhia de Impacto Holding • ImpactPay AI Test Sample • Documento Fiscal Fictício para Homologação de Workflow
</div>

</body>
</html>
"""

SAMPLES = [
    {
        "filename": "NF-2026001-ImpactHub-Floripa.pdf",
        "numero_nf": "2026001",
        "cod_verificacao": "A8B9-C3D4",
        "data_emissao": "10/09/2026",
        "data_vencimento": "25/09/2026",
        "prestador_razao": "TechSolutions Consultoria & Inteligência Artificial Ltda",
        "prestador_fantasia": "TechSolutions IA",
        "prestador_cnpj": "12.345.678/0001-90",
        "prestador_im": "98765-4",
        "prestador_cidade": "Florianópolis / SC",
        "prestador_endereco": "Rodovia José Carlos Daux, 4500 - Saco Grande",
        "prestador_email": "contato@techsolutions.fake",
        "vertical_tag": "VERTICAL: IMPACT HUB FLORIANÓPOLIS",
        "tomador_razao": "Associação Impact Hub Floripa (Companhia de Impacto)",
        "tomador_cnpj": "19.456.789/0001-12",
        "tomador_cidade": "Florianópolis / SC",
        "tomador_endereco": "Rodovia SC-401, Km 4, 4150 - Saco Grande, Florianópolis - SC",
        "discriminacao_servicos": "1. Prestação de serviços técnicos de consultoria em inteligência artificial e engenharia de prompts.\n2. Desenvolvimento de automação de fluxo de contas a pagar no n8n com integração de visão computacional.\n3. Treinamento operacional da equipe de suporte e governança de dados.\n\nPeríodo de apuração: Agosto/2026 - Competência 2026-08.",
        "ret_pis": "0,00",
        "ret_cofins": "0,00",
        "ret_irrf": "75,00",
        "ret_csll": "0,00",
        "ret_iss": "100,00",
        "total_retencoes": "175,00",
        "valor_bruto": "5.000,00",
        "valor_liquido": "4.825,00",
        "centro_custo": "Tecnologia & Inovação (Hub Floripa)",
        "banco_info": "Banco Inter (077) Ag: 0001 CC: 129384-9",
        "pix_info": "12.345.678/0001-90 (CNPJ)",
        "linha_digitavel": "07790.00116 12938.490004 00000.001234 1 98450000482500"
    },
    {
        "filename": "NF-2026042-Salto-Inclusao.pdf",
        "numero_nf": "2026042",
        "cod_verificacao": "E5F6-G7H8",
        "data_emissao": "08/09/2026",
        "data_vencimento": "20/09/2026",
        "prestador_razao": "Studio Design Criativo MEI - Lucas Santos 45678901234",
        "prestador_fantasia": "Studio Design Criativo",
        "prestador_cnpj": "45.678.901/0001-23",
        "prestador_im": "Isento (MEI)",
        "prestador_cidade": "Porto Alegre / RS",
        "prestador_endereco": "Rua da Praia, 120, Sala 304 - Centro Histórico",
        "prestador_email": "lucas.design@gmail.fake",
        "vertical_tag": "VERTICAL: SALTO INCLUSÃO PRODUTIVA",
        "tomador_razao": "Salto Aceleradora de Impacto Social Ltda (Companhia de Impacto)",
        "tomador_cnpj": "28.345.678/0001-44",
        "tomador_cidade": "Porto Alegre / RS",
        "tomador_endereco": "Av. Carlos Gomes, 1492 - Auxiliadora, Porto Alegre - RS",
        "discriminacao_servicos": "Serviços de design gráfico para inclusão produtiva:\n- Criação de cartilhas e apostilas para capacitação de microempreendedores periféricos.\n- Adaptação de identidade visual e peças para redes sociais do Projeto Salto.\n\nEMPRESA OPTANTE PELO SIMPLES NACIONAL (MEI) - Dispensada de retenções na fonte de impostos federais e ISS.",
        "ret_pis": "0,00",
        "ret_cofins": "0,00",
        "ret_irrf": "0,00",
        "ret_csll": "0,00",
        "ret_iss": "0,00",
        "total_retencoes": "0,00",
        "valor_bruto": "2.400,00",
        "valor_liquido": "2.400,00",
        "centro_custo": "Operações Sociais & Inclusão (Salto)",
        "banco_info": "Nubank (260) Ag: 0001 CC: 981273-0",
        "pix_info": "lucas.design@gmail.fake (E-mail)",
        "linha_digitavel": "26090.00114 98127.300008 00000.000456 2 98400000240000"
    },
    {
        "filename": "NF-2026189-ImpactaMais-Eventos.pdf",
        "numero_nf": "2026189",
        "cod_verificacao": "K1L2-M3N4",
        "data_emissao": "05/09/2026",
        "data_vencimento": "18/09/2026",
        "prestador_razao": "MegaSom Estruturas & Eventos Corporativos S/A",
        "prestador_fantasia": "MegaSom Eventos",
        "prestador_cnpj": "98.765.432/0001-10",
        "prestador_im": "12345-0",
        "prestador_cidade": "São Paulo / SP",
        "prestador_endereco": "Av. das Nações Unidas, 14261 - Vila Gertrudes, São Paulo - SP",
        "prestador_email": "financeiro@megasom.fake",
        "vertical_tag": "VERTICAL: IMPACTA MAIS EVENTOS",
        "tomador_razao": "Impacta Mais Gestão de Eventos Sustentáveis Ltda (Companhia de Impacto)",
        "tomador_cnpj": "33.987.654/0001-88",
        "tomador_cidade": "São Paulo / SP",
        "tomador_endereco": "Av. Paulista, 1374, 11º andar - Bela Vista, São Paulo - SP",
        "discriminacao_servicos": "Locação de equipamentos de som, iluminação cênica de baixo consumo e transmissão ao vivo para o Congresso Brasileiro de Negócios de Impacto 2026.\n\nRetenções Federais aplicáveis (Lei 10.833/2003):\nPIS (0,65%): R$ 97,50 | COFINS (3,00%): R$ 450,00 | CSLL (1,00%): R$ 150,00 | Total PIS/COFINS/CSLL: R$ 697,50.\nIRRF (1,5%): R$ 225,00 | ISS Retido na Fonte (5,00% - Município de SP): R$ 750,00.",
        "ret_pis": "97,50",
        "ret_cofins": "450,00",
        "ret_irrf": "225,00",
        "ret_csll": "150,00",
        "ret_iss": "750,00",
        "total_retencoes": "1.672,50",
        "valor_bruto": "15.000,00",
        "valor_liquido": "13.327,50",
        "centro_custo": "Eventos & Congressos (Impacta Mais)",
        "banco_info": "Itaú Unibanco (341) Ag: 0910 CC: 45812-9",
        "pix_info": "98.765.432/0001-10 (CNPJ)",
        "linha_digitavel": "34191.09105 45812.900002 00000.009876 3 98380001332750"
    }
]

import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def main():
    target_dir = os.path.abspath(r"d:\Etna\Projetos\DesafioIHF\test-samples")
    os.makedirs(target_dir, exist_ok=True)
    
    browser_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(browser_path):
        browser_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    print(f"Usando navegador: {browser_path}")
    
    for sample in SAMPLES:
        html_content = HTML_TEMPLATE.format(**sample)
        html_path = os.path.join(target_dir, sample["filename"].replace(".pdf", ".html"))
        pdf_path = os.path.join(target_dir, sample["filename"])
        
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        
        print(f"Gerado HTML: {html_path}")
        
        # Converte para PDF via headless browser
        cmd = [
            browser_path,
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            html_path
        ]
        
        res = subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 0:
            print(f"[SUCESSO] PDF gerado: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
        else:
            print(f"[ERRO] Falha ao gerar {pdf_path}: {res.stderr}")

if __name__ == "__main__":
    main()
