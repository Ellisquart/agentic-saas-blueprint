'use client';
/**
 * ThemeProvider.tsx
 *
 * Site-wide light/dark theme. Resolved theme is applied as data-theme on
 * <html>. CSS variables in app/globals.css switch on that attribute.
 *
 * Put an inline script in app/layout.tsx <head> to pre-set the attribute
 * before React hydrates - avoids flash of wrong theme.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme-preference:v1';

type ThemeContextValue = {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (p: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyDom(theme: ResolvedTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* localStorage unavailable */
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>('system');
  const [resolved, setResolved] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const pref = readStoredPreference();
    setPreferenceState(pref);
    const r: ResolvedTheme = pref === 'system' ? getSystemTheme() : pref;
    setResolved(r);
    applyDom(r);
  }, []);

  useEffect(() => {
    if (preference !== 'system') return;
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      const r: ResolvedTheme = mq.matches ? 'light' : 'dark';
      setResolved(r);
      applyDom(r);
    };
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
    return undefined;
  }, [preference]);

  const setPreference = (p: ThemePreference) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, p);
    } catch {
      /* no-op */
    }
    setPreferenceState(p);
    const r: ResolvedTheme = p === 'system' ? getSystemTheme() : p;
    setResolved(r);
    applyDom(r);
  };

  return (
    <ThemeContext.Provider value={{ preference, resolved, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Render-safe fallback so callers don't crash if used outside Provider
    return {
      preference: 'system',
      resolved: 'dark',
      setPreference: () => undefined,
    };
  }
  return ctx;
}
