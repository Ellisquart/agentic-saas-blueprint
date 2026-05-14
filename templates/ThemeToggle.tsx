'use client';
/**
 * ThemeToggle.tsx
 *
 * Sun (in dark mode, click to go light) <-> Moon (in light mode, click to go dark).
 * Simple 2-way switch; no "system" cycle because that conflicts with hardcoded
 * literals in codebases. Predictable behavior is more important than honoring OS.
 *
 * Drop this in your nav. It uses useTheme() from ThemeProvider.
 */

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeProvider';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, setPreference } = useTheme();
  const next = resolved === 'dark' ? 'light' : 'dark';
  const Icon = resolved === 'dark' ? Sun : Moon;
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/10 text-text-app-2 hover:text-white hover:bg-white/[0.06] transition ${className ?? ''}`}
    >
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
