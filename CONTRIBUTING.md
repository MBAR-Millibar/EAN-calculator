# Contributing to EAN Calculator

Contributions are welcome. This project uses the MIT License — by submitting a pull request you agree your contribution will be released under the same terms.

## What to contribute

- Bug fixes and calculation corrections
- New diving-related calculators or enhancements to existing ones
- UI/UX improvements
- Documentation improvements

If you're unsure whether a feature fits, open an issue first to discuss it.

## Ground rules for calculation changes

All diving formulas live in `lib/ean-calculations.ts`. Any change to that file must include:

1. A reference to the source (e.g. PADI, DSAT, NOAA, or a published standard) in a code comment.
2. A clear explanation in the PR description of what changed and why.

Calculation errors in a diving app can have real safety consequences — these PRs will receive extra scrutiny.

## Workflow

1. Fork the repo and create a branch (`feat/…` or `fix/…`).
2. Run `pnpm dev` to verify your changes work in the browser.
3. Run `pnpm lint` and `pnpm build` — both must pass.
4. Open a PR against `main` with a clear description. Include screenshots for UI changes.

## Commit convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation only |
| `refactor:` | Code changes with no behaviour change |
| `style:` | Formatting, whitespace |
| `chore:` | Tooling, dependencies |

## Reporting bugs

Open an issue at [github.com/LeandroBerlin/ean-calc/issues](https://github.com/LeandroBerlin/ean-calc/issues). Include browser/OS, steps to reproduce, and — for calculation bugs — the inputs and the expected vs. actual result.

## Safety disclaimer

This project is provided **as is, without warranty of any kind**. Calculations must not be used as a substitute for proper dive training and certified dive tables. Contributors and maintainers accept no responsibility for incorrect results or their consequences.
