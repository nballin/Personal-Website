import Image from 'next/image';
import { profile } from '@/content/profile';
import { Download, Linkedin, Mail } from '../icons';
import { Tile } from './Tile';

export function HeroTile({ index }: { index: number }) {
  return (
    <Tile index={index} label="Introduction" className="flex flex-col md:col-span-2 md:grid md:min-h-[440px] md:grid-cols-[1.45fr_1fr] lg:row-span-2 fit:min-h-0">
      {/* Photo: top banner on mobile, right column from md up. Edges fade into the tile. */}
      <div className="relative order-first h-80 md:order-last md:h-auto">
        <Image
          src={profile.portrait}
          alt={profile.name}
          fill
          priority
          sizes="(min-width: 1024px) 34vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover object-[50%_18%] [mask-image:linear-gradient(to_bottom,#000_65%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,#000_30%)]"
        />
      </div>

      <div className="relative z-10 -mt-12 flex flex-col p-6 sm:p-8 md:mt-0 lg:p-7">
        <span className="chip self-start border-emerald-400/25 bg-emerald-400/5 text-emerald-200">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Open to 2027 new-grad roles
        </span>

        <div className="mt-auto pt-6">
          <h1 className="text-[clamp(2.4rem,min(4.4vw,6.6vh),4.2rem)] font-semibold leading-[0.95] tracking-tight">
            <span className="text-gradient">Nithin</span>
            <br />
            Balamurugan
          </h1>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
            Building data pipelines and ML infrastructure on Azure + Databricks. <span className="text-ink">arXiv co-author</span> (Tiny
            Recursive Models). CS @ Western, {profile.graduation}.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a href={profile.resume} download="Nithin-Balamurugan-Resume.pdf" className="btn btn-primary">
              <Download size={15} /> Résumé
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-linkedin">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              <Mail size={15} /> Email
            </a>
          </div>
        </div>
      </div>
    </Tile>
  );
}
