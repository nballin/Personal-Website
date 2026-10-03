import Link from 'next/link';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { slugify } from '@/lib/slug';
import { CompanyLogo } from '../CompanyLogo';
import { ArrowUpRight, Briefcase, Download, FileText, Linkedin } from '../icons';
import { Tile, TileHeader } from './Tile';

export function NowTile({ index }: { index: number }) {
  const current = experience.find((r) => r.current) ?? experience[0];
  return (
    <Tile index={index} label="Current role" className="lg:col-start-3 lg:row-start-1">
      <Link href={`/experience#${slugify(current.company)}`} scroll={false} className="group flex h-full flex-col p-5">
        <TileHeader
          title="Now"
          icon={
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-accent-2 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-2" />
            </span>
          }
          action={
            <span className="corner-pill corner-pill-icon" aria-hidden="true">
              <ArrowUpRight size={15} />
            </span>
          }
        />
        <div className="mt-3 flex items-center gap-3">
          <CompanyLogo role={current} size={44} />
          <div className="min-w-0">
            <p className="text-xl font-semibold leading-tight">
              {current.role} <span className="text-muted">@ {current.company}</span>
            </p>
            <p className="mt-1 font-mono text-xs text-faint">
              {current.start} – {current.end}
            </p>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Stat value="−47%" label="provisioned compute" />
          <Stat value="95→98%" label="retrieval accuracy" />
        </div>
      </Link>
    </Tile>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-white/[0.03] px-3 py-2">
      <p className="text-gradient text-lg font-semibold leading-none">{value}</p>
      <p className="mt-1 text-[0.7rem] leading-tight text-muted">{label}</p>
    </div>
  );
}

export function ResumeTile({ index }: { index: number }) {
  return (
    <Tile index={index} label="LinkedIn and résumé" className="lg:col-start-4 lg:row-start-1">
      <div className="flex h-full flex-col gap-3 p-5">
        <TileHeader title="Quick links" icon={<FileText size={14} />} />
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-1 items-center gap-3 overflow-hidden rounded-2xl bg-[#0a66c2] px-4 py-3 text-white shadow-[0_14px_40px_-14px_rgba(10,102,194,1)] transition hover:bg-[#0b74dc]"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#0a66c2]">
            <Linkedin size={20} />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold leading-tight">LinkedIn</span>
            <span className="block truncate text-xs text-white/75">{profile.linkedin.replace(/^https?:\/\//, '')}</span>
          </span>
          <ArrowUpRight size={18} className="ml-auto shrink-0" />
        </a>
        <div className="flex gap-2">
          <a href={profile.resume} download="Nithin-Balamurugan-Resume.pdf" className="btn btn-primary flex-1 justify-center">
            <Download size={15} /> Résumé
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="Open résumé in a new tab">
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </Tile>
  );
}

export function ExperienceTile({ index }: { index: number }) {
  return (
    <Tile index={index} label="Experience" className="lg:col-start-1 lg:row-span-2 lg:row-start-3">
      <div className="flex h-full flex-col p-5">
        <TileHeader
          title="Experience"
          icon={<Briefcase size={14} />}
          action={
            <Link href="/experience" scroll={false} className="corner-pill">
              Details →
            </Link>
          }
        />
        <ol className="mt-4 flex flex-1 flex-col justify-between gap-1">
          {experience.map((r) => (
            <li key={r.company}>
              <Link href={`/experience#${slugify(r.company)}`} scroll={false} className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/[0.05]">
                <CompanyLogo role={r} size={34} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-medium text-ink group-hover:text-white">{r.company}</span>
                    <span className={`shrink-0 font-mono text-[0.7rem] ${r.current ? 'text-accent-2' : 'text-faint'}`}>{r.current ? 'Now' : r.start.slice(-4)}</span>
                  </span>
                  <span className="block truncate text-xs text-muted">{r.role}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Tile>
  );
}
