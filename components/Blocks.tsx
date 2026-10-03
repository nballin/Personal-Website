import Image from 'next/image';
import type { Block } from '@/content/types';

const linkify = (text: string) =>
  text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
        {part}
      </a>
    ) : (
      part
    ),
  );

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-dark space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i}>{linkify(block.text)}</p>;
          case 'h3':
            return (
              <h4 key={i} className="pt-2 text-base font-semibold text-ink">
                {block.text}
              </h4>
            );
          case 'list':
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case 'video':
            return (
              <video
                key={i}
                className="w-full rounded-2xl border border-line bg-black"
                controls
                muted
                loop
                playsInline
                preload="metadata"
                poster={block.poster}
              >
                <source src={block.src} type="video/mp4" />
              </video>
            );
          case 'images':
            return (
              <div key={i} className={block.images.length > 1 ? 'grid gap-3 sm:grid-cols-2' : ''}>
                {block.images.map((img) => (
                  <a key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-line bg-white/5">
                    <Image src={img.src} alt={img.alt} width={1600} height={1000} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full" />
                  </a>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
