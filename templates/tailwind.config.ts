/**
 * tailwind.config.ts
 *
 * Maps Tailwind utility classes to the CSS variables defined in
 * app/globals.css. The variables flip on data-theme; the classes
 * stay constant in your JSX.
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-public': 'var(--bg-public)',
        'bg-app': 'var(--bg-app)',
        'surface-public': 'var(--surface-public)',
        'surface-app': 'var(--surface-app)',
        'border-public': 'var(--border-public)',
        'border-app': 'var(--border-app)',
        'text-public': 'var(--text-public-primary)',
        'text-public-2': 'var(--text-public-secondary)',
        'text-app': 'var(--text-app-primary)',
        'text-app-2': 'var(--text-app-secondary)',
        gold: 'var(--gold)',
        'success-public': 'var(--success-public)',
        'success-app': 'var(--success-app)',
        'danger-public': 'var(--danger-public)',
        'danger-app': 'var(--danger-app)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'SF Pro Display', 'sans-serif'],
        display: ['Inter', '-apple-system', 'SF Pro Display', 'sans-serif'],
      },
      fontSize: {
        pico: ['8px', { lineHeight: '12px' }],
        nano: ['9px', { lineHeight: '12px' }],
        micro: ['10px', { lineHeight: '14px' }],
        tiny: ['11px', { lineHeight: '16px' }],
        'display-xs': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'display-sm': ['25px', { lineHeight: '32px', letterSpacing: '-0.015em' }],
        'display-md': ['31px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        'display-lg': ['39px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        'display-xl': ['49px', { lineHeight: '54px', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        content: '56rem',
        layout: '72rem',
        wide: '80rem',
      },
      height: {
        'btn-sm': '32px',
        'btn-md': '40px',
        'btn-lg': '48px',
      },
      minHeight: {
        'btn-md': '40px',
        'btn-lg': '48px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Tabular nums for stable numeric columns
    function tabularNums({ addUtilities }: { addUtilities: (u: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.tabular-nums': {
          'font-variant-numeric': 'tabular-nums',
          'font-feature-settings': "'tnum'",
        },
      });
    },
  ],
};

export default config;
