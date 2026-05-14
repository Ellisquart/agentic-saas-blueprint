import Image from 'next/image';

/**
 * Logo.tsx
 *
 * Theme-aware brand logo. Default variant="auto" renders a white silhouette
 * (CSS filter) in dark mode, and the original artwork in light mode. The
 * filter is stripped in light mode by a rule in globals.css that matches
 * data-variant='dark' under [data-theme='light'].
 *
 * Drop /public/logo.png with your real artwork as black-on-transparent.
 * The filter inverts it to white for dark backgrounds automatically.
 *
 * If your artwork isn't black-on-transparent (e.g. it's already navy on
 * cream), supply variant="light" explicitly so no filter is applied.
 */

type Variant = 'dark' | 'light' | 'auto';
type Size = 'sm' | 'md' | 'lg';

const sizeMap: Record<Size, { w: number; h: number }> = {
  sm: { w: 144, h: 81 },
  md: { w: 200, h: 113 },
  lg: { w: 280, h: 158 },
};

export function Logo({
  variant = 'auto',
  size = 'md',
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { w, h } = sizeMap[size];
  const effectiveVariant = variant === 'auto' ? 'dark' : variant;

  return (
    <Image
      src="/logo.png"
      alt="[YOUR BRAND NAME]"
      width={w}
      height={h}
      priority
      data-variant={effectiveVariant}
      data-theme-aware={variant === 'auto' ? 'true' : undefined}
      data-testid="nmc-logo"
      className={className}
      style={
        effectiveVariant === 'dark'
          ? { filter: 'brightness(0) invert(1)' }
          : undefined
      }
    />
  );
}
