# Diretrizes do Projeto - Google Antigravity IDE

Este arquivo define as regras e diretrizes de projeto carregadas pelo Google Antigravity IDE para o workspace `DesafioIHF`.

---

## 1. Idioma e Comunicação
- **Respostas**: Sempre responda em português do Brasil (pt-BR).
- **Artefatos e Documentação**: Todos os artefatos (incluindo planos de implementação, walkthroughs e especificações) devem ser redigidos em português do Brasil (pt-BR).
- **Commits Git**: Sempre faça mensagens de commit em português do Brasil (pt-BR).

---

## 2. Ambiente de Execução e Ferramentas
- **Sistema Operacional**: Windows.
- **Terminal e Shell**: Todos os comandos executados via `run_command` utilizam **PowerShell**.
  - Evite comandos e operadores exclusivos do bash (como `2>/dev/null`, substituições `$()`, ou encadeamentos incompatíveis).
  - Utilize sintaxe nativa do PowerShell (`Test-Path`, `Get-ChildItem`, `2>$null`).
  - Nunca execute comandos `cd` em `run_command`. O diretório de trabalho (`Cwd`) deve sempre estar contido no workspace do projeto (`d:\Etna\Projetos\DesafioIHF`).
- **Edição de Arquivos**: Utilize `replace_file_content` para blocos únicos contíguos e `multi_replace_file_content` para múltiplos blocos não contíguos.
- **Perguntas Interativas**: Sempre que precisar de decisão do usuário ou opções de escolha, utilize a ferramenta `ask_question`.

---

## 3. Fluxo de Planejamento e Execução
- **Planning Mode**:
  - Planos de arquitetura ou tarefas complexas devem ser elaborados no artefato `implementation_plan.md` com `ArtifactMetadata` (`RequestFeedback: true`, `UserFacing: true`).
  - Aguarde a aprovação explícita do usuário antes de iniciar a implementação do código.
  - Ao concluir, crie ou atualize o artefato `walkthrough.md` documentando as mudanças e evidências de testes.
- **Execução Disciplinada**:
  - Utilize a skill `executing-plans` para execução de tarefas bite-sized.
  - Siga rigorosamente o ciclo de TDD (`test-driven-development`): Red -> Green -> Refactor.
  - Valide sempre com testes reais antes de declarar conclusão (`verification-before-completion`).
- **Automação Web**:
  - Para testes de interface, formulários e fluxos ponta a ponta no navegador, utilize a ferramenta `browser_subagent`.

---

## 4. Skills Disponíveis no Projeto
As skills locais estão instaladas em `.agents/skills/` e foram adaptadas para o Antigravity IDE:
- `using-superpowers`: Estabelece o fluxo de ativação de skills e aponta para [antigravity-tools.md](.agents/skills/using-superpowers/references/antigravity-tools.md).
- `brainstorming`: Explora requisitos e design antes do código.
- `writing-plans`: Estrutura planos detalhados com TDD compatíveis com o Planning Mode.
- `executing-plans`: Executa tarefas sequenciais com rigor, testes e checkpoints.
- `systematic-debugging`: Diagnóstico de causa-raiz antes de qualquer alteração corretiva.
- `test-driven-development`: Ciclo TDD obrigatório para novas funcionalidades e correções.
- `verification-before-completion`: Provas antes de afirmações de sucesso.
- `frontend-design`: Princípios de design visual não genérico e estéticas marcantes.
- `ui-ux-pro-max`: Inteligência de design e busca local via `python .agents/skills/ui-ux-pro-max/scripts/search.py`.
- `web-design-guidelines`: Auditoria de regras web com `read_url_content`.
- `finishing-a-development-branch`: Finalização e integração com `ask_question`.
