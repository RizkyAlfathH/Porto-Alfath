// app/components/sections/ProjectDetailView.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiFlutter,
  SiDart,
  SiDjango,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiBootstrap,
  SiLaravel,
  SiReact,
  SiPhp,
  SiFramer,
  SiThreedotjs,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { DriftingOrbs, SectionWatermark } from "@/app/components/reactbits/SectionDecor";
import BrowserMockup from "@/app/components/reactbits/BrowserMockup";
import type { Project, ProjectResource, ResourceType } from "@/app/lib/data";

// Nama tech harus persis sama dengan string di `tags` (lib/data.ts).
// Kalau gak ada di sini, otomatis pakai ikon kubus generik.
const techIconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "Tailwind CSS": SiTailwindcss,
  "Flutter": SiFlutter,
  "Dart": SiDart,
  "Django": SiDjango,
  "Python": SiPython,
  "MySQL": SiMysql,
  "PostgreSQL": SiPostgresql,
  "Firebase": SiFirebase,
  "Bootstrap": SiBootstrap,
  "Laravel": SiLaravel,
  "React": SiReact,
  "PHP": SiPhp,
  "Framer Motion": SiFramer,
  "Three.js": SiThreedotjs,
  "REST API": TbApi,
};

const statusMap = {
  live: { label: "Online", dot: "bg-emerald-400" },
  private: { label: "Internal, tidak publik", dot: "bg-warm" },
  development: { label: "Dalam pengembangan", dot: "bg-accent" },
} as const;

// Label kecil + ikon untuk tiap jenis resource
const resourceMeta: Record<ResourceType, { tag: string; icon: React.ReactNode }> = {
  docs: { tag: "Dokumentasi", icon: <DocIcon /> },
  design: { tag: "Desain", icon: <DesignIcon /> },
  download: { tag: "Unduhan", icon: <DownloadIcon /> },
  video: { tag: "Video", icon: <PlayIcon /> },
  github: { tag: "Repository", icon: <GitIcon /> },
  demo: { tag: "Demo", icon: <ExternalIcon /> },
  other: { tag: "Tautan", icon: <ExternalIcon /> },
};

type NavProject = Pick<Project, "slug" | "title">;

type Props = {
  project: Project;
  prev?: NavProject;
  next?: NavProject;
};

