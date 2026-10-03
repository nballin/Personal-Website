'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { paper } from '@/content/research';
import { slugify } from '@/lib/slug';
import { ArrowUpRight, Briefcase, Copy, Download, FileText, Flask, Github, Home, Layers, Linkedin, Mail, Search } from './icons';

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: ReactNode;
  run: (ctx: { push: (href: string) => void }) => void;
};

const openExternal = (href: string) => window.open(href, '_blank', 'noopener,noreferrer');

const download = (href: string, name: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.download = name;
  a.click();
};

const items: Item[] = [
  { id: 'home', group: 'Go to', label: 'Board', icon: <Home size={15} />, run: ({ push }) => push('/') },
  { id: 'experience', group: 'Go to', label: 'Experience', hint: `${experience.length} roles`, icon: <Briefcase size={15} />, run: ({ push }) => push('/experience') },
  { id: 'stack', group: 'Go to', label: 'Tech stack', keywords: 'skills about', icon: <Layers size={15} />, run: ({ push }) => push('/stack') },
  { id: 'research', group: 'Go to', label: 'Research tech blog', hint: '9 posts', icon: <Flask size={15} />, run: ({ push }) => push('/research') },
  {
    id: 'resume',
    group: 'Actions',
    label: 'Download résumé',
    hint: 'PDF',
    keywords: 'cv resume',
    icon: <Download size={15} />,
    run: () => download(profile.resume, 'Nithin-Balamurugan-Resume.pdf'),
  },
  {
    id: 'copy-email',
    group: 'Actions',
    label: 'Copy email address',
    hint: profile.email,
    keywords: 'contact mail',
    icon: <Copy size={15} />,
    run: () => void navigator.clipboard?.writeText(profile.email),
  },
  { id: 'email', group: 'Actions', label: 'Send an email', keywords: 'contact mail', icon: <Mail size={15} />, run: () => (window.location.href = `mailto:${profile.email}`) },
  { id: 'github', group: 'Links', label: 'GitHub', hint: 'nballin', icon: <Github size={15} />, run: () => openExternal(profile.github) },
  { id: 'linkedin', group: 'Links', label: 'LinkedIn', icon: <Linkedin size={15} />, run: () => openExternal(profile.linkedin) },
  { id: 'arxiv', group: 'Links', label: 'arXiv paper', hint: 'Tiny Recursive Models', keywords: 'research trm', icon: <FileText size={15} />, run: () => openExternal(paper.arxiv) },
  ...projects.map<Item>((p) => ({
    id: `project-${p.slug}`,
    group: 'Projects',
    label: p.title,
    hint: p.tagline,
    keywords: p.tags.join(' '),
    icon: <Layers size={15} />,
    run: ({ push }) => push(`/projects/${p.slug}`),
  })),
  ...experience.map<Item>((r) => ({
    id: `role-${slugify(r.company)}`,
    group: 'Experience',
    label: `${r.role} @ ${r.company}`,
    hint: `${r.start} – ${r.end}`,
    keywords: r.stack.join(' '),
    icon: <Briefcase size={15} />,
    run: ({ push }) => push(`/experience#${slugify(r.company)}`),
  })),
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const words = q.split(/\s+/);
    return items.filter((it) => {
      const hay = `${it.label} ${it.hint ?? ''} ${it.keywords ?? ''} ${it.group}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('palette:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('palette:open', onOpen);
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    close();
    item.run({ push: (href) => router.push(href, { scroll: false }) });
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="tile relative w-full max-w-xl bg-[#0c0c14]/95"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-faint" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search projects, roles, links…"
                className="h-14 flex-1 bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-faint"
                aria-label="Search"
                aria-controls="palette-results"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
              />
              <kbd className="kbd">esc</kbd>
            </div>
            <div ref={listRef} id="palette-results" role="listbox" className="scroll-thin max-h-[min(60vh,440px)] overflow-y-auto p-2">
              {results.length === 0 && <p className="px-3 py-8 text-center text-sm text-faint">No matches for “{query}”.</p>}
              {results.map((it, i) => {
                const header = it.group !== results[i - 1]?.group ? it.group : null;
                return (
                  <div key={it.id}>
                    {header && <p className="eyebrow px-3 pb-1.5 pt-3">{header}</p>}
                    <div
                      id={`palette-${it.id}`}
                      role="option"
                      aria-selected={i === active}
                      tabIndex={-1}
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(it)}
                      onKeyDown={(e) => e.key === 'Enter' && run(it)}
                      className={clsx('flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors', i === active ? 'bg-white/[0.08] text-ink' : 'text-muted')}
                    >
                      <span className={clsx('shrink-0', i === active ? 'text-accent' : 'text-faint')}>{it.icon}</span>
                      <span className="shrink-0">{it.label}</span>
                      {it.hint && <span className="truncate text-xs text-faint">{it.hint}</span>}
                      {i === active && <ArrowUpRight size={14} className="ml-auto shrink-0 text-faint" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
