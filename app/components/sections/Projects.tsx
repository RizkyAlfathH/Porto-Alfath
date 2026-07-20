"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import SpotlightCard from "@/app/components/reactbits/SpotlightCard";
import BrowserMockup from "@/app/components/reactbits/BrowserMockup";
import { projects, certificates, type Project, type Certificate } from "@/app/lib/data";

const floatingBubbles = [
  { text: "📂 Portofolio", pos: "left-[2%] top-[6%]", delay: 0.2, duration: 5.8 },
  { text: "🛠️ Work in progress", pos: "right-[2%] bottom-[8%]", delay: 0.8, duration: 6.4 },
];

// Lookup class literal — Tailwind butuh nama class utuh muncul di source,
// jadi ga bisa di-interpolate langsung kayak `md:col-span-${n}`.
const spanClasses: Record<number, string> = {
  12: "md:col-span-12",
  8: "md:col-span-8",
  7: "md:col-span-7",
  6: "md:col-span-6",
  5: "md:col-span-5",
  4: "md:col-span-4",
};

// Pola bento 12-kolom yang diulang: pembuka full-width, lalu 7+5, 5+7, 6+6.
// Tiap kelompok totalnya selalu pas 12, jadi barisnya selalu rapi tanpa sisa.
const bentoPattern = [7, 5, 5, 7, 6, 6, 8, 4, 4, 8];

const ALL_FILTER = "all";

// Filter fixed: All, Projek, Sertifikat — nentuin jenis konten, bukan tech stack.
const filterOptions: { value: string; label: string }[] = [
  { value: ALL_FILTER, label: "All" },
  { value: "project", label: "Projek" },
  { value: "certificate", label: "Sertifikat" },
];

// Jumlah item yang ditampilin sebelum tombol "Tampilkan Semua" dipencet.
const INITIAL_VISIBLE_COUNT = 4;

// Gabungan project & sertifikat jadi satu list, ditandain `kind` biar gampang dibedain pas render & filter.
type PortfolioItem =
  | { kind: "project"; data: Project }
  | { kind: "certificate"; data: Certificate };

