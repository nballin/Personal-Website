import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/details';
import { PageShell } from '@/components/PageShell';
import { getProject, projects } from '@/content/projects';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.tagline } : {};
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <PageShell>
      <ProjectDetail project={project} />
    </PageShell>
  );
}
