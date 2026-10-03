'use client';

import { useState } from 'react';
import { profile } from '@/content/profile';
import { Check, Copy, Github, Linkedin, Mail } from '../icons';
import { Tile, TileHeader } from './Tile';

export function ContactTile({ index }: { index: number }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Tile index={index} label="Contact" id="contact" className="lg:col-start-4 lg:row-start-4">
      <div className="flex h-full flex-col p-5">
        <TileHeader title="Contact" icon={<Mail size={14} />} />
        <p className="mt-2 text-xl font-semibold leading-tight">
          Let&apos;s <span className="text-gradient">talk.</span>
        </p>
        <div className="mt-auto space-y-2 pt-4">
          <button type="button" onClick={copy} className="btn btn-ghost w-full justify-between font-mono text-xs" aria-label={copied ? 'Email copied' : `Copy email ${profile.email}`}>
            <span className="truncate">{profile.email}</span>
            {copied ? <Check size={14} className="shrink-0 text-emerald-300" /> : <Copy size={14} className="shrink-0 text-muted" />}
          </button>
          <div className="grid grid-cols-3 gap-2">
            <a href={`mailto:${profile.email}`} className="btn btn-ghost justify-center" aria-label="Send email">
              <Mail size={16} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost justify-center" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost justify-center" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </Tile>
  );
}
