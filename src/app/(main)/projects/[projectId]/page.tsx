
import { notFound } from 'next/navigation';

import { projects } from '@/lib/projects';
import { placeholderImages } from '@/lib/placeholder-images';
import ProjectClient from './ProjectClient';

// This function tells Next.js which IDs to build at compile time
export async function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = projects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} placeholderImages={placeholderImages} />;
}
