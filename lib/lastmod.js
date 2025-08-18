// lib/lastmod.js
const { execSync } = require('node:child_process');
const fs = require('fs');
const path = require('path');

const APP_DIR = path.resolve(process.cwd(), 'app');
const PAGES_DIR = path.resolve(process.cwd(), 'pages');
const PAGE_FILENAMES = [
  'page.tsx', 'page.jsx', 'page.js', 'page.ts',
  'index.tsx', 'index.jsx', 'index.js', 'index.ts'
];

function gitLastModifiedISO(absFilePath) {
  try {
    if (!absFilePath || !fs.existsSync(absFilePath)) {
      return new Date().toISOString();
    }
    execSync(`git ls-files --error-unmatch "${absFilePath}"`, { stdio: 'ignore' });
    const iso = execSync(`git log -1 --pretty=format:%cI -- "${absFilePath}"`).toString().trim();
    return iso || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function resolveRouteToFile(routePath) {
  const clean = routePath.replace(/\/+$/g, '') || '/';

  // App Router
  const appCandidate = clean === '/' ? APP_DIR : path.join(APP_DIR, clean);
  for (const name of PAGE_FILENAMES) {
    const abs = path.join(appCandidate, name);
    if (fs.existsSync(abs)) return abs;
  }

  // Pages Router
  const pagesCandidate = clean === '/' ? PAGES_DIR : path.join(PAGES_DIR, clean);
  for (const name of PAGE_FILENAMES) {
    const abs = path.join(pagesCandidate, name);
    if (fs.existsSync(abs)) return abs;
  }

  return null;
}

module.exports = { gitLastModifiedISO, resolveRouteToFile };
