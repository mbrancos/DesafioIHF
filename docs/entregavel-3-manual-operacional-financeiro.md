# 📘 Entregável 3 — Manual Operacional do Time Financeiro
**Produto**: iHubFiscal v2 — Central Integrada de Contas a Pagar & Governança com IA  
**Público-Alvo**: Equipe de Contas a Pagar & Operações Financeiras da Holding  
**Organização**: Holding Companhia de Impacto (*Impact Hub Floripa*, *Instituto Salto*, *Impacta Mais*, *Seu PêJota*)  
**Autor**: Moisés Branco dos Santos  
**Versão**: 2.0 (Linguagem Acessível e Descomplicada)  

---

## 🌟 1. Boas-Vindas à Nova Rotina do Contas a Pagar

Olá, time financeiro!

Este manual foi desenhado especialmente para você que atua diariamente no contas a pagar da **Companhia de Impacto**.

Sabemos como era cansativo o processo anterior: abrir três caixas de e-mail diferentes todo santo dia, baixar dezenas de PDFs, digitar linha por linha numa planilha (com medo constante de errar um número ou esquecer um vencimento) e ainda ter que mandar mensagem cobrando gestores que demoram a responder.

O **iHubFiscal** nasceu para eliminar essa carga braçal repetitiva. A partir de agora:
* O próprio fornecedor acessa a rota `/upload`, envia a NFS-e e confere a leitura da inteligência artificial **Google Gemini** em uma tela com **visualizador lado a lado (Split-View)** antes de submeter.
* O sistema audita retenções tributárias (`Bruto - Retenções = Líquido`), bloqueia notas duplicadas com **hash SHA-256** e organiza as pendências em um **Quadro Kanban de 6 Fases com alçadas automatizadas**.
* Despesas até R$ 10.000,00 são aprovadas pelo gestor da vertical (Beatriz); faturas acima de R$ 10.000,00 contam com trava de governança que exige deliberação exclusiva do CFO da holding (Rodrigo).
* No fim do mês, você fecha o lote contábil com **1 clique**, gerando um pacote compactado **.ZIP** com todos os PDFs renomeados e a planilha analítica de conciliação (`fechamento-contabil.csv`).

---

## 🚦 2. O Ciclo de Vida da Nota Fiscal (6 Fases Oficiais do Kanban)

Para que todo o time fale a mesma língua, cada nota fiscal que entra no sistema percorre a esteira oficial de 6 etapas:

| Fase no Kanban | O que significa na prática? | O que o financeiro precisa fazer? |
|---|---|---|
| 🟡 **1. Triagem & Divergências** | A nota foi lida pela IA e retida para saneamento (ex: foto com baixa resolução, cálculo tributário divergente ou dados cadastrais pendentes). | Abrir em `/conferencia/[id]`, comparar o PDF com os campos ao lado, ajustar as retenções se necessário e liberar para aprovação. |
| 🟢 **2. Aguardando Aprovação** | A nota está consistente e aguardando deliberação. **Alçadas:** Gestora (Beatriz) aprova até R$ 10.000,00; valores acima desse teto são direcionados para o CFO (Rodrigo). | Acompanhar o quadro. Se a fatura exceder R$ 10k, o card exibe aviso de alçada exclusiva do CFO. |
| 🔴 **3. Recusado** | A contratação foi reprovada pelo gestor ou rejeitada pelo financeiro por inconformidade fiscal, com registro obrigatório do motivo no banco de dados. | Verificar a justificativa gravada na trilha de auditoria para orientar o prestador de serviços caso haja necessidade de correção. |
| 🔵 **4. Agendar Pagamento** | A despesa foi aprovada pela respectiva alçada competente e liberada para programação bancária pelo analista (Carlos). | Acessar o internet banking da empresa contratante da holding e programar o Pix ou boleto bancário para o vencimento. |
| 🟣 **5. Agendado** | Despesa já programada e autorizada no banco, aguardando a data de débito na conta para a liquidação definitiva. | Evita que pagamentos futuros fiquem perdidos ou sejam cadastrados duas vezes no internet banking por engano. |
| ✅ **6. Pago & Liquidado** | Pagamento compensado no banco com upload do comprovante Pix. A despesa é arquivada e entra no lote contábil mensal. | Dar baixa no card anexando o comprovante em PDF/imagem. A fatura é automaticamente incluída no lote contábil mensal. |

---

## 🖥️ 3. A Tela de Autoatendimento e Conferência Assistida (Split View)

Quando uma nota requer a sua atenção, ou quando o fornecedor realiza o autoenvio na rota `/upload`, a interface exibe a visualização dividida em dois lados:
* **Lado Esquerdo**: O visualizador completo do PDF da Nota Fiscal original (com zoom, rolagem e visualização de alta fidelidade).
* **Lado Direito**: O formulário estruturado com todos os campos lidos pela IA: Prestador, CNPJ, Tomador (Vertical), Número da NF, Datas, Valores e Chave Pix.

