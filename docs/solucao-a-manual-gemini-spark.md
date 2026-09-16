# 📗 Solução A — Automação Fiscal Inteligente com Gemini Spark & Google Workspace
**Produto**: iHubFiscal Spark — Central Ágil de Contas a Pagar (Solução A)  
**Ecossistema**: Google Workspace (Gemini Spark, Gmail, Google Drive, Google Sheets, Google Apps Script)  
**Organização**: Holding Companhia de Impacto (*Impact Hub Floripa*, *Salto*, *Impacta Mais*, *Seu PêJota*)  
**Status**: 100% Implementado e Operacional no Google Workspace  

---

## 🌟 Visão Geral da Solução A

A **Solução A** é a resposta de implantação imediata com **custo zero de infraestrutura** para a holding:
1. **Detecta** novos e-mails com notas fiscais em anexo via filtro Gmail.
2. **Salva** o PDF original na pasta estruturada do Google Drive.
3. **Extrai** os dados fiscais via inteligência artificial multimodal do **Gemini Spark** e alimenta a planilha do Google Sheets com fórmulas e tipagem numérica.
4. **Atualiza** o Dashboard financeiro em tempo real com fórmulas nativas (`SUMIF`, `COUNTA`).
5. **Dispara** e-mail para o gestor com **Aprovação em 1 clique** (via Web App Google Apps Script) e **Reprovação direta** ao fornecedor via comando `mailto`.

---

## Passo 1: Estrutura no Google Drive e Google Sheets

### 1.1 Pasta no Google Drive
* Nome da pasta: **`Notas Fiscais Recebidas`**
* Armazena os arquivos originais das NFS-e recebidas, organizadas por data.

### 1.2 Planilha no Google Sheets
* Nome da planilha: **`Contas a Pagar - Controle Fiscal`**
* Abas: **`Contas_a_Pagar`** e **`Dashboard`**

#### Cabeçalhos da aba `Contas_a_Pagar` (Linha 1, Colunas A a R):
* `A: ID Protocolo`
* `B: Data Recebimento`
* `C: Prestador (Razão Social)`
* `D: CNPJ Prestador`
* `E: Empresa Tomadora`
* `F: Número da Nota`
* `G: Centro de Custo`
* `H: Descrição do Serviço`
* `I: Valor Bruto (R$)`
* `J: Retenções (R$)`
* `K: Valor Líquido (R$)`
* `L: Data Vencimento`
* `M: Chave Pix / Dados Bancários`
* `N: Link da Nota no Drive`
* `O: Status` (Validação: `AGUARDANDO_APROVACAO`, `APROVADO`, `REJEITADO`, `PAGO`)
* `P: Aprovador Responsável`
* `Q: Data Aprovação`
* `R: Observações`

#### Fórmulas da aba `Dashboard`:
* **Total Faturado**: `=SUM(Contas_a_Pagar!I2:I)`
* **Total Aprovado**: `=SUMIF(Contas_a_Pagar!O2:O; "APROVADO"; Contas_a_Pagar!K2:K)`
* **Total Aguardando Aprovação**: `=SUMIF(Contas_a_Pagar!O2:O; "AGUARDANDO_APROVACAO"; Contas_a_Pagar!K2:K)`
* **Total de Retenções**: `=SUM(Contas_a_Pagar!J2:J)`
* **Qtd de Notas**: `=COUNTA(Contas_a_Pagar!A2:A)`

---

## Passo 2: Código do Google Apps Script (Backend de Aprovação)

Arquivo disponível para download em: [`portal/downloads/solucao-a-codigo-apps-script.js`](../portal/downloads/solucao-a-codigo-apps-script.js)

```javascript
const CONFIG = {
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId(),
  SHEET_NAME: "Contas_a_Pagar",
  DRIVE_FOLDER_ID: "COLE_AQUI_O_ID_DA_SUA_PASTA_DO_DRIVE",
  EMAIL_GESTOR: Session.getActiveUser().getEmail()
};

function doGet(e) {
  const idNota = e.parameter.id;
  const acao = e.parameter.acao;
  
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let linha = -1;
  let prestador = "";
  let valor = "";
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(idNota) || String(data[i][5]) === String(idNota)) {
      linha = i + 1;
      prestador = data[i][2];
      valor = data[i][10];
      break;
    }
  }
  
  if (linha === -1) {
    return HtmlService.createHtmlOutput("<h3 style='font-family:sans-serif; color:#d93025; text-align:center;'>Nota fiscal não localizada na base de dados.</h3>");
  }
  
  if (acao === "aprovar") {
    sheet.getRange(linha, 15).setValue("APROVADO");
    sheet.getRange(linha, 17).setValue(new Date());
    sheet.getRange(linha, 16).setValue(CONFIG.EMAIL_GESTOR);
    
    return HtmlService.createHtmlOutput(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f8f9fa; }
          .card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 480px; }
          .badge { background: #e6f4ea; color: #137333; padding: 6px 12px; border-radius: 16px; font-weight: bold; font-size: 14px; display: inline-block; margin-bottom: 16px; }
          h2 { margin: 0 0 10px 0; color: #202124; }
          p { color: #5f6368; line-height: 1.5; margin: 8px 0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">STATUS: APROVADO</div>
          <h2>Nota Fiscal Aprovada com Sucesso!</h2>
          <p>A fatura <strong>${idNota}</strong> (${prestador}) foi confirmada e liberada para liquidação financeira.</p>
          <p style="font-size: 12px; color: #80868b; margin-top: 20px;">O registro foi atualizado na planilha. Você pode fechar esta janela.</p>
        </div>
      </body>
      </html>
    `);
  }
}

