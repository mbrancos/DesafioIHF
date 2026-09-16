// ====================================================================
// SOLUÇÃO A: CENTRAL FISCAL INTELIGENTE NO GOOGLE WORKSPACE
// Código do Google Apps Script (Backend de Aprovação e Monitor de Recusas)
// Holding Companhia de Impacto (iHubFiscal)
// ====================================================================

const CONFIG = {
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId(),
  SHEET_NAME: "Contas_a_Pagar",
  DRIVE_FOLDER_ID: "COLE_AQUI_O_ID_DA_SUA_PASTA_DO_DRIVE",
  EMAIL_GESTOR: Session.getActiveUser().getEmail()
};

/**
 * 1. ENDPOINT WEB APP: APROVAÇÃO EM 1 CLIQUE DIRETO DO E-MAIL
 * Ao clicar no link do e-mail recebido, altera o Status para APROVADO sem abrir a planilha.
 * Exemplo de URL gerada: https://script.google.com/macros/s/.../exec?id=IHF-2026-0001&acao=aprovar
 */
function doGet(e) {
  const idNota = e.parameter.id;
  const acao = e.parameter.acao; // "aprovar"
  
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let linha = -1;
  let prestador = "";
  let valor = "";
  
  // Percorre as linhas a partir da linha 2 (índice 1)
  for (let i = 1; i < data.length; i++) {
    // Localiza por Protocolo (Col A - data[i][0]) ou Número da Nota (Col F - data[i][5])
    if (String(data[i][0]) === String(idNota) || String(data[i][5]) === String(idNota)) {
      linha = i + 1;
      prestador = data[i][2];  // Col C - Prestador (Razão Social)
      valor = data[i][10];     // Col K - Valor Líquido
      break;
    }
  }
  
  if (linha === -1) {
    return HtmlService.createHtmlOutput(
      "<h3 style='font-family:sans-serif; color:#d93025; text-align:center; margin-top:50px;'>" +
      "Nota fiscal não localizada na base de dados. Verifique o identificador informado.</h3>"
    );
  }
  
  if (acao === "aprovar") {
    // 1. Altera o Status para APROVADO na Coluna O (índice 15 na contagem base-1 do Sheets)
    sheet.getRange(linha, 15).setValue("APROVADO");
    // 2. Carimba a Data de Aprovação na Coluna Q (índice 17)
    sheet.getRange(linha, 17).setValue(new Date());
    // 3. Registra o Aprovador na Coluna P (índice 16)
    sheet.getRange(linha, 16).setValue(CONFIG.EMAIL_GESTOR);
    
    return HtmlService.createHtmlOutput(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nota Fiscal Aprovada</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f7f6f2; }
          .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; max-width: 480px; border: 1px solid #e5e5e5; }
          .badge { background: #dcfce7; color: #16A34A; padding: 6px 14px; border-radius: 9999px; font-weight: bold; font-size: 13px; display: inline-block; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
          h2 { margin: 0 0 12px 0; color: #212020; font-size: 22px; }
          p { color: #484848; line-height: 1.6; margin: 8px 0; font-size: 14px; }
          .highlight { font-weight: 700; color: #812926; }
          .footer-note { font-size: 12px; color: #888888; margin-top: 24px; padding-top: 16px; border-top: 1px dashed #e5e5e5; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">STATUS: APROVADO</div>
          <h2>Nota Fiscal Aprovada com Sucesso!</h2>
          <p>A despesa vinculada ao protocolo/NF <span class="highlight">${idNota}</span> emitida por <strong>${prestador}</strong> foi liberada para a grade de pagamentos bancários.</p>
          <p class="footer-note">O status foi atualizado em tempo real na planilha de Contas a Pagar. Você já pode fechar esta aba com segurança.</p>
        </div>
      </body>
      </html>
    `);
  }

  return HtmlService.createHtmlOutput("<h3 style='font-family:sans-serif; text-align:center;'>Ação não reconhecida.</h3>");
}

/**
 * 2. MONITOR DE RECUSAS: ATUALIZA PARA 'REJEITADO' QUANDO O GESTOR RESPONDE AO FORNECEDOR
 * Acionado periodicamente por temporizador (ex: a cada minuto no Apps Script).
 * Procura respostas na caixa de Enviados com o padrão "REPROVADO - NF {NUMERO}".
 */
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
      const numeroNota = match[1]; // Captura correta do grupo regex
      for (let i = 1; i < data.length; i++) {
        // Compara com Número da Nota (Col F - data[i][5])
        if (String(data[i][5]) === String(numeroNota) && data[i][14] !== "REJEITADO" && data[i][14] !== "APROVADO") {
          sheet.getRange(i + 1, 15).setValue("REJEITADO"); // Coluna O (Status)
          sheet.getRange(i + 1, 17).setValue(new Date());     // Coluna Q (Data Decisão)
          sheet.getRange(i + 1, 18).setValue("Reprovado via e-mail enviado diretamente ao fornecedor"); // Coluna R (Obs)
          Logger.log(`Nota ${numeroNota} atualizada para REJEITADO com sucesso.`);
        }
      }
    }
  });
}
