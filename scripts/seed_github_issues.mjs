#!/usr/bin/env node
import fs from 'node:fs/promises';

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

function sanitizeLabelPart(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9:_-]/g, '');
}

async function gh(path, method = 'GET', token, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`GitHub API ${method} ${path} failed: ${res.status} ${JSON.stringify(json)}`);
  }
  return json;
}

async function ensureLabel(owner, repo, token, name, color = '0E8A16', description = '') {
  try {
    await gh(`/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`, 'GET', token);
    return;
  } catch {
    await gh(`/repos/${owner}/${repo}/labels`, 'POST', token, { name, color, description });
  }
}

function buildIssueBody(task) {
  const areas = (task.area || []).join(', ');
  return [
    '## Objective',
    task.title,
    '',
    '## Acceptance Criteria',
    task.acceptance || '-',
    '',
    '## Notes',
    task.notes || '-',
    '',
    '## Metadata',
    `- Priority: ${task.priority || 'P1'}`,
    `- Status: ${task.status || 'Backlog'}`,
    `- Estimate: ${task.estimate ?? '-'} pts`,
    `- Area: ${areas || '-'}`,
  ].join('\n');
}

async function main() {
  const owner = arg('owner');
  const repo = arg('repo');
  const tasksPath = arg('tasks', './gradeup_tasks.json');
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  if (!owner || !repo) throw new Error('--owner and --repo are required');
  if (!token) throw new Error('Set GITHUB_TOKEN or GH_TOKEN');

  const tasks = JSON.parse(await fs.readFile(tasksPath, 'utf8'));

  // Ensure baseline labels
  const baseLabels = [
    ['status:Backlog', 'BFDADC', 'Default status'],
    ['status:In-Progress', 'FBCA04', 'Work started'],
    ['status:In-Review', '5319E7', 'Awaiting review'],
    ['status:Done', '0E8A16', 'Completed'],
    ['priority:P0', 'B60205', 'Critical priority'],
    ['priority:P1', 'D93F0B', 'High priority'],
    ['priority:P2', 'FBCA04', 'Medium priority'],
  ];

  for (const [name, color, desc] of baseLabels) {
    await ensureLabel(owner, repo, token, name, color, desc);
  }

  // Pull existing issues to avoid duplicates
  const existing = await gh(`/repos/${owner}/${repo}/issues?state=all&per_page=100`, 'GET', token);
  const existingTitles = new Set(existing.filter((i) => !i.pull_request).map((i) => i.title));

  let created = 0;
  let skipped = 0;

  for (const task of tasks) {
    if (existingTitles.has(task.title)) {
      skipped += 1;
      continue;
    }

    const labels = new Set();
    labels.add(`priority:${task.priority || 'P1'}`);
    labels.add(`status:${(task.status || 'Backlog').replace(/\s+/g, '-')}`);

    for (const area of task.area || []) {
      labels.add(`area:${sanitizeLabelPart(area)}`);
    }

    // Ensure area labels exist
    for (const l of labels) {
      if (l.startsWith('area:')) {
        await ensureLabel(owner, repo, token, l, '1D76DB', 'Task area');
      }
    }

    await gh(`/repos/${owner}/${repo}/issues`, 'POST', token, {
      title: task.title,
      body: buildIssueBody(task),
      labels: Array.from(labels),
    });

    created += 1;
    console.log(`Created issue: ${task.title}`);
  }

  console.log(`✅ Done. Created ${created}, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
