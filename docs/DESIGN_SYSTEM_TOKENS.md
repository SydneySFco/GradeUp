# Design System Tokens

This project now uses shared tokens from `app/globals.css`.

## Spacing
- `--space-2` / `--space-3` / `--space-4`
- `--space-6` / `--space-8` / `--space-10` / `--space-12`

## Radius
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-xl`
- `--radius-2xl`

## Shadows
- `--shadow-card`
- `--shadow-card-hover`

## Utility classes
- `.radius-card`
- `.shadow-card-token`
- `.shadow-card-token-hover`
- `.section-pad`

## Usage guidance
- Prefer token utilities over one-off values for consistency.
- New cards/components should use `radius-card` + shadow token classes.
- Keep spacing aligned to token scale to avoid visual drift.
