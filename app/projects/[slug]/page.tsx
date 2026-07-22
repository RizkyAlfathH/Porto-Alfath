// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { projects } from "@/app/lib/data";
import ProjectDetailView from "@/app/components/sections/ProjectDetailView";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}