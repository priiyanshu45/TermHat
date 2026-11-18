# Changelog

All notable changes to **[TermHat](https://github.com/priiyanshu45/termhat)** ([npm](https://www.npmjs.com/package/termhat)) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com), and this project follows [Semantic Versioning](https://semver.org).

## [Unreleased]

---

## [1.0.1] - 2026-11-19

### Fixed
- `th -m`: after successfully saving a new model, no longer prints a false "Unsupported AI provider" error.
- Replacing credentials in "Configure AI provider": the existing configuration is no longer deleted before the new key and model pass the connection test. A failed test now leaves your previous setup intact.
- Documentation: corrected the `NONE` risk confirmation default (Yes) and removed claims about runtime response validation that the code does not perform.

### Changed
- `th --version` now reports `1.0.1`.

---

## [1.0.0] - 2026-11-15

### Added
- First public release of **TermHat** (`th` / `termhat`) CLI assistant.
- Natural-language to terminal-command CLI, available as `th` and `termhat`.
- Google Gemini provider (default model `gemini-3.5-flash`) with structured JSON output enforced by a response schema.
- Response statuses: `READY`, `MANUAL`, `NEEDS_CLARIFICATION`, `UNSUPPORTED`, `OUT_OF_SCOPE`.
- Risk-tiered confirmation based on `data_loss_risk` (`NONE`, `POSSIBLE`, `EXPECTED`, `UNKNOWN`); `EXPECTED` and `UNKNOWN` require typing `CONFIRM`.
- `MANUAL` handling for session-changing commands (`cd`, environment activation, `export`): the full command is shown and can be copied, never executed.
- CLI options: `-r`, `--run` (skip menus, still confirms), `-c`, `--copy` (copy only, nothing runs), `-m`, `--model` (change model).
- Interactive menu with a built-in "Learn TermHat" guide and first-run provider setup.
- Environment-aware prompting: OS, detected shell and current directory are sent with each request.
- Detected shell is passed to Node's `child_process.execSync` when running commands.
- Prompt-injection hardening: requests are wrapped in `<request>` tags and closing tags are stripped.
- Refuses to run commands when no interactive terminal is available.
- 25-second timeout on AI requests.
- Faster startup via lazy-loaded modules and Node's compile cache (when supported).
- Local configuration stored with `conf`.

### Known limitations
- Gemini is the only supported provider.
- The risk level comes from the AI; there is no independent rule-based safety layer yet.
- Shell detection is heuristic and can misidentify nested shells (for example PowerShell launched from `cmd`).
- No automated test suite yet.
- No runtime schema validation library (such as Zod) for parsing AI responses.


[Unreleased]: https://github.com/priiyanshu45/termhat/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/priiyanshu45/termhat/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/priiyanshu45/termhat/releases/tag/v1.0.0
