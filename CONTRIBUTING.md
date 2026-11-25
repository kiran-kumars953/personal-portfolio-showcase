# Contributing

Thanks for taking a look. Small, focused pull requests are the easiest to review.

## Workflow

1. Open an issue first for anything bigger than a typo, so we can agree on the approach.
2. Create a branch from `main`: `feat/<short-name>`, `fix/<short-name>` or `docs/<short-name>`.
3. Keep commits small, with messages in the imperative mood (`Add rule engine tests`).
4. Run the checks listed in the README's **Tests and checks** section before pushing.
5. Open a pull request using the template. CI must be green before merge.
6. Pull requests are squash-merged into `main`.

## Code style

- Follow the existing linters (ESLint / Ruff). Fix warnings you touch.
- Add or update a test with every behaviour change.
- Never commit secrets. Configuration comes from environment variables; see `.env.example` where present.

By contributing you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
