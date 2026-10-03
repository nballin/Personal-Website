import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft } from './icons';

/** Full-page wrapper for deep links / refreshes of routes that normally open as modals. */
export function PageShell({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <main className={`mx-auto px-4 pb-20 pt-24 sm:px-6 ${wide ? 'max-w-6xl' : 'max-w-3xl'}`}>
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink pointer-coarse:-my-3 pointer-coarse:py-3">
        <ArrowLeft size={15} /> Back to board
      </Link>
      {children}
    </main>
  );
}