function verificarEmailsReprovadosEnviados() {
  const threads = GmailApp.search('in:sent subject:"REPROVADO - NF"');
  if (!threads || threads.length === 0) return;
  
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  threads.forEach(thread => {
    const subject = thread.getFirstMessageSubject();
    const match = subject.match(/NF\s*([0-9A-Za-z-]+)/i);
    if (match) {
      const numeroNota = match[1];
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][5]) === String(numeroNota) && data[i][14] !== "REJEITADO" && data[i][14] !== "APROVADO") {
          sheet.getRange(i + 1, 15).setValue("REJEITADO");
          sheet.getRange(i + 1, 17).setValue(new Date());
          sheet.getRange(i + 1, 18).setValue("Reprovado via e-mail enviado diretamente ao fornecedor");
          Logger.log(`Nota ${numeroNota} marcada como REJEITADO.`);
        }
      }
    }
  });
}
```

---

## Passo 3: Prompt Mestre do Gemini Spark

Arquivo disponível para download em: [`portal/downloads/solucao-a-prompt-gemini-spark.txt`](../portal/downloads/solucao-a-prompt-gemini-spark.txt)

```text
Por favor, configure uma automação autônoma de contas a pagar com as seguintes especificações:

Gatilho da Rotina:
Quando eu receber um novo e-mail contendo anexo com o filtro:
has:attachment subject:(Nota OR NFS-e OR NF-e OR Fiscal)

Fluxo de Execução da Rotina:
1. Localizar e ler a mensagem recente recebida, identificando o remetente original (e-mail do fornecedor) e o anexo da nota fiscal em PDF.
2. Salvar o arquivo físico em PDF da nota na minha pasta do Google Drive:
   URL da Pasta: [COLE_AQUI_O_LINK_DA_PASTA_DO_DRIVE]
3. Extrair os campos fiscais estruturados:
   - Número da Nota
   - Data de Emissão e Vencimento
   - Prestador (Razão Social e CNPJ)
   - Tomador (Vertical/Empresa)
   - Descrição dos serviços
   - Centro de Custo compatível
   - Valor Bruto, Retenções e Valor Líquido (converter para formato numérico)
   - Chave Pix ou Dados Bancários
4. Acessar minha planilha no Google Sheets:
   ID da Planilha: [COLE_AQUI_O_ID_DA_SUA_PLANILHA]
   Aba: "Contas_a_Pagar"
5. Inserir uma nova linha com todos os 18 campos preenchidos, gerando protocolo sequencial (ex: IHF-2026-0001), vinculando o link do PDF salvo no Drive e definindo o Status inicial obrigatoriamente como "AGUARDANDO_APROVACAO".
6. Enviar um e-mail de notificação para mim com:
   - Resumo claro da fatura.
   - Link de acesso ao PDF no Drive e à planilha.
   - Botão APROVAR NOTA configurado exatamente com o link do meu Web App de 1 clique:
     [COLE_AQUI_A_SUA_URL_DO_WEBAPP_DO_APPS_SCRIPT]?id={ID_PROTOCOLO}&acao=aprovar
   - Botão REPROVAR NOTA com comando mailto apontando diretamente para o e-mail do fornecedor que enviou a nota, com assunto "REPROVADO - NF {NUMERO} {PRESTADOR}" para envio do motivo da recusa.
```

---

## Passo 4: Matriz de Testes & Validação da Solução A

| Etapa de Teste | O que Fazer | Resultado Esperado |
|---|---|---|
| **1. Recepção** | Enviar e-mail com assunto *"Nota Fiscal de Serviço"* e PDF em anexo. | O Gemini Spark detecta o e-mail em menos de 1 minuto. |
| **2. Storage e Planilha** | Verificar pasta do Drive e planilha após a notificação. | PDF salvo no Drive e nova linha gerada com status `AGUARDANDO_APROVACAO`. |
| **3. Dashboard** | Abrir aba `Dashboard`. | Indicadores (R$) e contagem de notas aumentam automaticamente. |
| **4. Teste de Aprovação** | Abrir e-mail recebido e clicar no botão verde **APROVAR NOTA**. | Janela abre confirmando aprovação e a planilha muda para **`APROVADO`** sem abrir o Sheets. |
| **5. Teste de Reprovação** | Em nova nota, clicar no botão vermelho **REPROVAR**. | Abre e-mail para o fornecedor. Ao enviar, o acionador detecta e marca como **`REJEITADO`** na planilha. |
