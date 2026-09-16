# 🎬 Entregável 4 — Roteiro de Gravação do Vídeo Demonstrativo
**Produto**: iHubFiscal — Modelo Dual de Contas a Pagar & Governança com IA  
**Público-Alvo**: Banca Avaliadora do Desafio Técnico & Liderança da Companhia de Impacto  
**Candidato**: Moisés Branco dos Santos  
**Duração Máxima**: Exatamente 3 minutos (Meta: 2m45s a 2m50s)  
**Formato**: Vídeo em alta definição (1080p), áudio limpo, tela compartilhada com webcam no canto inferior  

---

## ⏱️ Estrutura Macro do Tempo (Cronograma dos 3 Minutos)

| Bloco | Tema Central | Tempo Sugerido | Acumulado |
|---|---|---|---|
| **Bloco 1** | Abertura Executiva & Dores das 4 Verticais | 30 segundos | 0:00 a 0:30 |
| **Bloco 2** | Solução A: Automação Ágil com Gemini Spark & Google Workspace | 50 segundos | 0:30 a 1:20 |
| **Bloco 3** | Solução B: Plataforma Full-Stack iHubFiscal v2 (Alçadas & Kanban 6 Fases) | 60 segundos | 1:20 a 2:20 |
| **Bloco 4** | Matriz de Decisão, Fechamento Contábil & Conclusão | 30 segundos | 2:20 a 2:50 |

---

## 🎙️ Roteiro Detalhado de Gravação

### 🟦 Bloco 1: Abertura Executiva & O Problema da Holding (0:00 a 0:30)
* **Tempo**: 30 segundos
* **O que mostrar na tela**:
  - *0:00 a 0:10*: Câmera aberta no candidato ou tela inicial do portal executivo (`/portal`).
  - *0:10 a 0:30*: Mostrar o diagrama da Companhia de Impacto destacando as 4 verticais (*Impact Hub Floripa*, *Salto*, *Impacta Mais*, *Seu PêJota*).
* **Fala do Candidato (Script)**:
  > *"Olá banca avaliadora! Sou Moisés Branco e apresento o **iHubFiscal**, a solução desenhada para transformar a gestão de contas a pagar da **Companhia de Impacto**.*  
  > *Atualmente, a holding recebe notas fiscais em caixas descentralizadas, digita dados manualmente em planilhas e aprova despesas por WhatsApp. Isso gera risco de multas, notas perdidas e zero auditoria.*  
  > *Para resolver isso de forma realista, estruturei duas abordagens: a **Solução A**, uma automação ágil com custo zero no Google Workspace, e a **Solução B**, uma plataforma profissional full-stack para alta governança. Vamos ver as duas funcionando na prática."*

---

### 🟩 Bloco 2: Solução A — Gemini Spark no Google Workspace (0:30 a 1:20)
* **Tempo**: 50 segundos
* **O que mostrar na tela**:
  - *0:30 a 0:45*: Mostrar a caixa de entrada do Gmail recebendo uma nota fiscal e o Gemini Spark processando a rotina autônoma.
  - *0:45 a 1:00*: Abrir a planilha **`Contas_a_Pagar`** no Google Sheets:
    - Mostrar a nova linha preenchida nas 18 colunas (protocolo sequencial, prestador, CNPJ, retenções e valor líquido com fórmulas).
    - Mostrar a aba **`Dashboard`** com os KPIs calculados automaticamente.
  - *1:00 a 1:20*: Abrir o e-mail de notificação gerado para o gestor:
    - Clicar no botão verde **APROVAR NOTA**: mostrar a tela do Web App Apps Script confirmando a liberação em 1 clique e a planilha mudando para `APROVADO`.
    - Mostrar o botão de recusa direta apontando para o fornecedor.
