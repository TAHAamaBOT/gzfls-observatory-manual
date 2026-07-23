// @ts-check
/**
 * Docusaurus 本地插件：为每篇文档提取其 Git 贡献者信息。
 *
 * 数据来源：`git log --follow`（本地仓库），无需 GitHub API。
 * 排除规则：Claude（邮箱 noreply@anthropic.com）的提交不计入贡献者。
 *
 * 通过 `usePluginData('doc-contributors')` 在客户端获取数据。
 */

const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

// ---------------------------------------------------------------------------
// 常量
// ---------------------------------------------------------------------------

/** 项目根目录 */
const ROOT = path.resolve(__dirname, '..', '..', '..');

/** 缓存文件路径（gitignore 已包含） */
const CACHE_FILE = path.join(ROOT, '.contributors-cache.json');

/** docs 目录 */
const DOCS_DIR = path.join(ROOT, 'docs');



/**
 * 已知的邮箱 → GitHub 用户名映射。
 * 对于不规范的 git 提交邮箱（如 QQ 邮箱），通过此映射关联到 GitHub 账号。
 */
const KNOWN_EMAIL_MAP = {
  '3089124325@qq.com': 'TAHAamaBOT',
};

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

/**
 * 获取作者的 GitHub 用户名。
 * 优先级：noreply 邮箱解析 > 已知映射 > 作者名猜测 > null
 * @param {string} name - git 作者名
 * @param {string} email - git 作者邮箱
 * @returns {string|null}
 */
function resolveGitHubUsername(name, email) {
  // 1. GitHub noreply 邮箱：`{userId}+{username}@users.noreply.github.com`
  const noreply = email.match(/^\d+\+(\w[\w-]*)@users\.noreply\.github\.com$/);
  if (noreply) return noreply[1];

  // 2. 已知映射
  if (KNOWN_EMAIL_MAP[email]) return KNOWN_EMAIL_MAP[email];

  // 3. 作者名本身像 GitHub 用户名则直接用
  if (/^[\w.-]+$/.test(name) && !name.includes(' ')) return name;

  return null;
}

/**
 * 生成 GitHub 头像 URL。
 * @param {string} username
 * @returns {string}
 */
function buildAvatarUrl(username) {
  return `https://github.com/${username}.png`;
}

// ---------------------------------------------------------------------------
// Git 操作
// ---------------------------------------------------------------------------

/**
 * 获取某个文件在 HEAD 上的提交哈希（用于缓存校验）。
 * @param {string} relPath - 相对于 docs/ 的相对路径
 * @returns {string} 提交哈希，失败返回空字符串
 */
function getFileHeadHash(relPath) {
  try {
    const absPath = path.join(DOCS_DIR, relPath);
    const output = execFileSync('git', [
      'log', '-1', '--format=%H', '--', absPath,
    ], { encoding: 'utf-8', cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] });
    return output.trim();
  } catch {
    return '';
  }
}

/**
 * 获取某个文件的 Git 贡献者列表。
 * @param {string} relPath - 相对于 docs/ 的相对路径
 * @returns {Array<{name: string, email: string, username: string|null, profileUrl: string|null}>}
 */
function getContributorsForFile(relPath) {
  try {
    const absPath = path.join(DOCS_DIR, relPath);
    const output = execFileSync('git', [
      'log', '--follow', '--format=%an|%ae', '--', absPath,
    ], { encoding: 'utf-8', cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] });

    const seen = new Set();
    /** @type {Array<{name: string, email: string, username: string|null, profileUrl: string|null}>} */
    const contributors = [];

    for (const line of output.trim().split('\n')) {
      if (!line) continue;
      const [name, email] = line.split('|');
      if (!name || !email) continue;

      if (seen.has(email)) continue;
      seen.add(email);

      const username = resolveGitHubUsername(name, email);
      contributors.push({
        name,
        email,
        username,
        profileUrl: username ? `https://github.com/${username}` : null,
        avatarUrl: username ? buildAvatarUrl(username) : null,
      });
    }

    return contributors;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// 缓存管理
// ---------------------------------------------------------------------------

/** @returns {Record<string, {hash: string, contributors: Array}>} */
function readCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    }
  } catch { /* 缓存损坏则忽略 */ }
  return {};
}

/** @param {Record<string, {hash: string, contributors: Array}>} cache */
function writeCache(cache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch { /* 写入失败不阻塞构建 */ }
}

// ---------------------------------------------------------------------------
// 文件扫描（不依赖第三方包）
// ---------------------------------------------------------------------------

/**
 * 递归扫描目录，获取所有 .md / .mdx 文件（相对于 docs/ 的路径）。
 * @param {string} dir
 * @param {string} base
 * @returns {string[]}
 */
function scanDocFiles(dir = DOCS_DIR, base = DOCS_DIR) {
  /** @type {string[]} */
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDocFiles(fullPath, base));
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      results.push(path.relative(base, fullPath).replace(/\\/g, '/'));
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Docusaurus 插件
// ---------------------------------------------------------------------------

/**
 * @returns {import('@docusaurus/types').Plugin<any>}
 */
module.exports = function pluginDocContributors(_context, _options) {
  return {
    name: 'doc-contributors',

    async loadContent() {
      const cache = readCache();
      const files = scanDocFiles();
      /** @type {Record<string, Array>} */
      const result = {};
      let fresh = 0;
      let cached = 0;

      for (const relPath of files) {
        // cache key: 相对于 docs/ 的路径（如 "theory/celestial-coordinates.mdx"）
        const currentHash = getFileHeadHash(relPath);

        if (currentHash && cache[relPath]?.hash === currentHash) {
          result[relPath] = cache[relPath].contributors;
          cached++;
        } else {
          const contributors = getContributorsForFile(relPath);
          result[relPath] = contributors;
          if (currentHash) {
            cache[relPath] = { hash: currentHash, contributors };
          }
          fresh++;
        }
      }

      writeCache(cache);

      // 将 key 映射为包含 `docs/` 前缀的完整路径，方便 swizzled 组件查找
      // (useDoc().metadata.source 返回 @site/docs/xxx/yyy.md)
      /** @type {Record<string, Array>} */
      const prefixed = {};
      for (const [relPath, contributors] of Object.entries(result)) {
        prefixed[`docs/${relPath}`] = contributors;
      }

      console.log(
        `[doc-contributors] ${files.length} docs scanned, ` +
        `${fresh} fresh, ${cached} cached (${
          Object.values(prefixed).filter(c => c.length > 0).length
        } have contributors)`
      );

      return prefixed;
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
