import clsx from 'clsx';
import Image from 'next/image';
import type { Role } from '@/content/types';

/** Company logo square. Falls back to a letter badge when no logo file is set in content/experience.ts. */
export function CompanyLogo({ role, size = 36, className }: { role: Role; size?: number; className?: string }) {
  const box = clsx('relative shrink-0 overflow-hidden rounded-[22%]', className);
  const style = { width: size, height: size };

  if (!role.logo) {
    return (
      <span
        aria-hidden="true"
        style={{ ...style, fontSize: size * 0.42 }}
        className={clsx(box, 'grid place-items-center border border-line bg-gradient-to-br from-accent-strong/40 to-accent-2/25 font-semibold text-ink')}
      >
        {role.company[0]}
      </span>
    );
  }

  const contain = role.logo.fit === 'contain';
  return (
    <span style={style} className={clsx(box, contain && 'bg-white')}>
      <Image
        src={role.logo.src}
        alt={`${role.company} logo`}
        fill
        sizes={`${size * 2}px`}
        className={contain ? 'object-contain p-[12%]' : 'object-cover'}
      />
    </span>
  );
}
