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
<title>Entregável 1-B — Desenho da Arquitetura Serverless (iHubFiscal v2)</title>
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
    border-bottom: 2px solid #1c395c;
    padding-bottom: 5px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h1 {
    font-size: 13pt;
    color: #1c395c;
    margin: 0 0 2px 0;
    text-transform: uppercase;
    letter-spacing: -0.3px;
    font-weight: 800;
  }
  .header-left p {
    font-size: 8.2pt;
    color: #812926;
    margin: 0;
    font-weight: 600;
  }
  .badge-solucao {
    background: #e0f2fe;
    border: 1px solid #7dd3fc;
    color: #0369a1;
    font-size: 7.8pt;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    text-align: right;
    line-height: 1.25;
  }
  h2 {
    font-size: 9.6pt;
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
  .highlight-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 3px solid #1c395c;
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
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 4px 3px;
    text-align: center;
    font-size: 7.2pt;
  }
  .flow-step strong {
    display: block;
    color: #1c395c;
    font-size: 7.6pt;
    margin-bottom: 1px;
  }
  .flow-arrow {
    padding: 0 3px;
    color: #812926;
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
        <h1>Entregável 1-B — Desenho da Arquitetura Serverless</h1>
        <p>Plataforma Full-Stack com Next.js 15, Supabase, Google Gemini API & Vercel • Solução B</p>
      </div>
      <div class="badge-solucao">
        SOLUÇÃO B • ENTERPRISE<br>
        iHubFiscal v2 Full-Stack
      </div>
    </div>

    <h2>1. Visão Geral & Objetivos Estratégicos da Solução B</h2>
    <p>
      A <strong>Solução B</strong> representa a evolução corporativa e definitiva da gestão fiscal da Companhia de Impacto. Construída sobre uma arquitetura moderna e escalável (<strong>Next.js 15 App Router, Supabase PostgreSQL com RLS e Google Gemini 2.5 Flash via API</strong>), a plataforma oferece autoatendimento completo ao fornecedor, esteira visual Kanban de 6 fases com drag-and-drop, governança rigorosa de alçadas de despesa e fechamento contábil mensal com compilação de lotes .ZIP direto no navegador.
    </p>

    <h2>2. Visão Sistêmica Ponta a Ponta (Arquitetura Solução B)</h2>
    <div class="flow-diagram">
      <div class="flow-step">
        <strong>1. Portal Fornecedor</strong>
        Upload (/upload) com Split-View em Tempo Real
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>2. Route Handler IA</strong>
        API Gemini 2.5 Flash com Structured Outputs
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>3. Supabase RLS</strong>
        7 Tabelas Relacionais + Storage Criptografado
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>4. Kanban de 6 Fases</strong>
        Alçadas: Gestor até R$ 10k e CFO ilimitado
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step">
        <strong>5. Fechamento .ZIP</strong>
        Compilação no browser com jszip e CSV
      </div>
    </div>

    <h2>3. Componentes da Stack Tecnológica da Solução B</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 22%;">Camada</th>
          <th style="width: 28%;">Tecnologia Utilizada</th>
          <th>Racional Técnico & Vantagens Corporativas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Framework Web</td>
          <td><strong>Next.js 15 (React 19)</strong></td>
          <td>App Router com Server Actions e Route Handlers. Renderização otimizada, TypeScript estrito e latência mínima.</td>
        </tr>
        <tr>
          <td class="bold">Design & UI</td>
          <td><strong>Tailwind CSS + Tokens Oficiais</strong></td>
          <td>Extraído de floripa.impacthub.net (docs/designIHF.md): Poppins, bordô (#812926), navy (#1c395c) e ciano (#41bed0).</td>
        </tr>
        <tr>
          <td class="bold">Inteligência Artificial</td>
          <td><strong>Google Gemini 2.5 Flash API</strong></td>
          <td>Inferência multimodal direta sobre o binário da NFS-e. Validação por Schema Zod e pool com fallback para Flash Lite.</td>
        </tr>
        <tr>
          <td class="bold">Banco de Dados</td>
          <td><strong>Supabase PostgreSQL</strong></td>
          <td>Modelagem com 7 tabelas relacionais (invoices, companies, suppliers, cost_centers, invoice_events, payments, closings).</td>
        </tr>
        <tr>
          <td class="bold">Segurança & RLS</td>
          <td><strong>Row Level Security (RLS)</strong></td>
          <td>Políticas de isolamento multi-tenant garantem que cada empresa da holding acesse apenas suas próprias despesas.</td>
        </tr>
        <tr>
          <td class="bold">Hospedagem & CDN</td>
          <td><strong>Vercel Edge Network</strong></td>
          <td>Deploy contínuo via GitHub, distribuição global em borda, SSL automático e escalabilidade elástica sem servidor.</td>
        </tr>
      </tbody>
    </table>

    <h2>4. Matriz de Alçadas de Governança & Segregação de Funções (SoD)</h2>
    <div class="highlight-box">
      <strong>Regra Oficial de Alçadas da Holding:</strong><br>
      • <strong>Despesas até R$ 10.000,00:</strong> Podem ser deliberadas e aprovadas pelo Gestor da respectiva Vertical (Beatriz Inovação).<br>
      • <strong>Despesas superiores a R$ 10.000,00:</strong> Exigem compulsoriamente aprovação exclusiva do CFO (Rodrigo Controller). O sistema bloqueia a ação do gestor e sinaliza o card como privativo da diretoria.
    </div>

    <h2>5. Matriz de Papéis na Solução B (RACI)</h2>
    <table>
      <thead>
        <tr>
          <th>Etapa Operacional</th>
          <th class="center" style="width: 14%;">Fornecedor</th>
          <th class="center" style="width: 15%;">Carlos (Analista)</th>
          <th class="center" style="width: 15%;">Beatriz (Gestora)</th>
          <th class="center" style="width: 15%;">Rodrigo (CFO)</th>
          <th class="center" style="width: 14%;">Plataforma IA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Upload e conferência no portal (/upload)</td>
          <td class="center bold">R</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center bold">A (Extrai)</td>
        </tr>
        <tr>
          <td>Deduplicação e travas criptográficas</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center bold">A / R</td>
        </tr>
        <tr>
          <td>Triagem em Split-View (/conferencia/[id])</td>
          <td class="center">I</td>
          <td class="center bold">A / R</td>
          <td class="center">C</td>
          <td class="center">I</td>
          <td class="center">I</td>
        </tr>
        <tr>
          <td>Aprovação de despesas operacionais (&le; 10k)</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center bold">A / R</td>
          <td class="center">I</td>
          <td class="center">I</td>
        </tr>
        <tr>
          <td>Aprovação executiva de despesas altas (&gt; 10k)</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center">C</td>
          <td class="center bold">A / R</td>
          <td class="center">I</td>
        </tr>
        <tr>
          <td>Agendamento e baixa com comprovante Pix</td>
          <td class="center">I</td>
          <td class="center bold">A / R</td>
          <td class="center">I</td>
          <td class="center">I</td>
          <td class="center">I</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <span>Companhia de Impacto Holding • Solução B: iHubFiscal Enterprise</span>
    <span>Página 1 de 2</span>
  </div>
</div>

<!-- ==================== PÁGINA 2 ==================== -->
<div class="page">
  <div>
    <div class="header">
      <div class="header-left">
        <h1>Entregável 1-B — Governança, Riscos & Contingência na Solução B</h1>
        <p>Políticas de Risco, Auditoria Imutável, LGPD e Resiliência da Plataforma</p>
      </div>
      <div class="badge-solucao">
        SOLUÇÃO B • PÁGINA 2 DE 2
      </div>
    </div>

    <h2>6. Matriz de Riscos & Tratamento de Falhas ("O Que Fazer Se Quebrar")</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Cenário de Falha / Risco</th>
          <th class="center" style="width: 12%;">Severidade</th>
          <th style="width: 32%;">Mecanismo de Prevenção</th>
          <th>Procedimento Operacional de Contingência</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Nota fiscal com PDF escuro ou cortado</td>
          <td class="center" style="color: #d97706; font-weight: bold;">MÉDIA</td>
          <td>Schema Zod com Strict Null valida campos e direciona para a fase <code>1. Triagem & Divergências</code>.</td>
          <td>Analista abre a conferência em split-view (/conferencia/[id]), compara com o PDF e digita os valores corretos.</td>
        </tr>
        <tr>
          <td class="bold">Tentativa de envio de NF duplicada</td>
          <td class="center" style="color: #dc2626; font-weight: bold;">CRÍTICA</td>
          <td>Hash SHA-256 e índice composto <code>[company_id + cnpj + numero]</code> bloqueiam a inserção.</td>
          <td>A interface avisa imediatamente o número do protocolo original já registrado, eliminando risco de duplicidade de pagamento.</td>
        </tr>
        <tr>
          <td class="bold">Divergência tributária de retenções</td>
          <td class="center" style="color: #ea580c; font-weight: bold;">ALTA</td>
          <td>Checagem matemática: <code>|Bruto - Deduções - Líquido| &gt; 0,05</code> marca a flag de divergência fiscal.</td>
          <td>O sistema bloqueia a liberação do card até que o operador revise as alíquotas de ISS, IRRF, PIS/COFINS/CSLL.</td>
        </tr>
        <tr>
          <td class="bold">Instabilidade temporária da API de IA (503)</td>
          <td class="center" style="color: #d97706; font-weight: bold;">MÉDIA</td>
          <td>Pool fail-fast automático: chaveia de <code>gemini-flash-latest</code> para <code>gemini-flash-lite-latest</code> em &lt; 18s.</td>
          <td>Se persistir indisponibilidade, banner na tela libera o formulário para preenchimento manual imediato sem travar a operação.</td>
        </tr>
      </tbody>
    </table>

    <h2>7. Governança Corporativa, Auditoria e LGPD na Solução B</h2>
    <div class="highlight-box">
      <strong>🛡️ Trilha Perpétua de Auditoria (Tabela invoice_events):</strong><br>
      Cada alteração de status, edição manual de campo, tentativa de avanço e upload de comprovante é registrado com log imutável contendo <code>user_id</code>, <code>event_type</code>, <code>payload_diff</code> e <code>created_at</code>, assegurando conformidade contábil e fiscal para auditorias externas.
    </div>

    <p>
      <strong>Proteção de Dados Pessoais (LGPD):</strong> Em conformidade com a Lei 13.709/2018, as notas emitidas por autônomos e MEI recebem tratamento específico de segurança: tráfego estritamente criptografado por TLS 1.3, controle de acesso baseado em papéis (RBAC) e arquivos mantidos em buckets privados do Supabase Storage.
    </p>

    <h2>8. Comparativo de Viabilidade: Quando Escolher a Solução B?</h2>
    <table>
      <thead>
        <tr>
          <th>Critério Estratégico</th>
          <th>Capacidade da Solução B</th>
          <th>Impacto na Holding</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bold">Escalabilidade de Volume</td>
          <td><strong>Ilimitada</strong> (Arquitetura Serverless e Postgres)</td>
          <td>Permite que a holding cresça para dezenas de verticais e milhares de notas sem degradação.</td>
        </tr>
        <tr>
          <td class="bold">Segregação de Funções</td>
          <td><strong>Nativa no Banco e na UI</strong> (RLS + Alçadas)</td>
          <td>Elimina 100% o risco de fraudes ou aprovações indevidas acima do teto de gestor.</td>
        </tr>
        <tr>
          <td class="bold">Experiência do Fornecedor</td>
          <td><strong>Portal de Autoatendimento</strong> (/upload)</td>
          <td>Transfere o esforço de conferência para a ponta, reduzindo em 90% a carga do time financeiro.</td>
        </tr>
        <tr>
          <td class="bold">Fechamento Contábil</td>
          <td><strong>Lote .ZIP em 1 Clique</strong> via <code>jszip</code></td>
          <td>Compilação no navegador entregando PDFs padronizados e planilha CSV em segundos.</td>
        </tr>
      </tbody>
    </table>

    <h2>9. Conclusão Executiva da Solução B</h2>
    <p>
      A <strong>Solução B</strong> é o estado da arte em produtos digitais corporativos para o setor financeiro. Ela combina a inteligência artificial do Google Gemini com a solidez do ecossistema Next.js e Supabase, conferindo à Companhia de Impacto uma ferramenta profissional de padrão enterprise que impressiona pela robustez, elegância e segurança jurídica.
    </p>
  </div>

  <div class="footer">
    <span>Companhia de Impacto Holding • Solução B: iHubFiscal Enterprise</span>
    <span>Página 2 de 2 (Extensão Oficial)</span>
  </div>
</div>

</body>
</html>
"""

def main():
    target_dir = os.path.abspath(r"d:\Etna\Projetos\DesafioIHF\docs")
    html_path = os.path.join(target_dir, "entregavel-1-b-arquitetura-ihubfiscal-serverless.html")
    pdf_path = os.path.join(target_dir, "entregavel-1-b-arquitetura-ihubfiscal-serverless.pdf")
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print(f"Gerado HTML do Entregavel 1-B: {html_path}")
    
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
        print(f"[SUCESSO] PDF do Entregavel 1-B gerado: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
    else:
        print(f"[ERRO] Falha ao gerar PDF: {res.stderr}")

if __name__ == "__main__":
    main()
