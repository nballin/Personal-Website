import Link from 'next/link';
import { skills } from '@/content/profile';
import { Tile, TileHeader } from './Tile';

const all = skills.flatMap((g) => g.items);
const rowA = all.filter((_, i) => i % 2 === 0);
const rowB = all.filter((_, i) => i % 2 === 1);

export function StackTile({ index }: { index: number }) {
  return (
    <Tile index={index} label="Tech stack" className="lg:col-start-4 lg:row-start-3">
      <div className="flex h-full flex-col py-5">
        <div className="px-5">
          <TileHeader
            title="Stack"
            action={
              <Link href="/stack" scroll={false} className="corner-pill">
                All →
              </Link>
            }
          />
          <p className="mt-2 text-sm text-muted">
            Core: <span className="text-ink">Azure · Databricks · Python · SQL</span>
          </p>
        </div>
        {/* Screen readers get the plain list; the marquee is decorative. */}
        <ul className="sr-only">
          {all.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="group mt-auto space-y-2 pt-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <Marquee items={rowA} />
          <Marquee items={rowB} reverse />
        </div>
      </div>
    </Tile>
  );
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div className={`flex shrink-0 gap-1.5 pr-1.5 group-hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((s, i) => (
          <span key={i} className="chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
