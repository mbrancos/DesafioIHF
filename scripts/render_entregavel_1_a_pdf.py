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
<title>Entregável 1-A — Desenho da Solução Google Workspace (iHubFiscal Spark)</title>
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  .header {
    border-bottom: 2px solid #16a34a;
    padding-bottom: 5px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h1 {
    font-size: 13pt;
    color: #166534;
    margin: 0 0 2px 0;
    text-transform: uppercase;
    letter-spacing: -0.3px;
    font-weight: 800;
  }
  .header-left p {
    font-size: 8.2pt;
    color: #14532d;
    margin: 0;
    font-weight: 600;
  }
  .badge-solucao {
    background: #dcfce7;
    border: 1px solid #86efac;
    color: #166534;
    font-size: 7.8pt;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    text-align: right;
    line-height: 1.25;
  }
  h2 {
    font-size: 9.6pt;
    color: #166534;
    margin: 7px 0 3px 0;
    border-left: 3px solid #16a34a;
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
  .highlight-box {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-left: 3px solid #16a34a;
    border-radius: 4px;
    padding: 6px 9px;
    margin-bottom: 6px;
    font-size: 8.2pt;
    line-height: 1.3;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 6px;
    font-size: 7.8pt;
  }
  th {
    background: #166534;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 4px 6px;
    border: 1px solid #166534;
    text-transform: uppercase;
    font-size: 7.2pt;
  }
  td {
    padding: 3.5px 5px;
    border: 1px solid #cbd5e1;
    vertical-align: middle;
  }
  tr:nth-child(even) td {
    background: #f8fafc;
  }
  .center {
    text-align: center;
  }
  .bold {
    font-weight: 600;
  }
  .flow-diagram {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flow-step {
    flex: 1;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 3px;
    padding: 4px 3px;
    text-align: center;
    font-size: 7.2pt;
  }
  .flow-step strong {
    display: block;
    color: #166534;
    font-size: 7.6pt;
    margin-bottom: 1px;
  }
  .flow-arrow {
    padding: 0 3px;
    color: #16a34a;
    font-weight: bold;
    font-size: 9pt;
  }
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
        <h1>Entregável 1-A — Desenho da Solução Google Workspace</h1>
        <p>Automação Fiscal com Gemini Spark, Gmail, Drive, Sheets & Apps Script • Solução A</p>
      </div>
      <div class="badge-solucao">
        SOLUÇÃO A • NO-CODE / ÁGIL<br>
        100% Google Workspace
      </div>
    </div>

    <h2>1. Visão Geral & Racional Estratégico da Solução A</h2>
    <p>
      A <strong>Solução A</strong> foi concebida para atender à necessidade de <strong>implantação imediata com custo zero de infraestrutura</strong> na Companhia de Impacto. Aproveitando as ferramentas já contratadas no ecossistema Google Workspace (Gmail, Drive e Google Sheets), a solução utiliza o agente de IA multimodal <strong>Gemini Spark</strong> para ler anexos de e-mails em tempo real, salvar os PDFs originais no Drive, popular uma planilha com 18 colunas estruturadas e gerar links de aprovação em 1 clique via <strong>Google Apps Script</strong>.
    </p>

    <h2>2. Fluxo de Dados Ponta a Ponta (Arquitetura Solução A)</h2>
    <div class="flow-diagram">
      <div class="flow-step">
        <strong>1. Filtro no Gmail</strong>
        has:attachment subject:(Nota OR NFS-e OR Fiscal)
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>2. Google Drive</strong>
        Salva PDF original na pasta 'Notas Fiscais Recebidas'
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>3. Gemini Spark</strong>
        Extrai 18 campos tributários com Prompt Mestre
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>4. Google Sheets</strong>
        Insere linha na aba 'Contas_a_Pagar' e atualiza KPIs
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>5. Web App Apps Script</strong>
        E-mail com botão APROVAR (1-clique) e REPROVAR
      </div>
    </div>

    <h2>3. Componentes da Arquitetura Google Workspace</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 24%;">Componente</th>
          <th style="width: 32%;">Função no Processo</th>
          <th>Configuração & Detalhes Técnicos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Gmail (Recepção)</td>
          <td>Gatilho por evento de chegada de e-mail com anexo</td>
          <td>Filtro de busca que captura mensagens com termos fiscais e anexo PDF de qualquer fornecedor das 4 verticais.</td>
        </tr>
        <tr>
          <td class="bold">Google Drive (Storage)</td>
          <td>Repositório central de arquivos originais</td>
          <td>Pasta dedicada onde o script salva o arquivo binário, gerando link público direto de auditoria na planilha.</td>
        </tr>
        <tr>
          <td class="bold">Gemini Spark (IA Vision)</td>
          <td>Extração multimodal inteligente sem digitação</td>
          <td>Prompt de engenharia reversa com instruções estritas: impede preenchimento de campos não encontrados (Strict Null).</td>
        </tr>
        <tr>
          <td class="bold">Google Sheets (Banco)</td>
          <td>Base de dados tabular com fórmulas automáticas</td>
          <td>Aba 'Contas_a_Pagar' com 18 colunas (A a R) + Aba 'Dashboard' com KPIs em tempo real (<code>SUMIF</code>, <code>COUNTA</code>).</td>
        </tr>
        <tr>
          <td class="bold">Apps Script (Backend)</td>
          <td>Endpoint HTTP Web App para decisão do gestor</td>
          <td>Função <code>doGet(e)</code> que recebe <code>id</code> e <code>acao=aprovar</code>, atualizando a Coluna O para "APROVADO" em 1 clique.</td>
        </tr>
        <tr>
          <td class="bold">Monitor de Recusas</td>
          <td>Acionador por tempo (Trigger cron a cada minuto)</td>
          <td>Função que varre e-mails enviados com o padrão "REPROVADO - NF {NUMERO}" e marca a Coluna O para "REJEITADO".</td>
        </tr>
      </tbody>
    </table>

    <h2>4. Estrutura da Matriz Tabular (18 Colunas do Google Sheets)</h2>
    <div class="highlight-box">
      <strong>Layout Oficial da Aba Contas_a_Pagar:</strong><br>
      <code>A: Protocolo</code> | <code>B: Data Recebimento</code> | <code>C: Prestador (Razão Social)</code> | <code>D: CNPJ</code> | <code>E: Empresa Tomadora</code> | <code>F: Número da Nota</code> | <code>G: Centro de Custo</code> | <code>H: Descrição</code> | <code>I: Valor Bruto</code> | <code>J: Retenções</code> | <code>K: Valor Líquido</code> | <code>L: Vencimento</code> | <code>M: Chave Pix/Banco</code> | <code>N: Link Drive</code> | <code>O: Status</code> | <code>P: Aprovador</code> | <code>Q: Data Decisão</code> | <code>R: Observações</code>.
    </div>

    <h2>5. Matriz de Responsabilidades (RACI - Solução A)</h2>
    <table>
      <thead>
        <tr>
          <th>Etapa do Processo</th>
          <th class="center" style="width: 15%;">Fornecedor PJ</th>
          <th class="center" style="width: 18%;">Time Financeiro</th>
          <th class="center" style="width: 18%;">Gestor da Vertical</th>
          <th class="center" style="width: 16%;">Google Workspace</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Envio da Nota Fiscal por e-mail</td>
          <td class="center bold">R</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center">A (Detecta)</td>
        </tr>
        <tr>
          <td>Extração visual dos dados e gravação na planilha</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center bold">A / R (Gemini)</td>
        </tr>
        <tr>
          <td>Conferência de retenções e saneamento de linhas</td>
          <td class="center">I</td>
          <td class="center bold">A / R</td>
          <td class="center">C</td>
          <td class="center">I</td>
        </tr>
        <tr>
          <td>Aprovação direta por e-mail via Web App</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center bold">A / R</td>
          <td class="center">I</td>
        </tr>
        <tr>
          <td>Agendamento bancário e baixa na planilha</td>
          <td class="center">I</td>
          <td class="center bold">A / R</td>
          <td class="center">I</td>
          <td class="center">I</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <span>Companhia de Impacto Holding • Solução A: Google Workspace</span>
    <span>Página 1 de 2</span>
  </div>
</div>

<!-- ==================== PÁGINA 2 ==================== -->
<div class="page">
  <div>
    <div class="header">
      <div class="header-left">
        <h1>Entregável 1-A — Governança, Riscos & Contingência no Workspace</h1>
        <p>Políticas de Segurança, Monitoramento e Resolução de Incidentes na Solução A</p>
      </div>
      <div class="badge-solucao">
        SOLUÇÃO A • PÁGINA 2 DE 2
      </div>
    </div>

    <h2>6. Matriz de Contingência e Mitigação de Riscos (Solução A)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Ponto de Risco / Falha</th>
          <th class="center" style="width: 12%;">Severidade</th>
          <th style="width: 32%;">Mecanismo de Prevenção</th>
          <th>Procedimento Operacional de Contingência</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Nota fiscal ilegível ou foto cortada</td>
          <td class="center" style="color: #d97706; font-weight: bold;">MÉDIA</td>
          <td>Prompt do Gemini Spark preenche como vazio e marca a coluna Status como <code>PENDENTE_REVISAO</code>.</td>
          <td>O analista abre o link do PDF salvo na Coluna N do Sheets, digita as informações faltantes e altera o status para <code>AGUARDANDO_APROVACAO</code>.</td>
        </tr>
        <tr>
          <td class="bold">Fornecedor envia mesma NF em duplicidade</td>
          <td class="center" style="color: #dc2626; font-weight: bold;">ALTA</td>
          <td>Formatação condicional no Google Sheets destaca em vermelho duplicatas na Coluna F (Número da Nota).</td>
          <td>O operador deleta a linha duplicada e responde ao e-mail informando que a fatura original já se encontra em esteira de aprovação.</td>
        </tr>
        <tr>
          <td class="bold">Gestor não clica no botão de aprovação</td>
          <td class="center" style="color: #d97706; font-weight: bold;">MÉDIA</td>
          <td>Filtro de visualização no Google Sheets destaca despesas sem aprovação há mais de 48 horas.</td>
          <td>O analista financeiro reenvia o e-mail com o link do Web App de aprovação ou cobra diretamente o gestor da vertical.</td>
        </tr>
        <tr>
          <td class="bold">Falha no acionador do Apps Script</td>
          <td class="center" style="color: #ea580c; font-weight: bold;">ALTA</td>
          <td>Painel de Execuções do Apps Script registra logs de erro detalhados de todas as chamadas HTTP.</td>
          <td>O gestor pode alternativamente abrir a planilha e alterar manualmente o menu suspenso da Coluna O para "APROVADO".</td>
        </tr>
      </tbody>
    </table>

    <h2>7. Aspectos de Governança e Segurança no Google Workspace</h2>
    <div class="highlight-box">
      <strong>🔒 Controle de Permissões por Nível de Conta Google:</strong><br>
      A planilha é compartilhada exclusivamente com os e-mails corporativos da holding (@impacthub.net / parceiros autorizados). Os gestores das verticais possuem permissão de leitura geral e edição restrita apenas à coluna de Status, impedindo a alteração inadvertida de valores ou dados de fornecedores.
    </div>

    <p>
      <strong>Trilha de Auditoria Nativa:</strong> O Google Sheets possui o recurso <em>Histórico de Versões</em> que registra o autor, a data e o segundo exato de qualquer modificação de célula. Adicionalmente, o Web App Apps Script grava na Coluna P o e-mail do gestor logado que realizou o clique de aprovação, conferindo validade e autenticidade ao processo.
    </p>

    <h2>8. Comparativo de Viabilidade: Quando Escolher a Solução A?</h2>
    <table>
      <thead>
        <tr>
          <th>Critério de Avaliação</th>
          <th>Comportamento da Solução A</th>
          <th>Recomendação para a Holding</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Custo de Infraestrutura</td>
          <td><strong>R$ 0,00 adicionais</strong> (Usa licenças Workspace existentes)</td>
          <td>Ideal para início no Dia 1 sem necessidade de aprovação de orçamento de servidores.</td>
        </tr>
        <tr>
          <td class="bold">Curva de Aprendizado</td>
          <td><strong>Zero</strong> (Equipe já utiliza Gmail e Google Sheets diariamente)</td>
          <td>Adoção imediata pelos gestores e analistas sem treinamento de nova interface.</td>
        </tr>
        <tr>
          <td class="bold">Tempo de Implementação</td>
          <td><strong>Inferior a 2 horas</strong> (Criação de pasta, planilha e deploy do script)</td>
          <td>Resolve o gargalo operacional imediatamente enquanto soluções mais complexas são maturadas.</td>
        </tr>
        <tr>
          <td class="bold">Volume Indicado</td>
          <td>Até <strong>500 notas fiscais por mês</strong></td>
          <td>Atende com folga a demanda atual das 4 verticais da Companhia de Impacto.</td>
        </tr>
      </tbody>
    </table>

    <h2>9. Conclusão Executiva da Solução A</h2>
    <p>
      A <strong>Solução A</strong> comprova que é possível transformar o contas a pagar de uma holding multifacetada utilizando recursos nativos de inteligência artificial sem incorrer em custos de desenvolvimento pesados. É a escolha perfeita para velocidade de entrega, simplicidade de uso e eficiência imediata.
    </p>
  </div>

  <div class="footer">
    <span>Companhia de Impacto Holding • Solução A: Google Workspace</span>
    <span>Página 2 de 2 (Extensão Oficial)</span>
  </div>
</div>

</body>
</html>
"""

def main():
    target_dir = os.path.abspath(r"d:\Etna\Projetos\DesafioIHF\docs")
    html_path = os.path.join(target_dir, "entregavel-1-a-desenho-solucao-workspace.html")
    pdf_path = os.path.join(target_dir, "entregavel-1-a-desenho-solucao-workspace.pdf")
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print(f"Gerado HTML do Entregavel 1-A: {html_path}")
    
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
        print(f"[SUCESSO] PDF do Entregavel 1-A gerado: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
    else:
        print(f"[ERRO] Falha ao gerar PDF: {res.stderr}")

if __name__ == "__main__":
    main()
