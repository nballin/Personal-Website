import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/details';
import { Modal } from '@/components/Modal';
import { getProject, projects } from '@/content/projects';

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export default async function ProjectModal({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <Modal label={project.title}>
      <ProjectDetail project={project} />
    </Modal>
  );
}
