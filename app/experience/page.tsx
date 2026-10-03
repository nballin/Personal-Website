import type { Metadata } from 'next';
import { ExperienceDetail } from '@/components/details';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = { title: 'Experience' };

export default function ExperiencePage() {
  return (
    <PageShell>
      <ExperienceDetail />
    </PageShell>
  );
}
