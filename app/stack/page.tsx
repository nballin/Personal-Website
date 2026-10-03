import type { Metadata } from 'next';
import { StackDetail } from '@/components/details';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = { title: 'Tech stack' };

export default function StackPage() {
  return (
    <PageShell>
      <StackDetail />
    </PageShell>
  );
}
