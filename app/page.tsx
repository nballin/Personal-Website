import { ContactTile } from '@/components/bento/ContactTile';
import { HeroTile } from '@/components/bento/HeroTile';
import { ExperienceTile, NowTile, ResumeTile } from '@/components/bento/InfoTiles';
import { ProjectsTile } from '@/components/bento/ProjectsTile';
import { ResearchTile } from '@/components/bento/ResearchTile';
import { StackTile } from '@/components/bento/StackTile';

/**
 * The board. Desktop (lg+): a 4×4 grid. On screens tall enough (`fit` variant) it's sized to the viewport so
 * everything is visible without scrolling; on shorter screens rows size to content and the page scrolls.
 *
 *   | Hero (2×2)          | Now        | Résumé  |
 *   |                     | Research (2×1)       |
 *   | Experience | Projects (2×2)      | Stack   |
 *   |   (1×2)    |                     | Contact |
 *
 * Tablet: 2 columns. Mobile: 1 column, in DOM order.
 */
export default function Board() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 pb-8 pt-20 sm:px-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(4,auto)] fit:h-[calc(100dvh-6.5rem)] fit:grid-rows-4">
        <HeroTile index={0} />
        <ResumeTile index={1} />
        <NowTile index={2} />
        <ResearchTile index={3} />
        <ExperienceTile index={4} />
        <ProjectsTile index={5} />
        <ContactTile index={6} />
        <StackTile index={7} />
      </div>
      <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-faint">
        <span>© {new Date().getFullYear()} Nithin Balamurugan</span>
        <span>Built with Next.js & Tailwind</span>
      </footer>
    </main>
  );
}