* **Fala do Candidato (Script)**:
  > *"A Solução A foi criada para implantação imediata, aproveitando o ecossistema Google Workspace que a holding já possui.*  
  > *Quando o fornecedor envia a nota por e-mail, o Gemini Spark detecta o anexo, salva o PDF no Google Drive e extrai os dados estruturados diretamente para a nossa planilha de controle fiscal.*  
  > *O gestor recebe uma notificação instantânea no e-mail com resumo e um botão de 'Aprovação em 1 Clique'. Ao clicar, nosso Web App no Apps Script atualiza a planilha para APROVADO em tempo real, sem necessidade de logins complexos."*

---

### 🟧 Bloco 3: Solução B — Plataforma Full-Stack iHubFiscal v2 (1:20 a 2:20)
* **Tempo**: 60 segundos
* **O que mostrar na tela**:
  - *1:20 a 1:40*: Portal do Fornecedor (`/upload`) mostrando a tela dividida (*Split-View*): PDF original na esquerda e campos extraídos pela IA na direita com chave Pix.
  - *1:40 a 2:00*: Quadro Kanban operacional de **6 Fases** (`/kanban`):
    - Mostrar as colunas: *Triagem*, *Aguardando Aprovação*, *Recusado*, *Agendar Pagamento*, *Agendado* e *Pago & Liquidado*.
    - Demonstrar os **tooltips informativos** ao passar o mouse sobre cada coluna.
    - Demonstrar a **trava de alçada**: entrar como Gestor de Inovação e tentar aprovar fatura acima de R$ 10.000 (sistema bloqueia); alternar pelo dropdown da Navbar para o CFO e aprovar com alçada extraordinária.
  - *2:00 a 2:20*: Tela de Pagamentos (`/pagamentos`) com cópia de Pix em 1 clique e anexo de comprovante, finalizando na tela de Fechamento Contábil (`/fechamento`) gerando o arquivo `.ZIP` auditável com manifesto CSV.
* **Fala do Candidato (Script)**:
  > *"Para operações que exigem segregação rigorosa de funções e alta escala, desenvolvi a Solução B: o iHubFiscal v2, em Next.js 15 e Supabase.*  
  > *O fornecedor conta com um portal de autoatendimento com split-view PDF e conferência assistida por IA. No financeiro, o Kanban de 6 fases organiza o fluxo ponta a ponta.*  
  > *Aqui temos governança estrita de alçadas: gestores de área só aprovam faturas de até R$ 10.000. Acima disso, o sistema bloqueia e exige deliberação do CFO. No fechamento mensal, o sistema compila um pacote .ZIP com todas as notas e comprovantes pareados 1 a 1 para o BPO contábil."*

---

### 🟪 Bloco 4: Matriz de Decisão & Conclusão Executiva (2:20 a 2:50)
* **Tempo**: 30 segundos
* **O que mostrar na tela**:
  - *2:20 a 2:35*: Mostrar a tabela comparativa de decisão no portal executivo (`#comparativo`).
  - *2:35 a 2:50*: Câmera aberta no candidato para encerramento profissional.
* **Fala do Candidato (Script)**:
  > *"Essa arquitetura dual oferece flexibilidade estratégica para a Companhia de Impacto: a Solução A permite colocar a operação para rodar hoje mesmo com custo zero, enquanto a Solução B consolida uma plataforma enterprise pronta para escalar com as verticais.*  
  > *Ambos os caminhos garantem eficiência, conformidade fiscal e tranquilidade para o contas a pagar. Muito obrigado!"*

---

## 🎯 Dicas de Ouro para a Gravação

1. **Software Recomendado**: OBS Studio ou Loom gravando em 1080p a 60fps.
2. **Abas Prontas no Navegador**:
   * Aba 1: Portal Executivo (`https://ihubfiscal.vercel.app/portal`)
   * Aba 2: Planilha do Google Sheets (Solução A)
   * Aba 3: Aplicação iHubFiscal v2 logada como Gestor e CFO (`https://ihubfiscal.vercel.app/kanban`)
3. **Controle Estrito do Tempo**: Mantenha o cronômetro visível para finalizar rigorosamente abaixo dos 3 minutos.
