# 🎬 Entregável 4 — Roteiro Segundo a Segundo do Vídeo Demonstrativo
**Produto**: ImpactPay AI — Central de Contas a Pagar com Inteligência Artificial  
**Vaga**: Pessoa Analista Pleno de Inteligência Artificial e Produtos Digitais  
**Candidato**: Moisés Branco dos Santos  
**Organização**: Holding Companhia de Impacto  
**Duração Alvo**: **2 minutos e 45 segundos** (Teto Rigoroso do Edital: **3 minutos**)  

---

## ⏱️ Cronograma do Vídeo (Visão Panorâmica)

```
0:00 ───[ 30s ]─── 0:30 ───────[ 65s ]─────── 1:35 ─────[ 45s ]───── 2:20 ───[ 25s ]─── 2:45 (Fim)
  Apresentação &         Execução Prática              Resiliência &             Governança,
  Dores da Holding       do Trecho 1 no n8n            Casos de Exceção          LGPD & Fechamento
```

---

## 🎙️ Roteiro Detalhado de Gravação

### 🟦 Bloco 1: Abertura Executiva & O Problema da Holding (0:00 a 0:30)
* **Tempo**: 30 segundos
* **O que mostrar na tela**:
  - *0:00 a 0:10*: Câmera aberta no candidato (postura firme, profissional e receptiva) ou tela com slide executivo do ImpactPay AI.
  - *0:10 a 0:30*: Transição suave para o diagrama de arquitetura da Companhia de Impacto destacando as 4 verticais (*Impact Hubs*, *Salto*, *Impacta Mais*, *Seu PêJota*).
* **Fala do Candidato (Script)**:
  > *"Olá! Sou Moisés Branco e apresento o **ImpactPay AI**, a solução que desenhei para transformar o contas a pagar da **Companhia de Impacto**.*  
  > *Atualmente, a holding recebe notas fiscais em 3 caixas de e-mail descentralizadas, digita dados manualmente em planilhas e aprova despesas por mensagens soltas no WhatsApp. O resultado? Notas perdidas, multas por atraso e zero visibilidade da diretoria.*  
  > *Para resolver isso na raiz, construí uma automação no n8n com IA multimodal para o Trecho 1, aliada a um modelo de governança financeira ponta a ponta. Vamos ver funcionando na prática."*

---

### 🟩 Bloco 2: Execução ao Vivo do Trecho 1 no n8n (0:30 a 1:35)
* **Tempo**: 65 segundos
* **O que mostrar na tela**:
  - *0:30 a 0:45*: Tela do n8n com o workflow aberto e visualmente limpo. Mostrar o nó Webhook e disparar o envio de um dos PDFs de teste (`NF-2026001-ImpactHub-Floripa.pdf`).
  - *0:45 a 1:05*: Mostrar o fluxo executando em tempo real:
    1. O nó de **Hash SHA-256 nativo** gerando a impressão digital do arquivo.
    2. O nó da **IA Multimodal (GPT-4o-mini)** processando a imagem com a diretriz *Strict Null*.
  - *1:05 a 1:35*: Clicar no nó de saída e abrir o JSON estruturado:
    - Destacar a extração perfeita: Razão Social do Prestador, CNPJ, Data de Emissão e Vencimento.
    - Destacar a identificação automática da vertical: `"Impact Hub Florianópolis"` e centro de custo `"Tecnologia & Inovação"`.
    - Mostrar o cálculo tributário: Bruto de R$ 5.000,00, retenção de ISS (R$ 100) e IRRF (R$ 75), resultando no líquido exato de R$ 4.825,00.
