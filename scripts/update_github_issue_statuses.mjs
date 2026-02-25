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
    return;
  } catch {
    // fall through and try create
  }

  try {
    await gh(`/repos/${owner}/${repo}/labels`, 'POST', token, { name, color, description });
  } catch (err) {
    const msg = String(err?.message || '');
    if (msg.includes('already_exists') || msg.includes('Validation Failed')) {
      return;
    }
    throw err;
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
  'Create dedicated landing page for MVP development': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 554fa6a',
  },
  'Create dedicated landing page for React/Next.js development': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 554fa6a',
  },
  'Create dedicated landing page for DevOps/Cloud delivery': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 554fa6a',
  },
  'Implement structured data (Organization, Service, FAQ)': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 561aed0',
  },
  'Improve internal linking between homepage, services, projects': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 554fa6a',
  },
  'Add testimonial block with founder-focused quotes': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit 561aed0',
  },
  'Optimize mobile hero and CTA visibility': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit f75e568',
  },
  'Set up analytics baseline dashboard (CTR, CVR, form completion)': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Implemented in commit f75e568 (event baseline + doc)',
  },
  'Run A/B test for primary CTA copy': {
    statusLabel: 'status:In-Review',
    statusText: 'In Review',
    note: 'Variant assignment + tracking implemented in commit f75e568; awaiting live data',
  },
  'Run A/B test for hero headline variant A vs B': {
    statusLabel: 'status:In-Review',
    statusText: 'In Review',
    note: 'Headline variant assignment + event tracking implemented in commit de1a767; awaiting live data',
  },
  'Standardize design system tokens (spacing, radius, type scale)': {
    statusLabel: 'status:Done',
    statusText: 'Done',
    note: 'Token set + usage docs added in commit de1a767',
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
