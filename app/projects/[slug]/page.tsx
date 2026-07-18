// app/projects/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BrowserMockup from "@/app/components/reactbits/BrowserMockup";
import { projects } from "@/app/lib/data";

// Biar Next.js generate halaman statis buat tiap project pas build,
// jadi gak perlu fetch ulang tiap kali ada yang buka halaman detail.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  // Slug gak ketemu di data → tampilin halaman 404 bawaan Next.js
  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-24 md:px-16 lg:px-24">
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Tombol balik ke daftar project */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          ← kembali ke semua project
        </Link>

        {/* Thumbnail besar — foto asli kalau ada, mockup browser kalau belum */}
        <div className="relative mt-8 aspect-video max-h-[420px] overflow-hidden rounded-xl border border-line">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Tampilan project ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          ) : (
            <div className="absolute inset-0">
              <BrowserMockup />
            </div>
          )}
          {project.featured && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-warm px-3 py-1 font-mono text-xs font-medium text-bg">
              featured
            </span>
          )}
        </div>

        {/* Judul & deskripsi lengkap */}
        <h1 className="mt-8 font-display text-3xl font-semibold text-primary md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Tags tech stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tombol live demo & source code — baru di sini beneran bisa diklik keluar */}
        <div className="mt-8 flex flex-wrap gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              ↗ live demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-5 py-2.5 font-mono text-sm text-primary transition-colors hover:border-accent hover:text-accent"
            >
              ↗ source code
            </a>
          )}
        </div>
      </div>
    </main>
  );
}