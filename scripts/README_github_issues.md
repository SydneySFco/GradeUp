# Seed + Update GradeUp GitHub Issues

Scripts in this folder manage backlog and status updates on GitHub Issues.

## Prerequisites
- `GITHUB_TOKEN` (or `GH_TOKEN`) with `repo` scope
- Node.js 18+

## 1) Seed backlog issues (dedupe by title)
```bash
cd /home/node/.openclaw/workspace/GradeUp
export GITHUB_TOKEN="<your_token>"
node scripts/seed_github_issues.mjs \
  --owner "SydneySFco" \
  --repo "GradeUp" \
  --tasks "/home/node/.openclaw/workspace/gradeup_tasks.json"
```

## 2) Update issue statuses from completed commits
```bash
cd /home/node/.openclaw/workspace/GradeUp
export GITHUB_TOKEN="<your_token>"
node scripts/update_github_issue_statuses.mjs \
  --owner "SydneySFco" \
  --repo "GradeUp"
```

## What seed script does
- Creates standard labels (`priority:*`, `status:*`)
- Creates `area:*` labels from task metadata
- Creates missing issues only (title-based dedupe)

## What update script does
- Matches issues by title
- Updates status label (`status:Done` / `status:In-Review`)
- Updates body status line
- Appends commit note to body
