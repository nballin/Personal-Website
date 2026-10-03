'use client';

import clsx from 'clsx';
import { useSyncExternalStore } from 'react';
import { Search } from './icons';

export const openPalette = () => window.dispatchEvent(new Event('palette:open'));

const subscribe = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export function useModKey() {
  return useSyncExternalStore(subscribe, () => (isMac() ? '⌘' : 'Ctrl'), () => '⌘');
}

export function PaletteHint({ className }: { className?: string }) {
  const mod = useModKey();
  return (
    <button type="button" onClick={openPalette} className={clsx('items-center gap-2 text-xs text-faint transition hover:text-muted', className)}>
      <Search size={13} />
      Jump anywhere
      <span className="flex gap-0.5">
        <kbd className="kbd">{mod}</kbd>
        <kbd className="kbd">K</kbd>
      </span>
    </button>
  );
}
