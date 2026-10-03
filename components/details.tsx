import Image from 'next/image';
import Link from 'next/link';
import { experience } from '@/content/experience';
import { profile, skills } from '@/content/profile';
import { categoryLabels } from '@/content/projects';
import type { Project } from '@/content/types';
import { slugify } from '@/lib/slug';
import { Blocks } from './Blocks';
import { CompanyLogo } from './CompanyLogo';
import { ArrowUpRight, Download, Github } from './icons';

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow">{project.categories.map((c) => categoryLabels[c]).join(' · ')}</span>
        {project.status && <span className="chip border-amber-400/30 text-amber-200">{project.status}</span>}
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
      <p className="mt-2 text-lg text-muted">{project.tagline}</p>

      {project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.links.map((link, i) => {
            const ext = isExternal(link.href) || link.href.endsWith('.pdf');
            const cls = i === 0 ? 'btn btn-primary' : 'btn btn-ghost';
            const icon = /github/i.test(link.label) ? <Github size={15} /> : <ArrowUpRight size={15} />;
            return ext ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {icon}
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={cls}>
                {icon}
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      {project.cover && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <Image src={project.cover.src} alt={project.cover.alt} width={1600} height={900} sizes="(min-width: 768px) 720px, 100vw" className="h-auto max-h-[380px] w-full object-contain" />
        </div>
      )}

      <p className="mt-8 text-[1.05rem] leading-relaxed text-ink/90">{project.intro}</p>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {project.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">{s.heading}</h2>
            <Blocks blocks={s.blocks} />
          </section>
        ))}
      </div>
    </article>
  );
}

export function ExperienceDetail() {
  return (
    <div>
      <p className="eyebrow">Experience</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Where I&apos;ve worked</h1>
      <ol className="mt-10 space-y-10">
        {experience.map((r) => (
          <li key={r.company} id={slugify(r.company)} className="scroll-mt-24 rounded-2xl">
            <div className="flex items-center gap-4">
              <CompanyLogo role={r} size={48} />
              <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-xl font-semibold">
                  {r.role} <span className="text-muted">@ {r.company}</span>
                </h2>
                <span className="font-mono text-xs text-faint">
                  {r.start} – {r.end}
                </span>
              </div>
            </div>
            <ul className="prose-dark mt-4">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {r.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <a href={profile.resume} download="Nithin-Balamurugan-Resume.pdf" className="btn btn-primary">
          <Download size={15} /> Download résumé
        </a>
      </div>
    </div>
  );
}

export function StackDetail() {
  return (
    <div>
      <p className="eyebrow">Tech stack</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What I work with</h1>
      <div className="mt-8 space-y-6">
        {skills.map((g) => (
          <div key={g.group}>
            <p className="eyebrow mb-2.5">{g.group}</p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="chip px-3 py-1 text-sm text-ink/85">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
