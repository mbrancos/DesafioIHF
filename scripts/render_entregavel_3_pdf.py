import os
import subprocess
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

HTML_CONTENT = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Entregável 3 — Manual Operacional do Time Financeiro (ImpactPay AI)</title>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 15mm;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 9.5pt;
    line-height: 1.4;
    color: #1e293b;
    margin: 0;
    padding: 0;
  }
  .page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 96%;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  .header {
    border-bottom: 2px solid #0f766e;
    padding-bottom: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h1 {
    font-size: 14pt;
    color: #0f766e;
    margin: 0 0 2px 0;
    text-transform: uppercase;
    letter-spacing: -0.3px;
  }
  .header-left p {
    font-size: 8.5pt;
    color: #64748b;
    margin: 0;
    font-weight: 500;
  }
  .badge-manual {
    background: #f0fdfa;
    border: 1px solid #99f6e4;
    color: #0f766e;
    font-size: 8pt;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    text-align: right;
  }
  h2 {
    font-size: 10.5pt;
    color: #0f172a;
    margin: 10px 0 5px 0;
    border-left: 3px solid #0f766e;
    padding-left: 6px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  h3 {
    font-size: 9.5pt;
    color: #0f766e;
    margin: 8px 0 3px 0;
  }
  p {
    margin: 0 0 6px 0;
    font-size: 9pt;
    color: #334155;
    text-align: justify;
  }
  .alert-box {
    background: #f8fafc;
    border-left: 4px solid #0f766e;
    border-radius: 0 4px 4px 0;
    padding: 8px 10px;
    margin-bottom: 8px;
    font-size: 8.5pt;
  }
  .alert-box strong {
    color: #0f766e;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 8.5pt;
  }
  th {
    background: #0f766e;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 5px 7px;
    border: 1px solid #0f766e;
    text-transform: uppercase;
    font-size: 7.5pt;
  }
  td {
    padding: 5px 7px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }
  tr:nth-child(even) td {
    background: #f8fafc;
  }
  .case-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    padding: 7px 9px;
    margin-bottom: 7px;
    font-size: 8.5pt;
  }
  .case-card.danger {
    border-left: 4px solid #ef4444;
  }
  .case-card.warning {
    border-left: 4px solid #f59e0b;
  }
  .case-card.info {
    border-left: 4px solid #3b82f6;
  }
  .case-title {
    font-weight: bold;
    color: #0f172a;
    font-size: 9pt;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
  }
  .case-tag {
    font-size: 7pt;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  .tag-danger { background: #fee2e2; color: #b91c1c; }
  .tag-warning { background: #fef3c7; color: #b45309; }
  .tag-info { background: #dbeafe; color: #1d4ed8; }
  .footer {
    border-top: 1px solid #e2e8f0;
    padding-top: 4px;
    font-size: 7.5pt;
    color: #94a3b8;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>
</head>
<body>

<!-- ==================== PÁGINA 1 ==================== -->
<div class="page">
  <div>
    <div class="header">
      <div class="header-left">
        <h1>ImpactPay AI — Manual Operacional do Financeiro</h1>
        <p>Guia Prático e Descomplicado para o Time de Contas a Pagar • Holding Companhia de Impacto</p>
      </div>
      <div class="badge-manual">
        Entregável 3 • Manual Operacional<br>
        Versão 1.0 (Time Financeiro)
      </div>
    </div>

    <h2>1. Boas-Vindas à Nova Rotina do Contas a Pagar</h2>
    <p>
      Este manual foi desenhado especialmente para você que atua diariamente no contas a pagar da <strong>Companhia de Impacto</strong>. 
      O <strong>ImpactPay AI</strong> foi criado para eliminar o trabalho braçal e repetitivo de abrir múltiplas caixas de e-mail e digitar notas fiscais em planilhas.
      A partir de agora, uma assistente digital com IA lê o documento, preenche os dados automaticamente, valida as retenções de impostos e encaminha para o gestor aprovar com 1 clique no chat corporativo.
    </p>

    <h2>2. O Ciclo de Vida da Nota Fiscal (Linha do Tempo)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Status da Nota</th>
          <th style="width: 40%;">O que significa na prática?</th>
          <th>O que o financeiro precisa fazer?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong style="color: #b45309;">🟡 RECEBIDA / EM LEITURA</strong></td>
          <td>O arquivo chegou e a inteligência artificial está realizando a extração dos campos tributários.</td>
          <td>Nada. O processo dura menos de 10 segundos.</td>
        </tr>
        <tr>
          <td><strong style="color: #0f766e;">🟢 AGUARDANDO APROVAÇÃO</strong></td>
          <td>A nota foi lida com 100% de clareza, os cálculos matemáticos bateram e o aviso já foi despachado para o gestor.</td>
          <td>Aguardar a resposta do gestor. Lembretes automáticos são disparados sozinhos com 48h e 24h.</td>
        </tr>
        <tr>
          <td><strong style="color: #ea580c;">🟠 REVISÃO MANUAL</strong></td>
          <td>A nota apresentou alguma dúvida (foto borrada, dado ilegível ou divergência de retenção).</td>
          <td>Abrir a tela de conferência em split-view, validar o campo no PDF ao lado e salvar.</td>
        </tr>
        <tr>
          <td><strong style="color: #2563eb;">🔵 PRONTO PARA PAGAMENTO</strong></td>
          <td>O gestor responsável clicou em "Aprovar". A nota está liberada para agendamento no banco.</td>
          <td>Agendar ou autorizar o Pix/boleto no internet banking da empresa contratante.</td>
        </tr>
        <tr>
          <td><strong style="color: #15803d;">✅ PAGO (CONCLUÍDO)</strong></td>
          <td>Pagamento liquidado com anexo do comprovante Pix.</td>
          <td>A nota é arquivada e já entra no pacote mensal para a contabilidade externa.</td>
        </tr>
      </tbody>
    </table>

    <h2>3. A Tela de Conferência Assistida (Human-in-the-Loop)</h2>
    <div class="alert-box">
      <strong>🖥️ Visão Lado a Lado (Split View):</strong><br>
      Quando você abre uma nota em conferência, a tela exibe o PDF original do lado esquerdo e o formulário preenchido pela IA do lado direito.
      <ul style="margin: 3px 0 0 16px; padding: 0;">
        <li><span style="color: #15803d; font-weight: bold;">Campos em Verde:</span> Informações lidas com certeza absoluta. Basta bater o olho.</li>
        <li><span style="color: #b45309; font-weight: bold;">Campos em Amarelo:</span> Dados que vieram cortados ou ausentes (ex: vencimento omitido). Digite a correção e salve.</li>
      </ul>
    </div>

    <h2>4. Repasse de Notas para o Contador da Holding</h2>
    <p>
      No final do mês, não é necessário compactar anexos manualmente: acesse <em>Fechamento Contábil</em>, escolha a vertical e clique em <strong>"Gerar Link para Contabilidade"</strong>. O escritório parceiro recebe um link seguro para baixar um pacote <strong>.ZIP</strong> contendo todos os PDFs e XMLs do mês devidamente organizados e renomeados.
    </p>
  </div>

  <div class="footer">
    <span>Companhia de Impacto Holding • Manual do Time Financeiro</span>
    <span>Página 1 de 2</span>
  </div>
</div>

<!-- ==================== PÁGINA 2 ==================== -->
<div class="page">
  <div>
    <div class="header">
      <div class="header-left">
        <h1>ImpactPay AI — Matriz "O Que Fazer Se Quebrar?"</h1>
        <p>Procedimentos Operacionais de Contingência & Contatos de Suporte</p>
      </div>
      <div class="badge-manual">
        Entregável 3 • Guia de Contingência<br>
        Página 2 de 2
      </div>
    </div>

    <h2>5. Guia Rápido de Contingência (Resolução de Incidentes)</h2>

    <div class="case-card warning">
      <div class="case-title">
        <span>1. Nota fiscal escaneada de forma borrada, cortada ou escura</span>
        <span class="case-tag tag-warning">Revisão Manual</span>
      </div>
      <strong>O que fazer:</strong> Abra a nota na tela de conferência. Se for impossível ler o documento mesmo com zoom, clique no botão <em>"Solicitar Reenvio ao Prestador"</em>. O sistema envia um e-mail educado e automático solicitando uma nova via nítida em PDF.
    </div>

    <div class="case-card danger">
      <div class="case-title">
        <span>2. Fornecedor envia a mesma nota fiscal duas vezes (Risco de Duplicidade)</span>
        <span class="case-tag tag-danger">Bloqueio Automático</span>
      </div>
      <strong>O que fazer:</strong> O sistema calcula a impressão digital (Hash SHA-256) e barra o arquivo na hora. Você verá o aviso: <em>"Nota já cadastrada sob ID #XXX"</em>. Nenhuma ação é necessária: o sistema protege contra pagamentos em duplicidade.
    </div>

    <div class="case-card danger">
      <div class="case-title">
        <span>3. A soma das retenções de impostos não bate com o valor líquido</span>
        <span class="case-tag tag-danger">Alerta Fiscal</span>
      </div>
      <strong>O que fazer:</strong> O sistema sinaliza a nota com a tarja <em>"Divergência Tributária"</em>. Se for mero arredondamento de centavos, corrija o valor no formulário. Se o prestador calculou impostos errados, clique em <em>"Rejeitar por Erro Tributário"</em> para cancelamento da NF.
    </div>

    <div class="case-card warning">
      <div class="case-title">
        <span>4. O gestor da vertical está viajando ou não responde à aprovação</span>
        <span class="case-tag tag-warning">Escalonamento</span>
      </div>
      <strong>O que fazer:</strong> O bot dispara lembretes automáticos com 48h e 24h antes do vencimento. Caso faltem 24h úteis sem parecer, a pendência é <strong>escalonada automaticamente para o Diretor Geral da vertical</strong> para autorização de emergência.
    </div>

    <div class="case-card info">
      <div class="case-title">
        <span>5. Mudança repentina de Chave Pix ou dados bancários no corpo do e-mail</span>
        <span class="case-tag tag-info">Segurança / Compliance</span>
      </div>
      <strong>O que fazer:</strong> Nunca efetue pagamentos em contas de pessoas físicas para contratos PJ sem autorização expressa. Pause a nota no status <em>"Aguardando Confirmação Bancária"</em> e solicite validação com o gestor do contrato.
    </div>

    <div class="case-card info">
      <div class="case-title">
        <span>6. Queda temporária de internet ou lentidão no serviço de IA</span>
        <span class="case-tag tag-info">Fila de Resiliência</span>
      </div>
      <strong>O que fazer:</strong> O n8n possui uma fila de proteção que retenta a leitura 3 vezes (após 1m, 5m e 15m). Nenhuma nota se perde. Assim que a conexão retorna, todas as notas represadas são processadas em lote automaticamente.
    </div>

    <h2>6. Contatos de Suporte & Central de Ajuda</h2>
    <table style="margin-bottom: 5px;">
      <thead>
        <tr>
          <th>Canal de Atendimento</th>
          <th>Identificador / Contato</th>
          <th>Quando acionar?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Canal no Slack / Teams</td>
          <td><code>#suporte-impactpay</code></td>
          <td>Dúvidas operacionais do dia a dia ou erro na tela de conferência.</td>
        </tr>
        <tr>
          <td class="bold">Plantão de Engenharia de IA</td>
          <td>Ramal 204 (Equipe de Produtos Digitais)</td>
          <td>Dúvidas sobre regras tributárias ou necessidade de reprocessamento em lote.</td>
        </tr>
        <tr>
          <td class="bold">E-mail de Suporte</td>
          <td><code>suporte.ia@companhiadeimpacto.fake</code></td>
          <td>Abertura de chamados para inclusão de novos gestores aprovadores.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <span>Companhia de Impacto Holding • Manual do Time Financeiro</span>
    <span>Página 2 de 2 • Versão Oficial Homologada</span>
  </div>
</div>

</body>
</html>
"""

def main():
    target_dir = os.path.abspath(r"d:\Etna\Projetos\DesafioIHF\docs")
    html_path = os.path.join(target_dir, "entregavel-3-manual-operacional-financeiro.html")
    pdf_path = os.path.join(target_dir, "entregavel-3-manual-operacional-financeiro.pdf")
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print(f"Gerado HTML do Entregavel 3: {html_path}")
    
    browser_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(browser_path):
        browser_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
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
        print(f"[SUCESSO] PDF do Entregavel 3 gerado: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
    else:
        print(f"[ERRO] Falha ao gerar PDF: {res.stderr}")

if __name__ == "__main__":
    main()
