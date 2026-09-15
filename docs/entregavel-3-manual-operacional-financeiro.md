# 📘 Entregável 3 — Manual Operacional do Time Financeiro
**Produto**: ImpactPay AI — Central de Contas a Pagar com Inteligência Artificial  
**Público-Alvo**: Equipe de Contas a Pagar & Operações Financeiras da Holding  
**Organização**: Holding Companhia de Impacto (*Impact Hubs*, *Salto*, *Impacta Mais*, *Seu PêJota*)  
**Autor**: Moisés Branco dos Santos  
**Versão**: 1.0 (Linguagem Acessível e Descomplicada)  

---

## 🌟 1. Boas-Vindas à Nova Rotina do Contas a Pagar

Olá, time financeiro!

Este manual foi desenhado especialmente para você que atua diariamente no contas a pagar da **Companhia de Impacto**.

Sabemos como era cansativo o processo anterior: abrir três caixas de e-mail diferentes todo santo dia, baixar dezenas de PDFs, digitar linha por linha numa planilha (com medo constante de errar um número ou esquecer um vencimento) e ainda ter que mandar mensagem no WhatsApp cobrando gestores que demoram a responder.

O **ImpactPay AI** nasceu para eliminar essa carga braçal repetitiva. A partir de agora:
* Você **não precisará mais redigitar** dados de notas fiscais em planilhas.
* O sistema possui uma **assistente inteligente de leitura visual** que preenche automaticamente o número da nota, o prestador, as retenções de impostos e o valor líquido.
* O gestor recebe um **cartão direto no aplicativo de chat corporativo** (Slack, Teams ou WhatsApp) com os dados mastigados e botões para aprovar em 1 clique.
* O seu papel passa a ser o mais nobre: **auditar, tomar decisões estratégicas e garantir que nenhum fornecedor fique sem receber no prazo**.

---

## 🚦 2. Entendendo os Status da Nota Fiscal

Para que todo o time fale a mesma língua, cada nota fiscal que entra no sistema passa por uma linha do tempo clara:

| Status Visual | O que significa na prática? | O que o financeiro precisa fazer? |
|---|---|---|
| 🟡 **RECEBIDA / EM LEITURA** | O fornecedor enviou o arquivo e a inteligência artificial está lendo as informações. | Nada. O processo leva menos de 10 segundos. |
| 🟢 **AGUARDANDO APROVAÇÃO** | A nota foi lida com 100% de clareza, os cálculos matemáticos bateram e o aviso já foi despachado para o gestor responsável. | Aguardar o gestor responder. Se faltarem 48h para o vencimento, o sistema envia um lembrete sozinho. |
| 🟠 **REVISÃO MANUAL** | A nota apresentou alguma dúvida (ex: foto borrada, imposto divergente ou dado ilegível). | Abrir a tela de conferência, dar uma rápida olhada no PDF lado a lado, ajustar o campo e aprovar. |
| 🔵 **PRONTO PARA PAGAMENTO** | O gestor clicou em "Aprovar". A nota está autorizada e agendada para liquidação. | Agendar/autorizar o Pix ou boleto no banco corporativo da respectiva empresa da holding. |
| ✅ **PAGO (CONCLUÍDO)** | Pagamento liquidado com anexo do comprovante Pix/bancário. | A nota é arquivada automaticamente e já fica disponível no lote da contabilidade. |
| 🔴 **RECUSADA** | O gestor reprovou a contratação ou o serviço não foi entregue como combinado. | O fornecedor recebe notificação automática com o motivo da recusa para corrigir e reenviar. |

---

## 🖥️ 3. A Tela de Conferência Assistida (*Human-in-the-Loop*)

Quando uma nota requer a sua atenção, você verá a tela de conferência dividida em dois lados:
* **Lado Esquerdo**: O visualizador do PDF da Nota Fiscal original.
* **Lado Direito**: O formulário com os campos que a IA já leu para você.

### Como funciona o código de cores:
* 🟢 **Campos em Verde**: A inteligência artificial encontrou a informação com clareza absoluta no documento. Você só bate o olho para validar.
* 🟡 **Campos em Amarelo Pulsante**: O documento estava cortado, com letras muito pequenas ou faltou alguma informação (por exemplo, a data de vencimento não veio impressa).
* 💡 **Dicas na Tela**: O sistema sempre exibe uma caixinha com dicas úteis para ajudar você, por exemplo: *"Verifique no rodapé da nota se há dados bancários ou chave Pix informados pelo prestador"*.

> **Regra de Ouro**: A inteligência artificial sugere, mas **você é quem manda**. Se você notar que o fornecedor é MEI e o sistema sugeriu alguma retenção indevida, basta alterar o valor no formulário e clicar em **"Salvar e Enviar para Aprovação"**.

---

## 🛠️ 4. Guia Rápido: "O Que Fazer Se Quebrar?" (Matriz de Incidentes)

Imprevistos acontecem no mundo real. Quando acontecer alguma situação fora do padrão, siga este roteiro passo a passo:

### 🚨 Caso 1: O PDF da nota fiscal está ilegível, escuro ou cortado
* **O que acontece**: A nota vai automaticamente para a fila de **Revisão Manual**.
* **Como agir**:
  1. Abra a nota na tela de conferência.
  2. Se não der para ler nem com zoom, clique no botão **"Solicitar Novo Envio ao Prestador"**.
  3. O sistema abre uma caixinha com mensagem pronta. Basta clicar em enviar que um e-mail educado é disparado ao fornecedor pedindo uma cópia nítida.

