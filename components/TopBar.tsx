'use client';

import Link from 'next/link';
import { profile } from '@/content/profile';
import { Download, Linkedin, Search } from './icons';
import { openPalette, useModKey } from './PaletteHint';

export function TopBar() {
  const mod = useModKey();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-xl pointer-coarse:size-10 bg-gradient-to-br from-accent-strong to-accent-2 font-mono text-xs font-bold text-[#0b0b12] shadow-[0_6px_20px_-6px_rgba(139,92,246,0.9)]">
            NB
          </span>
          <span className="hidden text-sm font-medium text-ink/90 sm:inline">{profile.name}</span>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-line bg-black/40 p-1 backdrop-blur-xl">
          <Link href="/experience" scroll={false} className="hidden rounded-full px-3 py-1.5 text-xs pointer-coarse:px-3.5 pointer-coarse:py-3 text-muted transition hover:bg-white/5 hover:text-ink sm:block">
            Experience
          </Link>
          <Link href="/stack" scroll={false} className="hidden rounded-full px-3 py-1.5 text-xs pointer-coarse:px-3.5 pointer-coarse:py-3 text-muted transition hover:bg-white/5 hover:text-ink md:block">
            Stack
          </Link>
          <Link href="/research" className="rounded-full px-3 py-1.5 text-xs pointer-coarse:px-3.5 pointer-coarse:py-3 text-muted transition hover:bg-white/5 hover:text-ink">
            Research
          </Link>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-3 py-1.5 text-xs pointer-coarse:px-3.5 pointer-coarse:py-3 font-medium text-white shadow-[0_6px_20px_-8px_rgba(10,102,194,1)] transition hover:bg-[#0b74dc]"
          >
            <Linkedin size={13} /> LinkedIn
          </a>
          <a href={profile.resume} download="Nithin-Balamurugan-Resume.pdf" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs pointer-coarse:px-3.5 pointer-coarse:py-3 text-muted transition hover:bg-white/5 hover:text-ink">
            <Download size={13} /> <span className="hidden min-[420px]:inline">Résumé</span>
            <span className="sr-only min-[420px]:hidden">Résumé</span>
          </a>
          <button type="button" onClick={openPalette} className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs pointer-coarse:px-3.5 pointer-coarse:py-3 text-ink transition hover:bg-white/10">
            <Search size={13} />
            <span className="sr-only">Search</span>
            <span className="hidden font-mono text-[0.7rem] text-muted sm:inline">{mod} K</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