const portfolioItems: PortfolioItem[] = [
  ...projects.map((p) => ({ kind: "project" as const, data: p })),
  ...certificates.map((c) => ({ kind: "certificate" as const, data: c })),
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [showAll, setShowAll] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeFilter === ALL_FILTER) return portfolioItems;
    return portfolioItems.filter((item) => item.kind === activeFilter);
  }, [activeFilter]);

  // Reset ke kondisi "belum expand" tiap kali filter diganti, biar ga bingung
  // pas pindah filter tapi masih dalam keadaan expanded dari filter sebelumnya.
  useEffect(() => {
    // Avoid calling setState synchronously inside effect to prevent
    // cascading renders; schedule it asynchronously.
    const id = setTimeout(() => setShowAll(false), 0);
    return () => clearTimeout(id);
  }, [activeFilter]);

  const hasMore = filteredItems.length > INITIAL_VISIBLE_COUNT;
  const displayedItems = showAll
    ? filteredItems
    : filteredItems.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24"
    >
      <DriftingOrbs />
      <SectionWatermark text="PROJECTS" />

      {floatingBubbles.map((b) => (
        <FloatingBubble key={b.text} {...b} />
      ))}

      <div className="relative z-10">
        <ScrollReveal>
          <p className="font-mono text-sm text-accent">{"// 02 projects"}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
            Project & sertifikat yang pernah aku dapetin
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-4 max-w-xl text-muted">
            Beberapa project dari tugas sekolah, PKL, eksplorasi pribadi, dan
            sertifikat yang pernah aku kumpulin. Klik card buat lihat detail
            lengkapnya.
          </p>
        </ScrollReveal>

        {/* Filter pills: All / Projek / Sertifikat */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-2">
            {filterOptions.map(({ value, label }) => {
              const isActive = value === activeFilter;
              return (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-200 ${isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line text-muted hover:border-accent/40 hover:text-primary"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Bento grid 12 kolom — ukuran tiap card ngikutin bentoPattern
            berdasarkan urutan, bukan cuma featured/non-featured seperti versi lama */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, i) => {
              const span = bentoPattern[i % bentoPattern.length];
              return (
                <motion.div
                  key={`${item.kind}-${item.data.slug}`}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className={spanClasses[span]}
                >
                  {item.kind === "project" ? (
                    <ProjectCard project={item.data} />
                  ) : (
                    <CertificateCard certificate={item.data} />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Tombol expand/collapse, cuma muncul kalau item-nya lebih banyak dari batas awal */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-line px-6 py-2 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent/40 hover:text-primary"
            >
              {showAll
                ? "Sembunyikan"
                : `Tampilkan Semua (${filteredItems.length - INITIAL_VISIBLE_COUNT} lagi)`}
            </button>
          </div>
        )}

        {filteredItems.length === 0 && (
          <p className="mt-12 text-center font-mono text-sm text-muted">
            Belum ada konten di kategori ini.
          </p>
        )}
      </div>
    </section>
  );
}

/* ── Card untuk project ── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <SpotlightCard>
        {/* Thumbnail — foto asli kalau ada, mockup browser animasi kalau belum.
            Keduanya dibungkus absolute inset-0 biar dipaksa ngisi kotak
            aspect-video parent-nya, gak peduli ukuran natural kontennya. */}
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
            <div className="absolute inset-0">
              <BrowserMockup />
            </div>
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
        </div>
      </SpotlightCard>
    </Link>
  );
}

/* ── Card untuk sertifikat — preview gambar sengaja dikomen dulu, belum ada asetnya ── */
function CertificateCard({ certificate }: { certificate: Certificate }) {
  const content = (
    <SpotlightCard className="flex h-full flex-col">
      {/* Thumbnail — mockup sertifikat animasi selama belum ada file asli.
          Tinggal uncomment <Image> di bawah kalau asetnya udah siap. */}
      <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
        {/* {certificate.image ? (
          <Image
            src={certificate.image}
            alt={`Sertifikat ${certificate.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : ( */}
        <div className="absolute inset-0">
          <CertificateMockup />
        </div>
        {/* )} */}
      </div>

      {/* Judul, penerbit, & deskripsi */}
      <h3 className="font-display text-xl font-semibold text-primary">
        {certificate.title}
      </h3>
      <p className="mt-1 font-mono text-xs text-accent">
        {certificate.issuer} • {certificate.date}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {certificate.description}
      </p>
    </SpotlightCard>
  );

  // Kalau ada link verifikasi, bungkus jadi anchor ke tab baru. Kalau belum, ga usah dibikin klik-able.
  return certificate.credentialUrl ? (
    <a
      href={certificate.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {content}
    </a>
  ) : (
    <div className="h-full">{content}</div>
  );
}

/* ── Mockup animasi buat card sertifikat yang belum ada gambarnya,
     gaya identik BrowserMockup: elemen dekoratif yang gerak-gerak halus ── */
function CertificateMockup() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-elevated/40">
      {/* Bingkai putus-putus, kesan garis sertifikat */}
      <div className="pointer-events-none absolute inset-3 rounded border border-dashed border-line/60" />

      {/* Seal/badge di tengah, pulsing + goyang pelan */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-2xl"
      >
        🏅
      </motion.div>

      {/* Skeleton garis teks, shimmer opacity biar keliatan "hidup" */}
      <div className="absolute bottom-6 left-1/2 flex w-2/3 -translate-x-1/2 flex-col gap-1.5">
        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-full rounded-full bg-line"
        />
        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
          className="h-1.5 w-2/3 rounded-full bg-line"
        />
      </div>
    </div>
  );
}

/* ── Watermark judul section, gaya identik Hero & About ── */
function SectionWatermark({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
      <span className="select-none whitespace-nowrap pr-4 font-display text-[18vw] font-bold uppercase leading-none text-primary/[0.03] md:text-[10vw]">
        {text}
      </span>
    </div>
  );
}

/* ── Bubble melayang, gaya identik Hero & About ── */
function FloatingBubble({
  text,
  pos,
  delay,
  duration,
}: {
  text: string;
  pos: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`pointer-events-none absolute z-10 hidden lg:block ${pos}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        className="whitespace-nowrap rounded-full border border-line bg-elevated/80 px-3.5 py-1.5 font-mono text-[11px] text-muted shadow-lg backdrop-blur-sm"
      >
        {text}
      </motion.div>
    </motion.div>
  );
}

/* ── Orb gradient drifting, gaya identik Hero & About ── */
function DriftingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 50, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-0 h-[360px] w-[360px] rounded-full blur-[110px]"
        style={{ background: "rgba(79,168,255,0.10)" }}
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-10 h-[320px] w-[320px] rounded-full blur-[110px]"
        style={{ background: "rgba(255,182,72,0.06)" }}
      />
    </div>
  );
}