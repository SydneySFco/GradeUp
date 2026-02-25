# Seed GradeUp GitHub Issues

This script creates backlog issues from a JSON file and avoids duplicates by title.

## Prerequisites
- `GITHUB_TOKEN` (or `GH_TOKEN`) with `repo` scope
- Node.js 18+

## Command
```bash
cd /home/node/.openclaw/workspace/GradeUp
export GITHUB_TOKEN="<your_token>"
node scripts/seed_github_issues.mjs \
  --owner "SydneySFco" \
  --repo "GradeUp" \
  --tasks "/home/node/.openclaw/workspace/gradeup_tasks.json"
```

## What it does
- Creates standard labels (`priority:*`, `status:*`)
- Creates `area:*` labels from task metadata
- Creates missing issues only (title-based dedupe)

## Notes
- If an issue with same title exists (open/closed), it will be skipped.
