# Google Antigravity IDE Tool Mapping & Guidelines

Skills speak in general actions ("dispatch a subagent", "create a todo", "read a file", "ask a question"). In the **Google Antigravity IDE**, these actions map directly to the IDE's native capabilities and tools.

---

## Tool Mapping Table

| General Action | Antigravity IDE Equivalent | Notes |
|----------------|----------------------------|-------|
| Read a file | `view_file` | Supports line slicing (`StartLine`, `EndLine`) and binary/media files |
| Edit a file (single block) | `replace_file_content` | Requires exact match of lines to replace |
| Edit a file (multiple blocks) | `multi_replace_file_content` | For multiple non-contiguous edits in the same file |
| Create a new file | `write_to_file` | Creates file and parent folders; requires `Overwrite: true` if overwriting |
| Run shell commands | `run_command` | **Shell: PowerShell on Windows**. Never propose `cd`. Long commands run as background tasks. |
| Manage background tasks | `manage_task` | Actions: `list`, `kill`, `status`, `send_input` on running tasks |
| Search file contents | `grep_search` | Ripgrep-powered search with regex, case sensitivity, and glob filters |
| List files and directories | `list_dir` | Lists children, directory structure, and sizes |
| Search the web | `search_web` | Web search with domain filtering |
| Read external web content | `read_url_content` | Fetches URL content converted to markdown |
| Interactive user questions | `ask_question` | Renders an interactive modal with options and write-in choices |
| Web testing & browser subagent | `browser_subagent` | Autonomous browser agent with automatic WebP recording saved to artifacts |
| Generate UI mockup / images | `generate_image` | Generates visual assets or mockups directly into artifacts |
| Set timers & cron | `schedule` | One-shot timers or recurring cron triggers |
| MCP tools | `call_mcp_tool`, `read_resource`, `list_resources` | MCP integrations (Neon, GitHub, etc.) |

---

## Planning Mode & Task Tracking

The Google Antigravity IDE features a native **Planning Mode** backed by persisted Markdown artifacts:

1. **Implementation Plan Artifact (`implementation_plan.md`)**:
   - Location: `<appDataDir>\brain\<conversation-id>/implementation_plan.md`
   - Metadata: `ArtifactMetadata: { RequestFeedback: true, Summary: "...", UserFacing: true }`
   - Use this artifact to detail architecture, file changes (`[MODIFY]`, `[NEW]`, `[DELETE]`), open questions, and verification plans.
   - Stop and wait for explicit user approval before executing code changes.

2. **Task Progress & Checklists**:
   - Antigravity IDE does **not** have a separate todo/checklist tool (`manage_task` controls background shell processes, not checklists).
   - Track progress using markdown checklists (`- [ ]` / `- [x]`) inside the plan artifact or a task artifact saved with `write_to_file` and updated with `replace_file_content`.

3. **Post-Execution Walkthrough (`walkthrough.md`)**:
   - Location: `<appDataDir>\brain\<conversation-id>/walkthrough.md`
   - Documents changes made, tests run, evidence, and embedded media (screenshots/recordings).

---

## Subagents & Execution Strategy in the IDE

- **Code Execution Subagents**: In the Antigravity IDE, autonomous general-purpose coding subagents (`invoke_subagent`) are not exposed as tools. Pair-programming takes place directly in the session.
- **Preferred Execution Pattern**: Use `executing-plans` rather than `subagent-driven-development`. Implement tasks sequentially in small, bite-sized increments using TDD (`test-driven-development`) and self-review gates.
- **Browser Subagent (`browser_subagent`)**: Available specifically for automated web interaction, DOM inspection, clicking, typing, and visual E2E verification in the browser.

---

## Instructions & Customization Discovery

- **Project Rules**: `GEMINI.md`, `AGENTS.md`, and `.agents/rules/*.md`. Antigravity walks up from the file directory to the repository root.
- **Workspace Skills**: Placed under `.agents/skills/<skill-name>/SKILL.md`.
- **Global Configuration**: Located at `~/.gemini/config/` (`skills/`, `rules/`, `plugins/`).

---

## Windows & PowerShell Environment Guidelines

- All terminal commands via `run_command` execute in **PowerShell on Windows**.
- Avoid bash-specific idioms like `2>/dev/null`, `$(...)`, `&&` (in older PowerShell versions), or piping to `grep`/`sed`/`awk`.
- Use native PowerShell commands or cross-platform Git commands:
  - Check directory existence: `Test-Path <path>`
  - Git common dir: `git rev-parse --git-common-dir`
  - Suppress error output: `2>$null` or `-ErrorAction SilentlyContinue`
- Keep working directory (`Cwd`) strictly within the project workspace (`d:\Etna\Projetos\DesafioIHF`).
