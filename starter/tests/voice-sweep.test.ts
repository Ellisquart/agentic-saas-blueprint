import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'lib', 'tests', 'docs'];
const SCAN_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.md'];

function* walk(dir: string): Generator<string> {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = join(dir, entry);
    let stats;
    try {
      stats = statSync(full);
    } catch {
      continue;
    }

    if (stats.isDirectory()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      yield* walk(full);
      continue;
    }

    if (SCAN_EXTS.includes(extname(entry))) {
      yield full;
    }
  }
}

describe('voice sweep', () => {
  const files = SCAN_DIRS.flatMap((dir) => Array.from(walk(join(ROOT, dir))));

  for (const file of files) {
    const rel = file.replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, '');

    it(`${rel} contains no em dash`, () => {
      const content = readFileSync(file, 'utf8');
      expect(content).not.toMatch(/\u2014/);
    });
  }
});
