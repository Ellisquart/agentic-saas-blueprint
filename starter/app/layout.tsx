import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider, THEME_STORAGE_KEY } from '@/lib/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Agentic SaaS OS',
  description: 'A local-first project cockpit for building complex products with agents.',
};

const themeScript = `
try {
  var pref = localStorage.getItem('${THEME_STORAGE_KEY}') || 'dark';
  var theme = pref === 'system'
    ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : pref;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
} catch {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
