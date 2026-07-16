import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/app/lib/data";

type Props = {
    params: { slug: string };
};

// Generate halaman statis buat tiap project pas build time (SSG)
// jadi loadingnya cepat, ga perlu fetch data client-side
export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

// Metadata dinamis per project — biar pas di-share tiap project
// punya title/preview sendiri, bukan cuma judul portfolio umum
export function generateMetadata({ params }: Props): Metadata {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return {};

    return {
        title: `${project.title} — Case Study`,
        description: project.description,
    };
}

export default function ProjectDetailPage({ params }: Props) {
    const project = projects.find((p) => p.slug === params.slug);

    // Kalau slug ga ketemu di data, tampilin halaman 404 bawaan Next.js
    if (!project) notFound();

    return (
        <main className="mx-auto max-w-3xl px-6 py-16 md:px-16 lg:px-24">
            {/* Tombol kembali */}
            <Link
                href="/#projects"
                className="font-mono text-sm text-muted transition-colors hover:text-accent"
            >
                ← kembali ke semua project
            </Link>

            {/* Header */}
            <div className="mt-8">
                <p className="font-mono text-sm text-accent">{"// case study"}</p>
                <h1 className="mt-3 font-display text-4xl font-semibold text-primary md:text-5xl">
                    {project.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                    {project.description}
                </p>

                {/* Tags tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-accent"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Link aksi */}
                <div className="mt-6 flex flex-wrap gap-4">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-accent px-6 py-3 font-medium text-bg transition-transform hover:scale-105"
                        >
                            Lihat Live Demo ↗
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-line px-6 py-3 font-medium text-primary transition-colors hover:border-accent hover:text-accent"
                        >
                            Source Code ↗
                        </a>
                    )}
                </div>
            </div>

            {/* Gambar utama project */}
            <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-line bg-elevated">
                <Image
                    src={project.image}
                    alt={`Tampilan lengkap project ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                />
            </div>

            {/* Placeholder buat konten case study lebih lengkap.
          Ganti bagian ini dengan cerita proses kamu: masalah yang
          diselesaikan, keputusan teknis, tantangan, dan hasilnya. */}
            <div className="mt-12 space-y-6 text-base leading-relaxed text-muted">
                <h2 className="font-display text-2xl font-semibold text-primary">
                    Tentang project ini
                </h2>
                <p>
                    Ceritain di sini latar belakang kenapa kamu bikin project ini —
                    apakah tugas sekolah, PKL, atau inisiatif sendiri. Jelasin juga
                    masalah apa yang project ini coba selesaikan.
                </p>
                <h2 className="font-display text-2xl font-semibold text-primary">
                    Proses & tantangan
                </h2>
                <p>
                    Ceritain keputusan teknis yang kamu ambil, kenapa pilih stack
                    tertentu, dan tantangan yang kamu hadapi selama development —
                    ini yang paling menarik dibaca recruiter, bukan cuma daftar fitur.
                </p>
            </div>
        </main>
    );
}