### Regras de Ouro da Conferência:
* **Auditoria de Retenções**: O sistema valida automaticamente se `Bruto - Retenções = Líquido`. Havendo diferença superior a R$ 0,05, o campo de valor líquido é sinalizado com aviso de divergência.
* **Soberania do Financeiro**: A IA sugere os campos, mas você tem o controle total para editar qualquer valor, ajustar retenções de ISS/IRRF ou complementar dados bancários antes de salvar.

---

## 📦 4. Fechamento Contábil Mensal em 1 Clique (Pacote .ZIP com jszip)

No final de cada mês, não é necessário compactar anexos manualmente nem enviar links fragmentados:
1. Acesse a rota **Fechamento** (`/fechamento`) no menu superior.
2. Selecione a vertical da holding (ex: *Impact Hub Floripa*, *Instituto Salto*, etc.) e o mês de competência desejado.
3. Clique em **"Baixar Pacote Contábil (.ZIP)"**.
4. O sistema compila no próprio navegador, através da biblioteca `jszip`, um pacote compactado contendo:
   - Todos os arquivos PDFs das notas liquidadas, renomeados no formato padronizado: `NF_{numero}_{prestador}.pdf`.
   - A planilha de conciliação analítica `fechamento-contabil.csv` com todos os metadados fiscais, valores brutos, retenções detalhadas e referências bancárias.

---

## 🛠️ 5. Matriz "O Que Fazer Se Quebrar?" (Guia Rápido de Contingência)

Imprevistos acontecem no mundo real. Quando acontecer alguma situação fora do padrão, siga este roteiro prático:

### 🚨 1. A nota fiscal está ilegível, escura ou cortada
* **O que acontece**: O sistema retém o documento na fase `1. Triagem & Divergências`.
* **Ação do Financeiro**: Abra o card na tela de conferência (`/conferencia/[id]`), aplique o zoom no PDF e realize o preenchimento manual dos campos ilegíveis antes de liberar para aprovação.

### 🚨 2. Fornecedor tenta enviar a mesma nota duas vezes (Risco de Duplicidade)
* **O que acontece**: O sistema calcula o hash criptográfico **SHA-256** do arquivo e checa a chave composta `[company_id + cnpj_prestador + invoice_number]`.
* **Ação do Financeiro**: O envio é bloqueado na hora com a mensagem *"Nota fiscal já cadastrada sob o Protocolo #IHF-XXXX"*. O sistema protege a holding contra pagamentos em duplicidade.

### 🚨 3. A soma das retenções de impostos não bate com o valor líquido
* **O que acontece**: O card é sinalizado com tarja de divergência tributária.
* **Ação do Financeiro**: Se for mero arredondamento de centavos, corrija o valor no formulário. Se o prestador calculou alíquotas incorretas, recuse a despesa com justificativa formal para cancelamento e reemissão da NF.

### 🚨 4. Gestor tenta aprovar nota fiscal com valor superior a R$ 10.000,00
* **O que acontece**: O sistema valida as regras de governança da holding: gestores têm alçada até R$ 10.000,00.
* **Ação do Financeiro**: O botão de aprovação fica bloqueado para o perfil do gestor e o card exibe o selo de deliberação privativa do CFO. O CFO Rodrigo deve acessar a plataforma para aprovar a despesa.

### 🚨 5. Mudança repentina de Chave Pix ou dados bancários no corpo de e-mails
* **O que acontece**: O sistema prioriza dados impressos no corpo oficial da NFS-e.
* **Ação do Financeiro**: Por conformidade financeira, nunca efetue pagamentos em contas de pessoas físicas para contratos PJ sem aditivo contratual. Mantenha a nota em validação e confirme os dados com o gestor responsável.

### 🚨 6. Queda de conectividade ou indisponibilidade temporária da IA (HTTP 503)
* **O que acontece**: O backend executa pool fail-fast síncrono (`gemini-flash-latest` ➔ `gemini-flash-lite-latest`).
* **Ação do Financeiro**: Se a instabilidade da rede persistir, a tela do portal do fornecedor e do financeiro exibe um banner amigável com a opção *"Continuar e Preencher Manualmente"*, garantindo que nenhuma nota deixe de entrar na esteira.

---

## 📞 6. Contatos de Suporte & Central de Ajuda

| Canal / Papel | Responsável | Finalidade |
|---|---|---|
| **Operação Financeira & Triagem** | Carlos Financeiro (Analista) | Dúvidas sobre conferência de retenções, status do Kanban e baixas bancárias. |
| **Aprovação de Alçadas Operacionais** | Beatriz Inovação (Gestora) | Aprovação de despesas operacionais da vertical até R$ 10.000,00. |
| **Alçadas Executivas & Fechamento** | Rodrigo Controller (CFO) | Deliberação de despesas acima de R$ 10.000,00 e fechamento contábil mensal. |
| **Governança & Cadastro de Empresas** | Mariana Admin (Administradora) | Configuração de centros de custo, novas empresas da holding e regras de alçada. |
| **Repositório do Projeto & Engenharia** | [github.com/mbrancos/DesafioIHF](https://github.com/mbrancos/DesafioIHF) | Código-fonte, melhorias no pipeline de IA e documentação técnica oficial. |
