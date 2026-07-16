import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import SpotlightCard from "@/app/components/reactbits/SpotlightCard";
import BrowserMockup from "@/app/components/reactbits/BrowserMockup";
import { projects } from "@/app/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:px-16 lg:px-24">
      <ScrollReveal>
        <p className="font-mono text-sm text-accent">{"// 02 projects"}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
          Project yang pernah aku bikin
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="mt-4 max-w-xl text-muted">
          Beberapa project dari tugas sekolah, PKL, dan eksplorasi pribadi.
          Klik card buat lihat detail lengkapnya.
        </p>
      </ScrollReveal>

      {/* Bento grid — project featured lebih besar (col-span-4),
          project biasa lebih kecil (col-span-2), dari total 6 kolom.
          Ini bikin layout ga monoton kotak-kotak seragam. */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-6">
        {projects.map((project, i) => (
          <ScrollReveal
            key={project.slug}
            delay={0.1 * i}
            className={project.featured ? "md:col-span-4" : "md:col-span-2"}
          >
            <Link href={`/projects/${project.slug}`} className="block h-full">
              <SpotlightCard
                className={`flex h-full flex-col ${
                  project.featured ? "border-accent/30" : ""
                }`}
              >
                {/* Thumbnail — foto asli kalau ada, mockup browser animasi kalau belum */}
                <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Tampilan project ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <BrowserMockup />
                  )}
                  {project.featured && (
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-warm px-3 py-1 font-mono text-xs font-medium text-bg">
                      featured
                    </span>
                  )}
                </div>

                {/* Judul & deskripsi */}
                <h3 className="font-display text-xl font-semibold text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {/* Tags tech stack, dorong ke bawah card biar rapi sejajar */}
                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-4 font-mono text-xs">
                    {project.link && (
                      <span className="text-accent">↗ live demo</span>
                    )}
                    {project.github && (
                      <span className="text-muted">↗ source code</span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}