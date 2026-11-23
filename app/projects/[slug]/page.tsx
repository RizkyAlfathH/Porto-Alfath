// app/projects/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/app/lib/data";
import ProjectDetailView from "@/app/components/sections/ProjectDetailView";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project tidak ditemukan" };
  }

  const title = `${project.title} | Rizky Alfath`;

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound();
  }

  const project = projects[index];

  // key = slug supaya state galeri ke-reset pas pindah antar project
  return <ProjectDetailView key={project.slug} project={project} />;
}