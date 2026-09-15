---
name: invoice-organizer
description: "Organize, rename, classify, and reconcile invoices, receipts, and NFS-e for tax closing, accountant packages (.ZIP), and audit."
---

# Invoice Organizer (Organizador Fiscal & Contábil)

## Visão Geral
Esta skill transforma pastas, lotes e repositórios de notas fiscais (NFS-e), recibos e comprovantes em um sistema contábil estruturado, auditável e pronto para o fechamento mensal e fiscal da holding.

## Quando Usar Esta Skill
- Organizar e padronizar lotes de notas fiscais de teste ou de produção.
- Preparar o pacote mensal de Fechamento Contábil (`/fechamento`) em arquivo `.ZIP` para o BPO contábil.
- Parear notas fiscais com seus respectivos comprovantes de quitação bancária (PIX/TED).
- Gerar planilhas de conciliação fiscal e manifestos em formato CSV/XLSX.
- Blindar o sistema contra duplicidades fiscais através de hashes SHA-256.

---

## 1. Padrão de Nomenclatura Padronizada (Naming Convention)

Todos os arquivos fiscais processados devem ser renomeados para eliminar ambiguidades:

### Notas Fiscais (PDF / XML):
`YYYY-MM-DD_[CNPJ-Prestador]_[NF-Numero]_[Slug-Tomador-Holding].[ext]`
- **Exemplo**: `2026-09-15_12345678000199_NF-001042_impact-hub-floripa.pdf`

### Comprovantes de Liquidação Bancária (Pareamento):
`YYYY-MM-DD_[CNPJ-Prestador]_[NF-Numero]_COMPROVANTE.[ext]`
- **Exemplo**: `2026-09-18_12345678000199_NF-001042_COMPROVANTE.pdf`

---

## 2. Estrutura de Diretórios para Fechamento Contábil

Ao consolidar a competência mensal (ex: `2026-09`), organize a árvore em pastas semânticas:

```text
Fechamento-Contabil/
└── 2026-09/
    ├── manifesto-conciliacao-2026-09.csv
    ├── 01_impact-hub-floripa/
    │   ├── tecnologia-inovacao/
    │   │   ├── 2026-09-15_12345678000199_NF-001042_impact-hub-floripa.pdf
    │   │   └── 2026-09-18_12345678000199_NF-001042_COMPROVANTE.pdf
    │   └── facilities-coworking/
    ├── 02_salto-aceleradora/
    ├── 03_impacta-mais/
    └── 04_seu-pejota/
```

---

## 3. Manifesto de Conciliação Contábil (CSV)

Todo lote fechado deve conter um arquivo `manifesto-conciliacao-YYYY-MM.csv` estruturado:

```csv
Protocolo,Data_Emissao,Data_Vencimento,Data_Pagamento,Tomador_Holding,Prestador_Nome,Prestador_CNPJ,NF_Numero,Centro_Custo,Valor_Bruto_Centavos,Retencoes_Centavos,Valor_Liquido_Centavos,Chave_Pix,Hash_SHA256,Arquivo_NF,Arquivo_Comprovante
IHF-2026-0001,2026-09-15,2026-09-25,2026-09-20,Impact Hub Floripa,Cloudflare Brasil,12345678000199,1042,tecnologia_inovacao,150000,0,150000,pix@empresa.com,e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,NF-1042.pdf,COMP-1042.pdf
```

---

## 4. Regras de Integridade e Pareamento Obrigatório

1. **Trava de Exportação (Pareamento 100%)**:
   - Nenhuma nota no status `AGENDADO_PAGAMENTO` ou sem comprovante bancário pode ser empacotada no lote final de fechamento contábil.
   - Caso existam notas sem comprovante, a skill deve emitir um relatório de pendências com a lista de faturas despareadas.
2. **Cálculo de Hash SHA-256 e Idempotência**:
   - O hash criptográfico do arquivo binário deve ser calculado antes de qualquer movimentação.
   - Se o hash já existir no banco ou se a combinação `(supplier_cnpj, invoice_number)` for repetida, a nota deve ser isolada na pasta `Duplicidades/`.
3. **Conversão de Centavos Inteiros**:
   - Sempre manipule valores em inteiros (`integer` em centavos) para evitar inconsistências de arredondamento de float em relatórios contábeis.
