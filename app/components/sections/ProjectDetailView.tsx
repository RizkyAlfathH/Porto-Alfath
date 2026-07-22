// app/components/ProjectDetailView.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFlutter,
  SiDjango,
  SiMysql,
  SiBootstrap,
  SiLaravel,
  SiReact,
  SiPhp,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { DriftingOrbs, SectionWatermark } from "@/app/components/reactbits/SectionDecor";
import BrowserMockup from "@/app/components/reactbits/BrowserMockup";
import type { Project } from "@/app/lib/data";

// Mapping nama tech (harus persis sama kayak string di `tags` di lib/data.ts) ke icon brand asli
const techIconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Flutter": SiFlutter,
  "Django": SiDjango,
  "MySQL": SiMysql,
  "Bootstrap": SiBootstrap,
  "Laravel": SiLaravel,
  "React": SiReact,
  "PHP": SiPhp,
  "REST API": TbApi,
};

export default function ProjectDetailView({ project }: { project: Project }) {
  const techCount = project.tags?.length ?? 0;
  const featureCount = project.features?.length ?? 0;

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-24 md:px-16 lg:px-24">
      <DriftingOrbs />
      <SectionWatermark text="WORK" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            ← Back
          </Link>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* ── Kolom kiri: info ── */}
          <div>
            <ScrollReveal delay={0.05}>
              <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
                {project.title}
              </h1>
              <div className="mt-3 h-px w-16 bg-accent" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
            </ScrollReveal>

            {/* Stat cards */}
            <ScrollReveal delay={0.15}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <StatCard icon={<CodeIcon />} value={techCount} label="Technologies Used" />
                <StatCard icon={<LayersIcon />} value={featureCount} label="Key Features" />
              </div>
            </ScrollReveal>

            {/* Link buttons */}
            <ScrollReveal delay={0.2}>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href={project.link} icon={<ExternalIcon />} label="Live Demo" />
                <LinkButton href={project.github} icon={<GitIcon />} label="Source Code" />
              </div>
            </ScrollReveal>

            {/* Technologies used */}
            {techCount > 0 && (
              <ScrollReveal delay={0.25}>
                <div className="mt-10">
                  <h3 className="flex items-center gap-2 font-mono text-sm font-semibold text-primary">
                    <CodeIcon /> Technologies Used
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {project.tags.map((tag) => {
                      const Icon = techIconMap[tag]; // undefined kalau nama tech gak ada di mapping
                      return (
                        <span
                          key={tag}
                          className="flex items-center gap-2 rounded-full border border-line bg-elevated/60 px-3.5 py-1.5 font-mono text-xs text-primary"
                        >
                          {Icon ? <Icon className="h-3.5 w-3.5" /> : <CubeIcon />}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* ── Kolom kanan: preview + key features ── */}
          <div>
            <ScrollReveal delay={0.1}>
              <div className="relative">
                <div
                  className="absolute -inset-4 -z-10 rounded-[28px] opacity-30 blur-2xl"
                  style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-elevated shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Tampilan project ${project.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0">
                      <BrowserMockup />
                    </div>
                  )}
                </motion.div>
              </div>
            </ScrollReveal>

            {featureCount > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="mt-6 rounded-2xl border border-line bg-elevated/40 p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
                    <SparkleIcon /> Key Features
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {project.features!.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Sub components ── */

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-elevated/50 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg text-accent">
        {icon}
      </div>
      <div>
        <p className="font-display text-xl font-bold text-primary">{value}</p>
        <p className="font-mono text-[11px] text-muted">{label}</p>
      </div>
    </div>
  );
}

function LinkButton({ href, icon, label }: { href?: string; icon: React.ReactNode; label: string }) {
  if (!href) {
    return (
      <span className="flex cursor-not-allowed items-center gap-2 rounded-full border border-line/60 px-4 py-2 font-mono text-xs text-muted/50">
        {icon} No Link
      </span>
    );
  }

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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function GitIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}
function CubeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
    </svg>
  );
}