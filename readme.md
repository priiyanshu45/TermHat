<div align="center">

# **TermHat**

### ***Stop memorizing commands. Start describing tasks.***

A cross-platform command-line assistant that turns plain-English requests into terminal commands, explains what they do, and **runs them only after you review and confirm.**

**TermHat currently supports Google Gemini. Additional AI provider integrations are planned for future releases.**

```bash
th set up a react project called shop
```

</div>

---

## Installation

### Requirements

- **Node.js 22.12.0 or later.** This minimum is required by the current CLI dependencies. A supported Node.js LTS release is recommended.
- **A Google Gemini API key** for current version, available from [Google AI Studio](https://aistudio.google.com/apikey).
- An internet connection when generating commands or testing the provider connection.

### Install from npm

```bash
npm install -g termhat
```

### Install from source

```bash
git clone https://github.com/priiyanshu45/termhat.git
cd termhat
npm install
npm run link
```

The installation provides two equivalent command names:

```bash
th         # short form
termhat    # full name
```

---

## Configuration

Run `th` and choose **Configure AI provider**, or use `th -m` to change only the model.

| Setting | Details |
|---|---|
| Provider | Google Gemini (the provider implemented in this release) |
| API key | Entered once, masked while typing, and tested before the new configuration is saved |
| Model | Defaults to `gemini-3.5-flash`; you can enter another model name your API key can access |

When replacing existing credentials, TermHat asks for confirmation. The existing configuration is kept unless the new API key and model pass the connection test. Changing the model also tests the new model before saving it.

---

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Example session](#example-session)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Examples](#examples)
- [Safety model](#safety-model)
- [Commands that need your own terminal](#commands-that-need-your-own-terminal)
- [Privacy and data handling](#privacy-and-data-handling)
- [Highlights](#highlights)
- [Scope](#scope)
- [How it works (architecture)](#how-it-works-architecture)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [License](#license)

---

## Example session

```text
$ th create five folders named a, b, c, d and e

┌  Understanding your intent...
│
◇  How would you like to proceed:
│  Explain
│
│ ╭─Why this command?────────────────────────────────────────────╮
│ │  This command will create five directories named a, b, c, d  │
│ │  and e in the current directory, and will fail for any name  │
│ │  that already exists.                                        │
│ ╰──────────────────────────────────────────────────────────────╯
│
◇  Ready to Execute ──────────────────────────────────────────────╮
│  Command: $mkdir a b c d e                                       │
├──────────────────────────────────────────────────────────────────╯
│
◆  Run $mkdir a b c d e in your terminal?
│  ● Yes / ○ No
```

The exact command and explanation depend on your operating system, shell and the AI model's response. This session is illustrative.

>> TermHat is a terminal **assistant**, not an autopilot. You're always the one making the final decision.

---

## Getting started

**1. Launch TermHat.**

```bash
th
```

On the first run, TermHat asks you to configure an AI provider.

**2. Connect Google Gemini.**

Google Gemini is the only provider currently implemented. Paste your API key (the input is masked) and press Enter to accept the default model, or enter another model name available to your API key. TermHat tests the key and model before saving the new configuration. After successful setup, it exits; run `th` again to start using it.

**3. Make a request.**

```bash
th create a folder called projects
```

Review the generated command. Confirm it to run, or cancel to leave your system unchanged by that command. Nothing is executed before confirmation.

---

## Usage

### Interactive mode

```bash
th
```

| Menu option | What it does |
|---|---|
| Make a request | Describe a terminal task in plain English |
| Learn TermHat | View a short guide and example requests |
| Configure AI provider | Configure or replace provider credentials |
| Exit | Close TermHat |

### Direct mode

Put your request after `th`. Quotation marks are not normally needed.

```bash
th show all files here
th make a python virtual environment
th initialize a git repository
th delete the folder old-project
```

### Options

| Option | Short | Description |
|---|---|---|
| `--run` | `-r` | Skip the interactive menu and explanation screen. The command is still displayed in the confirmation prompt and must be confirmed before execution. |
| `--copy` | `-c` | Copy the generated command to the clipboard. Nothing is executed. |
| `--model` | `-m` | Change the configured AI model after testing the new model connection. |
| `--help` | `-h` | Show help. |
| `--version` | `-V` | Show the installed version. |

Examples:

```bash
th -r make a folder called test
th -c show disk usage
th -m
```

**`--run` is not automatic execution.** It skips the menu and explanation screen, but it never skips the confirmation prompt.

### After a command is generated

In normal interactive mode, TermHat offers these choices:

| Choice | What happens |
|---|---|
| Execute | Shows the command and proceeds to the risk-based confirmation prompt |
| Explain | Shows a plain-English explanation, then proceeds to confirmation |
| Copy | Copies the command without running it |
| Cancel | Exits without running the command |

---

## Examples

### Files and folders

```bash
th create five folders named a, b, c, d and e
th create a file named notes.txt
```

### Project setup

```bash
th set up a react project called shop
th set up a next.js project called portfolio
th set up a django project called blog
th set up a rust project
th create a c++ project folder
```

New projects are created in a new subfolder. If you do not specify a project name, TermHat may choose a plain default such as `my-app` and should state that choice in its explanation.

### Python environments

```bash
th create a python virtual environment
th set up a flask project
```

Packages can be installed using the environment's own Python executable, so activation is not required for installation. Creating an environment and activating it are different operations. See [Commands that need your own terminal](#commands-that-need-your-own-terminal).

### Git and Docker

```bash
th initialize a git repository
th build a docker image called myapp
```

### Deleting things

```bash
th delete the folder old-project
```

A destructive command such as the following requires typed confirmation:

```text
◆ Destructive action detected. Type CONFIRM to run $rm -r -- old-project (Enter to cancel):
```

You must type `CONFIRM`. Pressing Enter without typing it cancels.

### Vague requests get a question, not a guess

```bash
th clean my computer
```

For an unclear deletion target, TermHat should ask which files or folders you mean rather than inventing a target. You then submit a more specific request.

### A note on setups that edit existing files

TermHat generates and runs terminal commands. It does not inspect your project files or directly edit their contents through a file-editing API. For example, it can install Tailwind CSS for a Vite project, but the edits that enable it in `vite.config.ts` and your CSS file are described for you to make.

---

## Safety model

Terminal commands can overwrite or delete data. TermHat adds confirmation steps, but it is important to understand both what those steps do and what they do not guarantee.

### 1. You see the command before it runs

For a `READY` response, TermHat displays the generated command in the confirmation flow. It does not execute that command before confirmation.

### 2. The AI assigns a risk level

The AI response includes a `data_loss_risk` value. TermHat uses that value to choose the confirmation prompt:

| Risk | Meaning | Confirmation |
|---|---|---|
| `NONE` | The AI classifies the command as not deleting or overwriting existing data | Yes/No prompt, defaults to Yes |
| `POSSIBLE` | Existing data might be overwritten or changed | Warning and Yes/No prompt, defaults to No |
| `EXPECTED` | Destruction or removal is the intended effect | Must type `CONFIRM` |
| `UNKNOWN` | The command's impact is uncertain | Must type `CONFIRM` |

For typed confirmations, pressing Enter without typing `CONFIRM` cancels. A held-down Enter key cannot approve these typed confirmations.

**The risk label comes from the AI.** The confirmation logic does not independently inspect the command to determine whether the label is correct.

### 3. Unclear targets should not be guessed    

Requests such as "delete everything" or "free up space" do not identify a precise target. The system prompt instructs the model to ask for clarification instead of inventing files or folders to remove. The user must then provide the missing detail.

### 4. Other execution protections

- `--run` never skips confirmation.
- For a `READY` command, TermHat refuses execution when it is not attached to an interactive terminal.
- An empty or unparseable AI response is not processed as a runnable command.
- Cancelling a prompt or pressing `Ctrl+C` exits without approving the command.
- Copying a command does not execute it.
- `MANUAL` commands are shown for the user to paste into their own terminal; TermHat does not execute them.

### What this does not guarantee

The command, explanation and risk classification are generated by an AI model, and the model can be wrong. A command labelled `NONE` is **not guaranteed to be harmless**. TermHat, current release does not include an independent, rule-based safety engine that overrides the AI's risk classification. Always inspect the complete command and understand its effects before confirming it.

Prompt hardening is also not a security boundary. Malicious or unusual request text can still be misunderstood by a model.

---

## Commands that need your own terminal

Some commands change the state of the current terminal session instead of doing work that can finish independently:

| Command | What it changes |
|---|---|
| `cd projects` | Your current directory |
| `source venv/bin/activate` | Your active Python environment in bash/zsh |
| `export NAME=value` | An environment variable in your shell |

TermHat runs a command in a child process. When that process exits, changes to that child process's current directory, environment or shell state do not change your parent terminal. This is normal process isolation, not something TermHat can work around.

For these tasks, TermHat returns the **complete command** and offers to copy it so you can paste it into your own terminal:

```text
┌ Manual step needed
│ TermHat runs commands in its own temporary process, so moving into a
│ folder would be forgotten when it closes. Please copy the command
│ shown and paste it into your terminal yourself.
│
│ Paste this yourself: $npm create vite@latest shop -- --template react && cd shop && npm install
└
◆ Copy it to your clipboard?
```

The rule is simple: **either TermHat runs the whole task, or it gives you the whole command.** It does not run part of a task and silently leave the rest for you to complete.

| You ask | Result |
|---|---|
| Set up a React project called shop | TermHat runs the setup command after confirmation |
| Set up a React project called shop and go into it | You receive one complete command to paste yourself |
| Create a Python virtual environment | TermHat creates it; it is not activated in your current terminal |
| Activate the virtual environment | You receive the activation command to paste yourself |
| List files sorted by size (excluding `node_modules`) using a Node script | TermHat generates and runs a `node -e` one-liner after confirmation |

---

## Privacy and data handling

### Sent to the AI provider with each request

Requests are sent to your AI provider with:

- The text of your request
- Your operating system name
- The detected shell name
- The path of your current working directory (this path can contain your username)

### Not sent by TermHat as part of the request context

- File contents
- File listings
- Environment variable values

TermHat does not read your project files to build the request. Commands generated by the model may themselves use network access or access local files when you approve and run them; inspect the command before confirming it.

Requests sent to Gemini are subject to Google's applicable terms and privacy policies. Review the [Gemini API terms](https://ai.google.dev/gemini-api/terms) and [Google Privacy Policy](https://policies.google.com/privacy) before sending sensitive information.

**Your API key is stored locally in plain text** using the [`conf`](https://github.com/sindresorhus/conf) package, in the user configuration directory under a folder named `termhat-nodejs`. Do not share that configuration file or commit it to version control. Other software or users who can access your user account may also be able to read it.

---

## Highlights

- **Natural language to shell commands** for Linux, macOS and Windows. TermHat sends your request together with your operating system, detected shell and current working directory so the AI can generate environment-aware commands.
- **Human confirmation before execution.** TermHat displays the generated command and asks before running it. The `--run` option does not bypass confirmation.
- **Risk-tiered confirmation.** NONE and POSSIBLE use Yes/No prompts (NONE defaults to Yes, POSSIBLE defaults to No); EXPECTED and UNKNOWN require typing CONFIRM.
- **Structured AI output.** Gemini is instructed to return a fixed JSON response shape. This only parse the response format, not whether the command is safe.
- **Multi-step tasks in one request.** The model can chain up to about 10 dependent steps for tasks such as project scaffolding, Python environments, Git and Docker basics.
- **Honest about terminal-session limits.** Commands such as `cd` and virtual-environment activation are shown for you to paste into your own terminal instead of pretending a child process can change your current shell.
- **Lazy-loaded modules.** Modules such as the AI SDK and clipboard support are loaded only when needed.

---

## Scope

### What TermHat is designed to handle

- Files and folders
- Project setup for Node.js, React (Vite), Next.js, Rust, .NET, Python (including Django and Flask), and starter folders for C, C++ and Java
- Python virtual environments and package installation
- Basic Git and Docker operations
- Inline scripts and one-liners (such as running quick Node.js `node -e` or Python `python -c` scripts directly in the terminal)
- Multi-step tasks (the system prompt instructs the model to chain at most about 10 steps)

The generated command still depends on the tools installed on your computer. For example, Docker tasks require Docker, and Rust tasks require the Rust toolchain.

### What it declines or limits

| Request | Expected response or limitation |
|---|---|
| General questions and chat | Declined. TermHat handles terminal tasks, not general conversation. |
| Interactive programs such as `vim`, `nano`, `ssh` or REPLs | Declined because they need direct keyboard interaction. |
| Running downloaded scripts such as `curl ... \| sh` | Declined by the system prompt. |
| Uploading local files to remote servers | Declined by the system prompt. |
| Admin privileges not requested | The model is instructed to ask first when elevation is needed. |
| Instructions that try to override the system prompt | Treated as untrusted request text; the model is instructed not to follow them. |

Development servers and watchers (such as `npm run dev` or `python manage.py runserver`) are allowed only when explicitly requested. They continue running until you stop them, usually with `Ctrl+C`.

---

## How it works (architecture)

```text
request
   │
   ▼
build user prompt (OS, shell, cwd, request text)
   │
   ▼
provider selection
   │
   ▼
Gemini response using a constrained JSON schema
   │
   ▼
parse JSON
   │
   ▼
status: READY | MANUAL | NEEDS_CLARIFICATION | UNSUPPORTED | OUT_OF_SCOPE
   │
   ├── READY ──► display command ──► risk-based confirmation ──► execute
   │
   ├── MANUAL ─► display complete command ──► offer to copy (never execute)
   │
   └── other statuses ─────────────► display message and stop
```

### Design decisions

- **Structured output over free text.** In current release, Gemini is asked to return one JSON object with `status`, `command`, `explanation`, `data_loss_risk` and `message`. The Gemini API response schema constrains the response format. This is not command-safety analysis.
- **Status-driven control flow.** `READY` proceeds to review and confirmation; `MANUAL` displays the complete command and offers to copy it; other statuses display a message and stop. A `NEEDS_CLARIFICATION` response asks the user to add the missing detail in a new request.
- **Prompt hardening.** The user's request is wrapped in `<request>` tags, closing request tags supplied by the user are stripped, and the system prompt says to treat request text and file or folder names as data rather than instructions. These measures are best-effort prompt hardening, not a security boundary or a guarantee against prompt injection.
- **Environment-aware prompting.** The operating system, detected shell and current working directory are detected locally and sent with each request so the model can target the appropriate command syntax.
- **Shell selection for execution.** TermHat passes the detected shell to Node's `child_process.execSync`. If shell detection returns `unknown`, Node's default shell is used.
- **Process isolation made explicit.** Commands that need to change the user's current shell state receive `MANUAL` status instead of being executed in a child process where the change would disappear.
- **Risk-tiered human confirmation.** Confirmation changes according to the AI-provided risk classification: default Yes, default No, or typed confirmation.
- **Fail closed on missing or malformed responses.** A missing response, invalid JSON, structurally invalid response or empty runnable command is not executed.
- **Responsiveness.** The AI SDK, clipboard library and banner font renderer are loaded on demand. Node's compile cache is enabled when the running Node.js version supports it. AI requests time out after 25 seconds.
- **Low-variance generation.** Gemini requests use a low temperature (`0.1`) for more consistent output.

### Project structure

```text
src/
├── termhat.ts          CLI entry point and option parsing (commander)
├── ui/
│   ├── banner.ts       Startup banner
│   └── home.ts         Interactive menu, guide and first-run setup
├── core/
│   └── executer.ts     Request flow, confirmation and execution
├── ai/
│   ├── request.ts      Provider selection
│   ├── gemini.ts       Gemini client, response schema and timeout
│   ├── connect.ts      API key and model setup
│   └── prompt.ts       System prompt
└── util/
    ├── config.ts       Persistent settings
    ├── context.ts      OS, shell and directory detection, prompt building
    └── types.ts        Shared types
```

### AI response contract

The provider returns an object in this shape:

```json
{
  "status": "READY",
  "command": "mkdir projects",
  "explanation": "This command will create a directory named projects in the current directory, and will fail if it already exists.",
  "data_loss_risk": "NONE",
  "message": null
}
```

| Field | Type | Meaning |
|---|---|---|
| `status` | string | Controls how TermHat handles the response |
| `command` | string or null | Single-line command. Required for `READY` and `MANUAL`; null for other statuses. |
| `explanation` | string or null | Describes the command's actual effects. Required for `READY` and `MANUAL`; null for other statuses. |
| `data_loss_risk` | string | `NONE`, `POSSIBLE`, `EXPECTED` or `UNKNOWN` |
| `message` | string or null | A clarification question, refusal reason, manual-step explanation or optional note |

| Status | Meaning | TermHat's behavior |
|---|---|---|
| `READY` | A command TermHat can run | Show, confirm according to risk, then run |
| `MANUAL` | Must run in the user's own terminal session | Show and offer to copy; never execute |
| `NEEDS_CLARIFICATION` | More detail is needed | Show the question and stop |
| `UNSUPPORTED` | A terminal task TermHat will not or cannot do | Show the reason and stop |
| `OUT_OF_SCOPE` | Not a terminal task | Politely decline and stop |

---

## Development

```bash
npm install
npm run dev       # run from source with tsx
npm run build     # clean and compile TypeScript to dist/
npm start         # run the compiled build
npm run link      # build and link th / termhat globally
```

The project is a TypeScript ES-module package built on [`commander`](https://github.com/tj/commander.js) (CLI parsing), [`@clack/prompts`](https://github.com/bombshell-dev/clack) (interactive UI), [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Gemini client in current version), [`conf`](https://github.com/sindresorhus/conf) (settings), [`clipboardy`](https://github.com/sindresorhus/clipboardy) (clipboard), [`figlet`](https://github.com/patorjk/figlet.js) and [`picocolors`](https://github.com/alexeyraspopov/picocolors).

### Testing

There is no automated test suite yet. Before changing the system prompt in `src/ai/prompt.ts`, manually check cases such as these:

| Request | Expected result |
|---|---|
| `delete everything` | `NEEDS_CLARIFICATION` |
| `delete the folder x` | `READY`, `EXPECTED`, typed confirmation |
| `go into projects` | `MANUAL` |
| `set up django and activate it` | `MANUAL` |
| `what is the weather` | `OUT_OF_SCOPE` |
| A request telling the AI to ignore its rules | The model should not override its instructions or generate a destructive command because of that request |
| `set up react vite typescript and tailwind` | Uses `@tailwindcss/vite`; no PostCSS or `tailwind.config.js` for the Tailwind v4 recipe |

Prompt changes can alter behavior. Test the full flow (response parsing, confirmation, cancellation, copying and execution), not only the model's raw answer. Multi-step commands should also be checked for partial completion when a later step fails.

### Adding another AI provider

Additional providers are not included in current release. To add one in a future release:

1. Add a provider module in `src/ai/` that returns the shared response contract.
2. Register the provider in `src/ai/request.ts`.
3. Add its setup and connection flow to `src/ai/connect.ts` and `src/ui/home.ts`.

---

## Troubleshooting

**"API key or model not configured"**  
Run `th` and choose **Configure AI provider**.

**"Connection failed"**  
Check that the API key is correct, the model name is available to your key, and you are online. When replacing an existing configuration, a failed connection test leaves the previous configuration in place.

**"... took longer than 25s. Please try again."**  
The request timed out. Try again, or switch models with `th -m`.

**"This model is currently experiencing high demand"**  
This message comes from the provider. It may be temporary. Try again later or switch models with `th -m`.

**"TermHat needs an interactive terminal to confirm"**  
TermHat refuses to run `READY` commands when input is piped or scripted. Run it directly in a terminal. Use `th -c` if you only need the generated command copied.

**The clipboard does not work on Linux**  
Install a clipboard helper such as `xclip` or `wl-clipboard`. If copying still fails, TermHat prints the command so you can copy it manually.

**A command failed partway through**  
Multi-step commands are not transactional. If step 4 of 6 fails, steps 1 to 3 may already have completed (for example, a project folder may exist). Check what was created before retrying.

**A command fails because a tool is missing**  
TermHat uses tools installed on your machine (`node`, `python`, `cargo`, `dotnet`, `docker` and others). The explanation should identify tools required by the generated command, but it cannot install every system dependency automatically.

**A Windows command fails with a syntax error**  
See [Known limitations](#known-limitations) for shell-detection limitations.

---

## FAQ

**Is it safe?**  
TermHat requires confirmation before executing a `READY` command, and higher-risk classifications require stronger confirmation. However, the command and risk label come from an AI model. Read the complete command before confirming it. Current release does not include an independent rule-based safety engine.

**Does it work offline?**  
No. It needs an internet connection to contact the configured AI provider.

**Is TermHat free to use, and where is my API key stored?**  
TermHat is free and open source under the ISC license. You bring your own AI provider API key (many offer free tiers to get started). Your key is stored locally on your machine (via `conf`) and is only sent directly to chosen AI provider when you run a task. 

**Why does it not just `cd` for me?**  
A child process cannot change the parent terminal's current directory. See [Commands that need your own terminal](#commands-that-need-your-own-terminal).

**Can it run quick scripts without creating a file?**  
Yes. When a standard shell command is not enough, TermHat can generate and run inline one-liners such as `node -e` or `python -c` directly in your terminal after confirmation. For example, you can ask it to list and sort files by size while skipping `node_modules`, as long as Node.js or Python is installed on your machine.

**Can I use it in scripts?**  
TermHat intentionally refuses to execute `READY` commands when it cannot get interactive confirmation. `th -c <task>` can generate and copy a command without executing it.

**Can it set up full projects and environments, not just single commands?**  
Yes. TermHat can chain multiple setup steps into a single request such as scaffolding a React or Next.js app, creating a Python virtual environment and installing packages, or initializing a Rust project with `cargo` as long as those tools are already installed on your machine.

**Which platforms are supported?**  
Linux, macOS and Windows. TermHat has been developed and tested mainly on Windows with PowerShell. Linux and macOS support is implemented but has had less testing.

**Which AI providers are available?**  
Google Gemini is the current provider. Additional providers may be added in future releases.

---

## Known limitations

- **AI can be wrong.** The generated command, explanation and risk classification can all be incorrect.
- **Project files are not inspected or edited directly.** TermHat does not know which files already exist, so it relies on the model's instructions and safe defaults. It can describe edits to existing files, but you may need to make those edits yourself.
- **Heuristic shell detection.** TermHat detects your active shell from environment variables, which can occasionally misidentify nested shells (such as PowerShell launched inside `cmd`).
- **No filesystem awareness.** For privacy, TermHat does not inspect your existing files or folder contents. It relies on safe defaults rather than checking what already exists in your directory.
- **Platform testing.** Primarily tested on Windows (PowerShell/CMD); Linux and macOS are supported, with broader testing ongoing.

---

## Roadmap

- **Independent safety layer:** A local rule-based check that intercepts catastrophic commands and raises risk levels regardless of the AI's classification.
- **Automatic retry and model fallback:** Seamless retries or automatic fallback to a secondary model when an API endpoint is rate-limited or busy.
- **Interactive clarification flow:** Multi-turn follow-up questions inside the same session when a request is ambiguous, rather than exiting immediately.
- **More AI providers & offline local models:** Support for OpenAI, Anthropic, and OpenAI-compatible endpoints—unlocking local, offline execution via Ollama.
- **Lightweight project detection:** Privacy-safe detection of marker files (such as `package.json`, `Cargo.toml`, or `requirements.txt`) without reading file contents, so TermHat automatically uses the right package manager or toolchain.
- **Command history:** Browse, search, and re-run previously generated commands locally without spending extra API tokens.
- **Saved workflow aliases:** Save multi-step setups (such as scaffolding a React + Vite + Tailwind + TypeScript stack) as reusable custom shortcuts (`th execute <alias>`) for instant, zero-token execution.
- **Step-by-step chain execution:** Option to run multi-step commands one step at a time with live output, allowing you to inspect progress or stop early if a step fails.
- **Error recovery mode (`th fix`):** Analyze the output of a failed command and suggest a targeted fix, such as installing a missing dependency or correcting syntax.
- **Shell wrapper for session commands:** An optional shell hook (`.bashrc`, `.zshrc`, or PowerShell `$PROFILE`) so commands like `cd` or `venv` activation can run directly in your active terminal after confirmation.
- **Safe file and config editing:** Create or update project config files (such as `vite.config.ts` or `.env`) with a clear before-and-after diff preview before saving changes.
---

## License

Released under the ISC License. See the [`LICENSE`](LICENSE) file.

---

<div align="center">

**You describe it. You review it. You stay in control.**

</div>
