/**
 * voice-sweep.test.ts
 *
 * Fails CI if any source file contains an em-dash (-) - a common "AI tell"
 * that lowers reviewer trust. Use " - " or ": " instead.
 *
 * Also catches a few other auto-generated voice patterns you might want
 * to lint out. Comment out any you don't care about.
 *
 * Drop this in tests/marketing/voice-sweep.test.ts (or wherever your test
 * tree lives). It'll run with the rest of your vitest suite.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = join(process.cwd());
const SCAN_DIRS = ['app', 'components', 'lib'];
const SCAN_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];

function* walk(dir: string): Generator<string> {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const e of entries) {
    const full = join(dir, e);
    let s;
    try {
      s = statSync(full);
    } catch {
      continue;
    }
    if (s.isDirectory()) {
      // skip node_modules, .next, etc.
      if (e === 'node_modules' || e.startsWith('.')) continue;
      yield* walk(full);
    } else if (SCAN_EXTS.includes(extname(e))) {
      yield full;
    }
  }
}

describe('Voice sweep', () => {
  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    for (const f of walk(join(ROOT, dir))) {
      allFiles.push(f);
    }
  }

  allFiles.forEach((file) => {
    const rel = file.replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, '');

    it(`${rel} contains no em-dashes`, () => {
      const content = readFileSync(file, 'utf8');
      expect(content).not.toMatch(/-/);
    });
  });
});

// ---- Other voice patterns you can opt-in to detecting ----
//
// describe('Voice sweep - extras', () => {
//   allFiles.forEach((file) => {
//     it(`${rel} avoids "leverage" filler word`, () => {
//       const content = readFileSync(file, 'utf8');
//       expect(content).not.toMatch(/\bleverage\b/i);
//     });
//     it(`${rel} avoids "delve" filler word`, () => {
//       const content = readFileSync(file, 'utf8');
//       expect(content).not.toMatch(/\bdelve\b/i);
//     });
//   });
// });
