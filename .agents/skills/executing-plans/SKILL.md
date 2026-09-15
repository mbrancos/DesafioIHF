---
name: executing-plans
description: Use when you have a written implementation plan to execute in a separate session with review checkpoints
---

# Executing Plans

## Overview

Load plan, review critically, execute all tasks, report when complete.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

**Note on Google Antigravity IDE:** In the Antigravity IDE, `executing-plans` is the recommended primary workflow. Pair-programming takes place directly in the session with full visibility, step-by-step TDD verification, and interactive feedback via `ask_question`. In runtimes where autonomous code subagents are configured, `subagent-driven-development` may also be used.

## The Process

### Step 1: Load and Review Plan
1. Ensure an isolated workspace or branch: use `superpowers:using-git-worktrees` (keeping within project workspace) or work on a designated branch.
2. Read plan file (in Antigravity IDE: `<appDataDir>\brain\<conversation-id>/implementation_plan.md` or the project plan doc).
3. Review critically - identify any questions or concerns about the plan.
4. If concerns: Raise them with your human partner before starting (use `ask_question` in Antigravity IDE).
5. If no concerns: Track items in the plan artifact (updating `- [ ]` to `- [x]`).

### Step 2: Execute Tasks

For each task:
1. Mark as in_progress in your checklist/plan artifact.
2. Follow each step exactly (plan has bite-sized steps).
3. Run verifications as specified (using `run_command` in PowerShell; use `browser_subagent` for web UI verification).
4. Mark as completed (`- [x]`) using `replace_file_content`.

### Step 3: Complete Development

After all tasks complete and verified:
- Create or update the `walkthrough.md` artifact summarizing changes, test results, and visual evidence.
- Announce: "I'm using the finishing-a-development-branch skill to complete this work."
- **REQUIRED SUB-SKILL:** Use superpowers:finishing-a-development-branch
- Follow that skill to verify tests, present options (using `ask_question`), and execute choice.

## When to Stop and Ask for Help

**STOP executing immediately when:**
- Hit a blocker (missing dependency, test fails, instruction unclear)
- Plan has critical gaps preventing starting
- You don't understand an instruction
- Verification fails repeatedly

**Ask for clarification rather than guessing.**

## When to Revisit Earlier Steps

**Return to Review (Step 1) when:**
- Partner updates the plan based on your feedback
- Fundamental approach needs rethinking

**Don't force through blockers** - stop and ask.

## Remember
- Review plan critically first
- Follow plan steps exactly
- Don't skip verifications
- Reference skills when plan says to
- Stop when blocked, don't guess
- Never start implementation on main/master branch without explicit user consent