export default function ProjectDetailView({ project, prev, next }: Props) {
  const images = [project.image, ...(project.gallery ?? [])].filter(Boolean);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const current = images[active];
  const showImage = Boolean(current) && !failed[current];

  const techCount = project.tags?.length ?? 0;
  const featureCount = project.features?.length ?? 0;
  const hasLinks = Boolean(project.link || project.github);
  const status = project.status ? statusMap[project.status] : undefined;
  const resources = project.resources ?? [];
  const mobileShots = project.mobileScreenshots ?? [];

  const meta = [
    { label: "Peran", value: project.role },
    { label: "Tahun", value: project.year },
  ].filter((item) => item.value);

  return (
    <main className="relative min-h-screen overflow-clip px-6 py-24 md:px-16 lg:px-24">
      <DriftingOrbs />
      <SectionWatermark text="WORK" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          ← Kembali ke daftar project
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* ── Kolom kiri: info ── */}
          <div>
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
                  {project.title}
                </h1>
              </div>
              {status && (
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-xs text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              )}
              <div className="mt-4 h-px w-16 bg-accent" />
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
            </ScrollReveal>

            {/* Info singkat: hanya tampil kalau datanya diisi */}
            {meta.length > 0 && (
              <ScrollReveal delay={0.05}>
                <dl className="mt-8 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                  {meta.map((item) => (
                    <div key={item.label} className="bg-elevated/80 p-4">
                      <dt className="font-mono text-[11px] text-muted">{item.label}</dt>
                      <dd className="mt-1 font-display text-base font-semibold text-primary">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ScrollReveal>
            )}

            {/* Link: tombol cuma muncul kalau linknya ada */}
            <ScrollReveal delay={0.1}>
              <div className="mt-6">
                {hasLinks ? (
                  <div className="flex flex-wrap gap-3">
                    {project.link && (
                      <LinkButton href={project.link} icon={<ExternalIcon />} label="Live Demo" />
                    )}
                    {project.github && (
                      <LinkButton href={project.github} icon={<GitIcon />} label="Source Code" />
                    )}
                  </div>
                ) : (
                  <p className="max-w-xl rounded-xl border border-dashed border-line px-4 py-3 text-sm leading-relaxed text-muted">
                    {project.privateNote ?? "Demo dan source code project ini belum dipublikasikan."}
                  </p>
                )}
              </div>
            </ScrollReveal>

            {/* Teknologi */}
            {techCount > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="mt-10">
                  <SectionTitle icon={<CodeIcon />} label={`Teknologi (${techCount})`} />
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {project.tags.map((tag) => {
                      const Icon = techIconMap[tag];
                      return (
                        <li
                          key={tag}
                          className="flex items-center gap-2 rounded-full border border-line bg-elevated/60 px-3.5 py-1.5 font-mono text-xs text-primary"
                        >
                          {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : <CubeIcon />}
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* ── Kolom kanan: preview + fitur (sticky di desktop) ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ScrollReveal delay={0.1}>
              <div className="relative">
                <div
                  className="absolute -inset-4 -z-10 rounded-[28px] opacity-30 blur-2xl"
                  style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
                />
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-elevated shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
                  {showImage ? (
                    <Image
                      key={current}
                      src={current}
                      alt={`Tampilan ${project.title}, gambar ${active + 1} dari ${images.length}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="object-cover"
                      priority={active === 0}
                      onError={() => setFailed((prev) => ({ ...prev, [current]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0">
                      <BrowserMockup />
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail galeri: cuma muncul kalau ada lebih dari satu gambar */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Lihat gambar ${i + 1}`}
                      aria-pressed={i === active}
                      className={`relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                        i === active ? "border-accent" : "border-line opacity-70 hover:opacity-100"
                      }`}
                    >
                      {failed[src] ? (
                        <span className="flex h-full w-full items-center justify-center bg-elevated text-muted">
                          <CubeIcon />
                        </span>
                      ) : (
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="112px"
                          className="object-cover"
                          onError={() => setFailed((prev) => ({ ...prev, [src]: true }))}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </ScrollReveal>

            {featureCount > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="mt-6 rounded-2xl border border-line bg-elevated/40 p-6">
                  <SectionTitle icon={<SparkleIcon />} label="Fitur utama" large />
                  <ul className="mt-4 space-y-3">
                    {project.features!.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* ── Tampilan aplikasi mobile: cuma muncul kalau project punya versi mobile ── */}
        {mobileShots.length > 0 && (
          <ScrollReveal>
            <section className="mt-16" aria-labelledby="mobile-title">
              <h2
                id="mobile-title"
                className="flex items-center gap-2 font-display text-lg font-semibold text-primary"
              >
                <PhoneIcon /> Tampilan aplikasi mobile
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Aplikasi untuk pengguna akhir. Dashboard web di atas dipakai pengelola.
              </p>
              <ul className="mt-6 flex gap-5 overflow-x-auto pb-3">
                {mobileShots.map((shot) => (
                  <li key={shot.src} className="w-40 shrink-0 sm:w-44">
                    <div className="relative aspect-[9/19] overflow-hidden rounded-[22px] border border-line bg-elevated shadow-[0_16px_40px_-15px_rgba(0,0,0,0.6)]">
                      {failed[shot.src] ? (
                        <span className="absolute inset-0 flex items-center justify-center text-muted">
                          <PhoneIcon />
                        </span>
                      ) : (
                        <Image
                          src={shot.src}
                          alt={shot.caption ?? `Screenshot mobile ${project.title}`}
                          fill
                          sizes="176px"
                          className="object-cover"
                          onError={() => setFailed((prev) => ({ ...prev, [shot.src]: true }))}
                        />
                      )}
                    </div>
                    {shot.caption && (
                      <p className="mt-3 text-center font-mono text-[11px] text-muted">
                        {shot.caption}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}

        {/* ── Project Resources: cuma muncul kalau diisi di data.ts ── */}
        {resources.length > 0 && (
          <ScrollReveal>
            <section className="mt-16" aria-labelledby="resources-title">
              <h2
                id="resources-title"
                className="flex items-center gap-2 font-display text-lg font-semibold text-primary"
              >
                <FolderIcon /> Project Resources
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((res) => (
                  <li key={res.href}>
                    <ResourceCard resource={res} />
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        )}

        {/* ── Tantangan & hasil: cuma muncul kalau diisi di data.ts ── */}
        {(project.challenge || project.outcome) && (
          <ScrollReveal>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.challenge && (
                <StoryBlock title="Tantangan" text={project.challenge} />
              )}
              {project.outcome && <StoryBlock title="Hasil" text={project.outcome} />}
            </div>
          </ScrollReveal>
        )}

        {/* ── Navigasi antar project ── */}
        {(prev || next) && (
          <nav
            aria-label="Navigasi project"
            className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between"
          >
            {prev ? (
              <NavLink project={prev} label="Project sebelumnya" />
            ) : (
              <span />
            )}
            {next && <NavLink project={next} label="Project berikutnya" alignRight />}
          </nav>
        )}
      </div>
    </main>
  );
}

/* ── Sub components ── */

function SectionTitle({
  icon,
  label,
  large = false,
}: {
  icon: React.ReactNode;
  label: string;
  large?: boolean;
}) {
  return (
    <h2
      className={
        large
          ? "flex items-center gap-2 font-display text-lg font-semibold text-primary"
          : "flex items-center gap-2 font-mono text-sm font-semibold text-primary"
      }
    >
      {icon} {label}
    </h2>
  );
}

function ResourceCard({ resource }: { resource: ProjectResource }) {
  const meta = resourceMeta[resource.type];
  const external = /^https?:\/\//.test(resource.href);
  const isDownload = resource.type === "download" && !external;

  return (
    <a
      href={resource.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(isDownload ? { download: true } : {})}
      className="group flex h-full items-start gap-3 rounded-xl border border-line bg-elevated/50 p-4 transition-colors hover:border-accent"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg text-accent">
        {meta.icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] text-muted">{meta.tag}</span>
        <span className="mt-0.5 block font-display text-base font-semibold text-primary transition-colors group-hover:text-accent">
          {resource.label}
        </span>
        {resource.description && (
          <span className="mt-1 block text-sm leading-relaxed text-muted">
            {resource.description}
          </span>
        )}
      </span>
    </a>
  );
}

function StoryBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-elevated/40 p-6">
      <h2 className="font-display text-lg font-semibold text-primary">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function NavLink({
  project,
  label,
  alignRight = false,
}: {
  project: NavProject;
  label: string;
  alignRight?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block max-w-sm rounded-xl border border-line px-5 py-4 transition-colors hover:border-accent ${
        alignRight ? "sm:ml-auto sm:text-right" : ""
      }`}
    >
      <span className="font-mono text-[11px] text-muted">
        {alignRight ? `${label} →` : `← ${label}`}
      </span>
      <span className="mt-1 block font-display text-base font-semibold text-primary transition-colors group-hover:text-accent">
        {project.title}
      </span>
    </Link>
  );
}

function LinkButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-primary transition-colors hover:border-accent hover:text-accent"
    >
      {icon} {label}
    </a>
  );
}

/* ── Ikon-ikon kecil generic (bukan brand), biar gak nambah dependency baru ── */

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function GitIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}
function CubeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
}
function DesignIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}