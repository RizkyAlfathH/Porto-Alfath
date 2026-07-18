"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import SpotlightCard from "@/app/components/reactbits/SpotlightCard";
import BrowserMockup from "@/app/components/reactbits/BrowserMockup";
import { projects } from "@/app/lib/data";

const floatingBubbles = [
  { text: "📂 Portofolio", pos: "left-[2%] top-[6%]", delay: 0.2, duration: 5.8 },
  { text: "🛠️ Work in progress", pos: "right-[2%] bottom-[8%]", delay: 0.8, duration: 6.4 },
];

// Lookup class literal — Tailwind butuh nama class utuh muncul di source,
// jadi ga bisa di-interpolate langsung kayak `md:col-span-${n}`.
const spanClasses: Record<number, string> = {
  12: "md:col-span-12",
  7: "md:col-span-7",
  6: "md:col-span-6",
  5: "md:col-span-5",
};

// Pola bento 12-kolom yang diulang: pembuka full-width, lalu 7+5, 5+7, 6+6.
// Tiap kelompok totalnya selalu pas 12, jadi barisnya selalu rapi tanpa sisa.
const bentoPattern = [7, 5, 5, 7, 6, 6, 8, 4, 4, 8];

export default function Projects() {
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
            Project yang pernah aku bikin
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-4 max-w-xl text-muted">
            Beberapa project dari tugas sekolah, PKL, dan eksplorasi pribadi.
            Klik card buat lihat detail lengkapnya.
          </p>
        </ScrollReveal>

        {/* Bento grid 12 kolom — ukuran tiap card ngikutin bentoPattern
            berdasarkan urutan, bukan cuma featured/non-featured seperti versi lama */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
          {projects.map((project, i) => {
            const span = bentoPattern[i % bentoPattern.length];
            return (
              <ScrollReveal
                key={project.slug}
                delay={0.1 * i}
                className={spanClasses[span]}
              >
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <SpotlightCard
                    className={`flex h-full flex-col ${
                      project.featured ? "border-accent/30" : ""
                    }`}
                  >
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

                      {/* <div className="mt-4 flex gap-4 font-mono text-xs">
                        {project.link && (
                          <span className="text-accent">↗ live demo</span>
                        )}
                        {project.github && (
                          <span className="text-muted">↗ source code</span>
                        )}
                      </div> */}
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
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