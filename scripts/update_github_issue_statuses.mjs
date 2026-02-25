#!/usr/bin/env node

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
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
  } catch {
    await gh(`/repos/${owner}/${repo}/labels`, 'POST', token, { name, color, description });
  }
}

function replaceStatusLine(body, newStatus) {
  if (!body) body = '';
  const has = body.includes('- Status:');
  if (has) {
    return body.replace(/- Status:\s*.*/g, `- Status: ${newStatus}`);
  }
  return `${body}\n\n- Status: ${newStatus}`.trim();
}

function appendCommitNote(body, note) {
  if (!body) body = '';
  if (body.includes(note)) return body;
  return `${body}\n\nUpdate: ${note}`.trim();
}

const updates = {
  'Rewrite hero value proposition for startup founders': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit eda4d78',
  },
  'Add dual CTA structure (Book Call + Get Sample Roadmap)': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit eda4d78',
  },
  'Create trust strip with logos + metrics': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit eda4d78',
  },
  'Package services into MVP Sprint / Scale Pod / Rescue': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 50c0e66',
  },
  'Refactor case studies to metric-first format': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 50c0e66',
  },
  'Design and implement homepage section hierarchy v2': {
    statusLabel: 'status:In-Review',
    statusText: 'In Review',
    note: 'Implemented across commits eda4d78 + 50c0e66 + 82acf95; pending final QA',
  },
  'Improve contact form conversion (short form + SLA)': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 82acf95',
  },
  'Create 30-day execution board and sprint cadence': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 82acf95',
  },
};

async function main() {
  const owner = arg('owner');
  const repo = arg('repo');
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  if (!owner || !repo) throw new Error('--owner and --repo are required');
  if (!token) throw new Error('Set GITHUB_TOKEN or GH_TOKEN');

  await ensureLabel(owner, repo, token, 'status:Done', '0E8A16', 'Completed');
  await ensureLabel(owner, repo, token, 'status:In-Review', '5319E7', 'Awaiting review');

  const issues = await gh(`/repos/${owner}/${repo}/issues?state=open&per_page=100`, 'GET', token);

  let touched = 0;
  for (const issue of issues) {
    if (issue.pull_request) continue;
    const patch = updates[issue.title];
    if (!patch) continue;

    const currentLabels = (issue.labels || []).map((l) => (typeof l === 'string' ? l : l.name));
    const filtered = currentLabels.filter((l) => !String(l).startsWith('status:'));
    const labels = Array.from(new Set([...filtered, patch.statusLabel]));

    let body = issue.body || '';
    body = replaceStatusLine(body, patch.statusText);
    body = appendCommitNote(body, patch.note);

    await gh(`/repos/${owner}/${repo}/issues/${issue.number}`, 'PATCH', token, {
      labels,
      body,
    });

    touched += 1;
    console.log(`Updated #${issue.number}: ${issue.title} -> ${patch.statusText}`);
  }

  console.log(`✅ Updated ${touched} issue(s).`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