---

### 🚨 Caso 2: Fornecedor enviou a mesma nota duas vezes (Risco de Duplicidade)
* **O que acontece**: O fornecedor reencaminhou o e-mail ou enviou para duas caixas ao mesmo tempo.
* **Como o sistema protege**: O ImpactPay AI calcula a "impressão digital" (hash) do arquivo e checa a combinação de `CNPJ + Número da Nota`.
* **Como agir**:
  1. O sistema trava o segundo envio imediatamente e exibe o alerta: *"Nota Fiscal nº XXX já cadastrada no dia DD/MM sob ID #123"*.
  2. Nenhuma ação manual é necessária: o sistema não deixa duplicar lançamentos e envia um aviso amigável ao fornecedor confirmando que a primeira via já está em processamento.

---

### 🚨 Caso 3: A soma das retenções não bate com o valor líquido da nota
* **O que acontece**: A nota foi emitida com cálculo incorreto de impostos pelo prestador (ex: R$ 5.000,00 bruto menos R$ 100,00 de ISS deveria dar R$ 4.900,00, mas está impresso R$ 4.950,00).
* **Como agir**:
  1. A nota será marcada com uma tarja laranja: **"Divergência Tributária Detectada"**.
  2. Verifique qual alíquota causou a diferença (ISS, IRRF ou PIS/COFINS/CSLL).
  3. Se for apenas um arredondamento de centavos, você pode corrigir o valor líquido direto na tela.
  4. Se o valor estiver substancialmente errado, clique em **"Rejeitar por Erro Tributário"** para que o fornecedor cancele a nota e emita a carta de correção ou nova nota.

---

### 🚨 Caso 4: O gestor está viajando ou não responde no WhatsApp/Slack
* **O que acontece**: A fatura está próxima do vencimento e o gestor responsável ainda não deu o "Aprovar".
* **Como agir**:
  1. Com **48 horas** e **24 horas** de antecedência do vencimento, o sistema manda lembretes automáticos e reforçados no chat do gestor.
  2. Se faltarem menos de **24 horas** úteis para o vencimento, o sistema aciona o **Escalonamento Automático**: a pendência sobe para o superior direto da vertical (Diretor de Operações) para autorização de emergência.
  3. Caso você precise de resposta imediata, clique no botão **"Reenviar Lembrete Prioritário"** na tela da nota.

---

### 🚨 Caso 5: O fornecedor mandou um comprovante ou arquivo que NÃO é nota fiscal
* **O que acontece**: O remetente anexou um contrato em PDF, uma foto aleatória ou um comprovante de entrega no e-mail do financeiro.
* **Como agir**:
  1. O sistema identifica que o arquivo não possui estrutura fiscal e move o arquivo para a pasta **"Documentos Não Fiscais / Triagem"**.
  2. Ele não polui a sua fila de pagamentos. Você pode abrir o arquivo e arquivá-lo ou encaminhá-lo para o setor responsável (ex: Jurídico ou RH).

---

### 🚨 Caso 6: Mudança de dados bancários ou Chave Pix informada pelo fornecedor
* **O que acontece**: O fornecedor colocou no corpo do e-mail uma chave Pix diferente da que está cadastrada no contrato original.
* **Como agir (Alerta de Segurança / Compliance)**:
  1. **Nunca pague em chave Pix diferente de pessoa física** para contratos de pessoa jurídica sem autorização formal.
  2. A chave deve corresponder ao **CNPJ da empresa contratada**.
  3. Caso o prestador solicite pagamento em conta de terceiro, pause a nota em **"Aguardando Confirmação Bancária"** e peça validação por telefone/canal oficial com o gestor do contrato.

---

### 🚨 Caso 7: A assistente de IA ou a conexão caiu momentaneamente
* **O que acontece**: Uma oscilação temporária na internet ou no serviço de nuvem da inteligência artificial.
* **Como agir**:
  1. O n8n possui fila de proteção: ele tenta reprocessar automaticamente 3 vezes seguidas (após 1 minuto, 5 minutos e 15 minutos).
  2. Nenhuma nota é perdida: o arquivo fica salvo com segurança na fila de entrada.
  3. Quando a conexão restabelece, as notas são processadas em lote automaticamente.

---

## 📁 5. Como Repassar as Notas para o Contador da Holding

No final do mês, você não precisa mais compactar arquivos manualmente ou mandar e-mails gigantescos com 50 anexos para a contabilidade:

1. Acesse o menu **"Fechamento Contábil"**.
2. Selecione o mês de competência (ex: `2026-08`) e a empresa da holding (ou todas consolidadas).
3. Clique em **"Gerar Link Mágico para Contabilidade"**.
4. O sistema gera um link seguro que expira em 15 dias.
5. Ao abrir o link, o escritório contábil clica em **"Baixar Pacote Completo (.ZIP)"** e recebe todas as notas fiscais em PDF e XML já renomeadas no padrão oficial: `NF_Numero_NomeFornecedor.pdf`.

---

## 📞 6. Contatos de Suporte & Central de Ajuda

Se você se deparar com qualquer comportamento estranho do sistema:
* **Canal Interno no Slack/Teams**: `#suporte-impactpay`
* **E-mail de Suporte**: `suporte.ia@companhiadeimpacto.fake`
* **Plantão de Automação & IA**: Ramal interno 204 (Equipe de Produtos Digitais & IA)

---

*Manual elaborado com carinho para transformar a rotina do time financeiro da Companhia de Impacto.*
