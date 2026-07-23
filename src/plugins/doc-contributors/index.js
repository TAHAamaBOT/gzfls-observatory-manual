// @ts-check
/** Build-time plugin exposing Git contributors for each document. */

const path = require('path');
const fs = require('fs');
const {execFileSync} = require('child_process');

const KNOWN_EMAIL_MAP = {'3089124325@qq.com': 'TAHAamaBOT'};

function resolveGitHubUsername(name, email) {
  const noreply = email.match(/^(?:\d+\+)?([\w-]+)@users\.noreply\.github\.com$/i);
  if (noreply) return noreply[1];
  if (KNOWN_EMAIL_MAP[email]) return KNOWN_EMAIL_MAP[email];
  return /^[\w.-]+$/.test(name) ? name : null;
}

function makeContributor(name, email) {
  const username = resolveGitHubUsername(name, email);
  return {name, email, username,
    profileUrl: username ? `https://github.com/${username}` : null,
    avatarUrl: username ? `https://github.com/${username}.png` : null};
}

function scanDocFiles(docsDir, dir = docsDir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...scanDocFiles(docsDir, fullPath));
    else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      files.push(path.relative(docsDir, fullPath).replace(/\\/g, '/'));
    }
  }
  return files;
}

function collectContributors(siteDir, currentFiles) {
  let output;
  try {
    output = execFileSync('git', [
      'log', '--reverse', '--format=%an%x1f%ae', '--name-status', '-M', '--', 'docs',
    ], {cwd: siteDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']});
  } catch {
    return {};
  }
  const byPath = new Map();
  let author = null;
  const relativeDocPath = (file) => file.replace(/^docs[\\/]/, '').replace(/\\/g, '/');
  const add = (file, name, email) => {
    if (!file || !name || !email) return;
    file = relativeDocPath(file);
    const item = makeContributor(name, email);
    const key = item.username ? `user:${item.username.toLowerCase()}` : `email:${email.toLowerCase()}`;
    const list = byPath.get(file) || [];
    if (!list.some((entry) => entry.key === key)) list.push({key, item});
    byPath.set(file, list);
  };
  const move = (from, to) => {
    from = relativeDocPath(from);
    to = relativeDocPath(to);
    const oldList = byPath.get(from) || [];
    const newList = byPath.get(to) || [];
    for (const entry of oldList) if (!newList.some((candidate) => candidate.key === entry.key)) newList.push(entry);
    byPath.set(to, newList);
    byPath.delete(from);
  };
  for (const line of output.split(/\r?\n/)) {
    if (line.includes('\x1f')) {
      const [name, email] = line.split('\x1f');
      author = {name, email};
      continue;
    }
    if (!author || !line || !line.includes('\t')) continue;
    const [status, ...names] = line.split('\t');
    if (status.startsWith('R') || status.startsWith('C')) move(names[0], names[1]);
    add(names[names.length - 1], author.name, author.email);
  }
  return Object.fromEntries([...currentFiles].map((file) => [
    `docs/${file}`, (byPath.get(file) || []).map((entry) => entry.item).reverse(),
  ]));
}

/** @returns {import('@docusaurus/types').Plugin<any>} */
module.exports = function pluginDocContributors({siteDir}) {
  return {
    name: 'doc-contributors',
    async loadContent() {
      const files = scanDocFiles(path.join(siteDir, 'docs'));
      const result = collectContributors(siteDir, new Set(files));
      const count = Object.values(result).filter((items) => items.length).length;
      console.log(`[doc-contributors] ${files.length} docs scanned (${count} have contributors)`);
      return result;
    },
    async contentLoaded({content, actions}) { actions.setGlobalData(content); },
  };
};
