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
<title>Entregável 3 — Manual Operacional do Time Financeiro (iHubFiscal)</title>
<style>
  @page {
    size: A4 portrait;
    margin: 10mm 13mm;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 8.8pt;
    line-height: 1.32;
    color: #1e293b;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }
  .page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  .header {
    border-bottom: 2px solid #812926;
    padding-bottom: 5px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h1 {
    font-size: 13.5pt;
    color: #812926;
    margin: 0 0 2px 0;
    text-transform: uppercase;
    letter-spacing: -0.3px;
    font-weight: 800;
  }
  .header-left p {
    font-size: 8.2pt;
    color: #1c395c;
    margin: 0;
    font-weight: 600;
  }
  .badge-manual {
    background: #f2eae9;
    border: 1px solid #e5c39e;
    color: #812926;
    font-size: 7.8pt;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    text-align: right;
    line-height: 1.25;
  }
  h2 {
    font-size: 9.8pt;
    color: #1c395c;
    margin: 7px 0 3px 0;
    border-left: 3px solid #812926;
    padding-left: 6px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    font-weight: 700;
  }
  p {
    margin: 0 0 5px 0;
    font-size: 8.5pt;
    color: #334155;
    text-align: justify;
  }
  .alert-box {
    background: #f7f6f2;
    border-left: 3px solid #1c395c;
    border-radius: 0 4px 4px 0;
    padding: 6px 9px;
    margin-bottom: 6px;
    font-size: 8.1pt;
    line-height: 1.3;
  }
  .alert-box strong {
    color: #1c395c;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 6px;
    font-size: 7.8pt;
  }
  th {
    background: #1c395c;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 4px 6px;
    border: 1px solid #1c395c;
    text-transform: uppercase;
    font-size: 7.2pt;
  }
  td {
    padding: 3.5px 5px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }
  tr:nth-child(even) td {
    background: #f8fafc;
  }
  .case-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 5px 7px;
    margin-bottom: 5px;
    font-size: 8pt;
    line-height: 1.25;
  }
  .case-card.danger {
    border-left: 3.5px solid #dc2626;
  }
  .case-card.warning {
    border-left: 3.5px solid #ea580c;
  }
  .case-card.info {
    border-left: 3.5px solid #1c395c;
  }
  .case-title {
    font-weight: 700;
    color: #0f172a;
    font-size: 8.4pt;
    margin-bottom: 1px;
    display: flex;
    justify-content: space-between;
  }
  .case-tag {
    font-size: 6.8pt;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  .tag-danger { background: #fee2e2; color: #b91c1c; }
  .tag-warning { background: #fef3c7; color: #b45309; }
  .tag-info { background: #e0f2fe; color: #1c395c; }
  .footer {
    border-top: 1px solid #e2e8f0;
    padding-top: 3px;
    font-size: 7.2pt;
    color: #94a3b8;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>

<!-- ==================== PÁGINA 1 ==================== -->
<div class="page">
  <div>
    <div class="header">
      <div class="header-left">
        <h1>iHubFiscal — Manual Operacional do Financeiro</h1>
        <p>Guia Prático e Descomplicado do Contas a Pagar & Alçadas • Holding Companhia de Impacto</p>
      </div>
      <div class="badge-manual">
        Entregável 3 • Manual Operacional<br>
        Versão Oficial 2.0 (Time Financeiro)
      </div>
    </div>

    <h2>1. Boas-Vindas à Nova Rotina do Contas a Pagar</h2>
    <p>
      Este manual orienta a operação diária do time financeiro da <strong>Companhia de Impacto</strong>. 
      O <strong>iHubFiscal</strong> foi desenvolvido para eliminar o retrabalho de checar e-mails descentralizados e redigitar dados de notas fiscais em planilhas.
      Com inteligência artificial <strong>Google Gemini</strong> integrada, o fornecedor realiza o autoenvio na rota <code>/upload</code> com visualizador lado a lado (Split-View), a esteira audita retenções tributárias, calcula a unicidade por hash e organiza as faturas em um <strong>Quadro Kanban de 6 Fases com alçadas estritas</strong>.
    </p>

    <h2>2. O Ciclo de Vida da Nota Fiscal (6 Fases Oficiais do Kanban)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 24%;">Fase no Kanban</th>
          <th style="width: 38%;">O que significa no sistema?</th>
          <th>Responsabilidade do Time Financeiro</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong style="color: #b45309;">1. Triagem & Divergências</strong></td>
          <td>A nota foi lida pela IA e retida para saneamento (ex: foto borrada, cálculo tributário divergente ou dados cadastrais pendentes).</td>
          <td>Abrir em <code>/conferencia/[id]</code>, comparar PDF com os campos da IA, ajustar as retenções se necessário e liberar.</td>
        </tr>
        <tr>
          <td><strong style="color: #16a34a;">2. Aguardando Aprovação</strong></td>
          <td>Nota consistente aguardando decisão. <strong>Alçadas ativas:</strong> Gestor aprova até R$ 10.000,00; valores &gt; R$ 10k exigem parecer exclusivo do CFO.</td>
          <td>Monitorar o quadro. Se a fatura ultrapassar R$ 10k, o card é sinalizado como exclusivo do CFO Rodrigo.</td>
        </tr>
        <tr>
          <td><strong style="color: #dc2626;">3. Recusado</strong></td>
          <td>Despesa rejeitada pelo gestor da vertical ou reprovada pelo financeiro com registro formal do motivo no banco de dados.</td>
          <td>Verificar a justificativa gravada no histórico para orientar o prestador de serviços caso haja necessidade de correção.</td>
        </tr>
        <tr>
          <td><strong style="color: #0284c7;">4. Agendar Pagamento</strong></td>
          <td>A despesa foi formalmente aprovada pela respectiva alçada e liberada para a programação bancária pelo analista (Carlos).</td>
          <td>Acessar o internet banking da empresa correspondente da holding e agendar o Pix ou boleto de liquidação.</td>
        </tr>
        <tr>
          <td><strong style="color: #7c3aed;">5. Agendado</strong></td>
          <td>Despesa já cadastrada e programada no internet banking, aguardando a data exata do débito na conta para a baixa definitiva.</td>
          <td>Garante que faturas com vencimento futuro não fiquem perdidas nem sejam agendadas duas vezes por engano.</td>
        </tr>
        <tr>
          <td><strong style="color: #15803d;">6. Pago & Liquidado</strong></td>
          <td>Pagamento efetivado no banco com anexo do comprovante Pix. A despesa é arquivada e entra no lote contábil mensal.</td>
          <td>Dar baixa no sistema anexando o comprovante em PDF/imagem. A nota é incluída automaticamente no fechamento contábil.</td>
        </tr>
      </tbody>
    </table>

    <h2>3. A Tela de Autoatendimento e Conferência Assistida (Split View)</h2>
    <div class="alert-box">
      <strong>🖥️ Visualizador Lado a Lado (/upload e /conferencia):</strong><br>
      Tanto no envio pelo fornecedor quanto na triagem pelo analista, a tela apresenta o PDF da nota à esquerda e os campos extraídos à direita.
      <ul style="margin: 2px 0 0 14px; padding: 0;">
        <li><strong>Campos Validados:</strong> Prestador, CNPJ, Tomador (Vertical), Número da NF, Emissão, Vencimento, Bruto, Deduções, Alíquotas e Líquido.</li>
        <li><strong>Auditoria Fiscal:</strong> O sistema checa automaticamente se <code>Bruto - Retenções = Líquido</code> com tolerância máxima de 5 centavos.</li>
      </ul>
    </div>

    <h2>4. Fechamento Contábil Mensal em 1 Clique (Pacote .ZIP com jszip)</h2>
    <p>
      No encerramento do mês, o analista financeiro acessa a rota <code>/fechamento</code>, seleciona a vertical da holding (ex: <em>Impact Hub Floripa</em>) e o mês de competência, e clica em <strong>"Baixar Pacote Contábil (.ZIP)"</strong>. O sistema compila no navegador, sem sobrecarregar servidores externos, um arquivo compactado contendo todos os PDFs renomeados no padrão <code>NF_{numero}_{prestador}.pdf</code> acompanhados da planilha <code>fechamento-contabil.csv</code> com todos os metadados e conciliação.
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
        <h1>iHubFiscal — Matriz "O Que Fazer Se Quebrar?"</h1>
        <p>Procedimentos Operacionais de Contingência, Alçadas & Suporte • Holding Companhia de Impacto</p>
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
        <span class="case-tag tag-warning">Triagem / Saneamento</span>
      </div>
      <strong>O que fazer:</strong> O sistema retém a fatura na fase <code>1. Triagem & Divergências</code>. O analista Carlos abre <code>/conferencia/[id]</code>, aciona o zoom no PDF e realiza o saneamento manual dos campos ilegíveis antes de encaminhar para aprovação.
    </div>

    <div class="case-card danger">
      <div class="case-title">
        <span>2. Fornecedor envia a mesma nota fiscal duas vezes (Risco de Duplicidade)</span>
        <span class="case-tag tag-danger">Bloqueio Criptográfico</span>
      </div>
      <strong>O que fazer:</strong> O iHubFiscal calcula o hash SHA-256 do arquivo e valida o índice único <code>[company_id + cnpj + numero]</code>. A submissão é bloqueada na hora, exibindo o número do protocolo original e impedindo pagamentos duplicados no banco.
    </div>

    <div class="case-card danger">
      <div class="case-title">
        <span>3. A soma das retenções de impostos não bate com o valor líquido</span>
        <span class="case-tag tag-danger">Divergência Fiscal</span>
      </div>
      <strong>O que fazer:</strong> O sistema bloqueia o avanço da nota e destaca o alerta em vermelho. Se for mero arredondamento de centavos, o analista corrige o campo. Se houver erro de alíquota do fornecedor, a nota é recusada com justificativa formal para cancelamento.
    </div>

    <div class="case-card warning">
      <div class="case-title">
        <span>4. Gestor tenta aprovar nota fiscal acima de R$ 10.000,00</span>
        <span class="case-tag tag-warning">Trava de Alçada</span>
      </div>
      <strong>O que fazer:</strong> Pela matriz de governança da holding, gestores operacionais (Beatriz) têm alçada até R$ 10.000,00. Acima desse teto, o botão de aprovação fica bloqueado e o card exige compulsoriamente a deliberação do CFO Rodrigo no sistema.
    </div>

    <div class="case-card info">
      <div class="case-title">
        <span>5. Mudança repentina de Chave Pix ou dados bancários</span>
        <span class="case-tag tag-info">Segurança Bancária</span>
      </div>
      <strong>O que fazer:</strong> Por conformidade financeira, nunca liquide em conta de pessoa física despesas contratadas com pessoa jurídica sem contrato aditivo. Mantenha a nota em validação e confirme os dados bancários diretamente com o gestor do contrato.
    </div>

    <div class="case-card info">
      <div class="case-title">
        <span>6. Queda de conectividade ou indisponibilidade da IA (HTTP 503)</span>
        <span class="case-tag tag-info">Pool Fail-Fast & Manual</span>
      </div>
      <strong>O que fazer:</strong> O backend tenta automaticamente o modelo <code>gemini-flash-latest</code> e chaveia em menos de 18 segundos para <code>gemini-flash-lite-latest</code>. Se a instabilidade persistir, a tela do fornecedor e do analista exibe a opção de preenchimento manual contingencial.
    </div>

    <h2>6. Contatos de Suporte & Central de Ajuda</h2>
    <table style="margin-bottom: 5px;">
      <thead>
        <tr>
          <th>Canal de Atendimento</th>
          <th>Responsável / Acesso</th>
          <th>Quando acionar?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Central do Time Financeiro</td>
          <td>Carlos Financeiro (Analista de Contas a Pagar)</td>
          <td>Dúvidas sobre conferência de retenções, status do Kanban e baixas bancárias.</td>
        </tr>
        <tr>
          <td class="bold">Alçadas Superiores & Diretoria</td>
          <td>Rodrigo Controller (CFO da Holding)</td>
          <td>Aprovação de despesas superiores a R$ 10.000,00 e fechamento contábil mensal.</td>
        </tr>
        <tr>
          <td class="bold">Parametrização & Holding</td>
          <td>Mariana Admin (Administradora da Plataforma)</td>
          <td>Cadastro de novos centros de custo, atualização de alçadas e empresas da holding.</td>
        </tr>
        <tr>
          <td class="bold">Repositório & Engenharia de IA</td>
          <td><a href="https://github.com/mbrancos/DesafioIHF" target="_blank" style="color: #1c395c; font-weight: bold;">github.com/mbrancos/DesafioIHF</a></td>
          <td>Suporte técnico, atualizações da API do Gemini e melhorias no produto digital.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <span>Companhia de Impacto Holding • Manual do Time Financeiro</span>
    <span>Página 2 de 2 • Versão Oficial Homologada iHubFiscal</span>
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
