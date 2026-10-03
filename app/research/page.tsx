import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Blocks } from '@/components/Blocks';
import { ArrowUpRight, Download } from '@/components/icons';
import { PageShell } from '@/components/PageShell';
import { blogPosts, paper } from '@/content/research';

export const metadata: Metadata = {
  title: 'Research',
  description: `${paper.title}: ${paper.subtitle}. Paper summary and a 9-part tech blog walking through the research.`,
};

export default function ResearchPage() {
  const posts = [...blogPosts].reverse();
  return (
    <PageShell wide>
      <header className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">Research · {paper.venue}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{paper.title}</h1>
          <p className="mt-2 text-lg text-muted">{paper.subtitle}</p>
          <p className="mt-4 text-sm text-faint">{paper.authors}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={paper.arxiv} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              arXiv <ArrowUpRight size={15} />
            </a>
            <a href={paper.pdf} download className="btn btn-ghost">
              <Download size={15} /> PDF
            </a>
            <Link href="/projects/tiny-recursive-models" scroll={false} className="btn btn-ghost">
              My contributions
            </Link>
          </div>
        </div>
        <a href={paper.pdf} target="_blank" rel="noopener noreferrer" className="tile block overflow-hidden bg-white p-0">
          <Image src={paper.cover} alt="Paper title page" width={2136} height={842} sizes="(min-width: 1024px) 440px, 100vw" className="h-auto w-full" priority />
        </a>
      </header>

      <section className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {paper.stats.map((s) => (
          <div key={s.value} className="tile p-4">
            <p className="text-gradient text-2xl font-semibold tracking-tight">{s.value}</p>
            <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <div className="mt-16 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Blog posts" className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow mb-3">Tech blog · {blogPosts.length} posts</p>
          <ol className="scroll-thin -mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:px-0">
            {posts.map((post) => (
              <li key={post.n} className="shrink-0">
                <a href={`#blog-${post.n}`} className="block rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-ink pointer-coarse:py-3">
                  <span className="font-mono text-xs text-faint">{String(post.n).padStart(2, '0')}</span> <span className="lg:block lg:truncate">{post.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-8">
          {posts.map((post, i) => (
            <article key={post.n} id={`blog-${post.n}`} className="tile scroll-mt-24 p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip">Blog {post.n}</span>
                {i === 0 && <span className="chip border-accent/40 text-accent">Latest</span>}
                <span className="font-mono text-xs text-faint">{post.date}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{post.title}</h2>
              <video className="mt-5 w-full rounded-2xl border border-line bg-black" controls playsInline preload="none" poster={post.video.poster}>
                <source src={post.video.src} type="video/mp4" />
              </video>
              <div className="mt-6">
                <Blocks blocks={post.blocks} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