* **Fala do Candidato (Script)**:
  > *"Aqui no n8n temos a implementação prática do Trecho 1, totalmente autocontida e sem dependências externas.*  
  > *Ao receber o PDF da nota fiscal, o fluxo gera imediatamente um Hash SHA-256 nativo para garantir rastreabilidade e idempotência.*  
  > *Em seguida, nosso nó de IA multimodal lê o documento usando a diretriz 'Strict Null': se um dado não estiver explícito, a IA retorna null em vez de alucinar.*  
  > *Observem a saída: a IA identificou com precisão a vertical Tomadora como Impact Hub Floripa, extraiu o vencimento, discriminou as retenções de ISS e IRRF e validou matematicamente que o valor bruto menos as deduções bate rigorosamente com o líquido de R$ 4.825,00, transicionando a nota para 'Aguardando Aprovação'."*

---

### 🟧 Bloco 3: Demonstração de Resiliência & Gestão de Riscos (1:35 a 2:20)
* **Tempo**: 45 segundos
* **O que mostrar na tela**:
  - *1:35 a 1:55*: Simular o reenvio da mesma nota fiscal (mesmo arquivo ou mesmo CNPJ+Número). Mostrar o n8n bloqueando a duplicidade e emitindo o alerta de que a nota já foi cadastrada.
  - *1:55 a 2:20*: Mostrar o segundo caso de exceção (uma nota com divergência matemática ou com campo ilegível) caindo na rota de **Status: REVISÃO_MANUAL**, com o motivo detalhado no JSON.
* **Fala do Candidato (Script)**:
  > *"Mas um sistema corporativo não pode funcionar apenas no 'caminho feliz'. Vamos testar duas contingências críticas.*  
  > *Primeiro: se o fornecedor tentar reenviar a mesma nota fiscal, o hash e a chave combinada bloqueiam a inserção na hora, impedindo pagamentos duplicados.*  
  > *Segundo: se a nota apresentar rasuras ou inconsistência de alíquota, o nó validador detecta a diferença matemática e roteia o documento imediatamente para 'Revisão Manual', alertando o time financeiro com a causa exata em vez de travar o fluxo silenciosamente."*

---

### 🟪 Bloco 4: Governança, LGPD & Conclusão Executiva (2:20 a 2:45)
* **Tempo**: 25 segundos
* **O que mostrar na tela**:
  - *2:20 a 2:35*: Mostrar rapidamente o diagrama de 2 páginas do Desenho da Solução ou a página do Portal Executivo, destacando a trava de auto-auditoria, o cartão de aprovação e o repasse para o contador em .ZIP.
  - *2:35 a 2:45*: Câmera de volta para o candidato para encerramento elegante.
* **Fala do Candidato (Script)**:
  > *"Na visão completa da holding, a solução conta com trava de auto-auditoria para impedir que gestores aprovem as próprias notas, conformidade plena com a LGPD para proteção de dados de MEIs e autônomos, e geração de lotes em .ZIP para a contabilidade externa.*  
  > *Com o ImpactPay AI, o financeiro ganha velocidade, a diretoria tem controle em tempo real e a Companhia de Impacto opera com governança de ponta. Muito obrigado!"*

---

## 🎯 Dicas de Ouro para a Gravação (Checklist do Candidato)

1. **Iluminação e Áudio**:
   - Utilize fone de ouvido com microfone próximo à boca para eliminar eco de sala.
   - Iluminação frontal (evitar luz forte atrás das costas).
2. **Software de Gravação**:
   - Utilize o **OBS Studio** ou **Loom** gravando tela cheia (1080p).
   - Configure a câmera em um círculo pequeno no canto inferior direito para manter a humanização sem tapar os nós do n8n.
3. **Controle Estrito do Cronômetro**:
   - Coloque um cronômetro no celular ao lado do monitor.
   - Se o ensaio passar de 2m55s, corte pequenos respiros para garantir que nunca ultrapasse a marca fatídica de 3m00s.
4. **Preparação Prévia dos Arquivos**:
   - Deixe o n8n aberto no navegador em aba cheia.
   - Deixe os 3 PDFs de teste já baixados na área de trabalho para arrastar com agilidade.
