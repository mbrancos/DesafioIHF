---
name: legal-advisor
description: "Draft and review compliance documentation, privacy policies (LGPD), terms of service, consent disclaimers, and data protection agreements for financial platforms."
---

# Legal Advisor (Conformidade Jurídica & LGPD)

## Visão Geral
Esta skill fornece diretrizes, templates e checklists para garantir que o **iHubFiscal** opere em estrita conformidade com a legislação brasileira, em especial a **LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018)**, o Marco Civil da Internet e as normas contábeis/fiscais vigentes.

## Quando Usar Esta Skill
- Redigir termos de consentimento e aviso de privacidade para o **Portal do Fornecedor (`/upload`)**.
- Assegurar a proteção e o tratamento lícito de dados bancários, chaves Pix e identificadores pessoais (CPF) de prestadores MEI e autônomos.
- Definir disclaimers de conformidade para aprovações de despesas e limites de alçada (`/aprovacoes`).
- Estabelecer termos de responsabilidade e confidencialidade para o compartilhamento de lotes contábeis com o BPO (`/fechamento`).
- Auditar políticas de retenção, guarda e descarte de dados fiscais (prazo decadencial tributário de 5 anos).

---

## 1. Termo de Consentimento & LGPD para o Portal do Fornecedor (`/upload`)

Como o fornecedor submete notas fiscais sem autenticação prévia, o formulário deve conter um checkbox obrigatório antes da confirmação de envio:

### Texto Padrão de Consentimento:
> "Declaro que sou o titular ou representante legal autorizado a emitir a presente cobrança e autorizo a **Companhia de Impacto** a coletar, processar e armazenar os dados fiscais e bancários (incluindo chave Pix) aqui fornecidos exclusivamente para fins de auditoria, conferência tributária e liquidação do pagamento, em estrita conformidade com a Lei nº 13.709/2018 (LGPD). Estou ciente de que os documentos fiscais serão mantidos pelo prazo legal de guarda obrigatória de 5 anos."

### Checklist de Conformidade do Formulário:
- [ ] O checkbox de aceite não deve vir pré-marcado (*opt-in ativo*).
- [ ] Link visível para a Política de Privacidade simplificada da holding.
- [ ] Registro de carimbo de data/hora (`timestamp`) e endereço IP no momento da submissão na tabela `invoice_events`.
- [ ] Bloqueio de submissão se o checkbox de aceite não estiver marcado.

---

## 2. Tratamento de Dados Pessoais Sensíveis e MEI

Notas Fiscais de prestadores autônomos e MEI frequentemente contêm dados pessoais do indivíduo:
- CPF, Nome Civil, Endereço Residencial e Telefone.
- Chave Pix pessoal (frequentemente CPF, e-mail ou telefone) e Dados Bancários.

### Regras de Governança:
1. **Princípio da Finalidade e Necessidade**: Os dados bancários e cadastrais coletados destinam-se exclusivamente à transferência dos valores e à prestação de contas fiscal. É proibido qualquer uso para marketing ou compartilhamento com terceiros não envolvidos na liquidação.
2. **Mascaramento e Segurança**: Em logs públicos ou interfaces de listagem geral, a chave Pix e o CPF devem ser exibidos com máscara parcial (ex: `***.456.789-**` ou `pix***@empresa.com`), sendo revelados na íntegra apenas para o analista financeiro com perfil autenticado.
3. **Criptografia em Repouso e em Trânsito**: Todas as transações devem trafegar exclusivamente via HTTPS/TLS e as chaves de API/credenciais devem residir em variáveis de ambiente seguras.

---

## 3. Prazos de Retenção e Descarte (Conformidade Fiscal)

- **Guarda Legal de 5 Anos**: Conforme o Código Tributário Nacional (art. 173 e 174), faturas fiscais e seus respectivos comprovantes de liquidação bancária devem ser conservados pelo prazo mínimo de 5 (cinco) anos a contar do primeiro dia do exercício seguinte àquele em que o lançamento poderia ser efetuado.
- **Direito de Eliminação do Titular (LGPD Art. 16, I)**: Caso um fornecedor solicite a exclusão de seus dados, o iHubFiscal deve informar que os registros fiscais e comprovações de pagamento são mantidos com base no cumprimento de obrigação legal/regulatória pela holding, não sendo passíveis de eliminação antes do decurso do prazo decadencial tributário.

---

## 4. Disclaimer Padrão para Documentos do Sistema

Sempre que a skill for acionada para redigir ou validar termos, inclua no rodapé:
> *"Nota de Conformidade: Este documento constitui diretriz técnica e operacional de governança e proteção de dados para a plataforma iHubFiscal. Recomenda-se a revisão periódica pelo departamento jurídico corporativo da holding."*
