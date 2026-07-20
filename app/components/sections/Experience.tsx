"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { experiences, type Experience } from "@/app/lib/data";

const typeLabels: Record<string, string> = {
  pkl: "PKL",
  organisasi: "Organisasi",
  lomba: "Lomba",
  sekolah: "Sekolah",
  bootcamp: "Bootcamp",
  lainnya: "Lainnya",
};

// tipe yang mau dipisah jadi "cabang" di luar jalur utama — tinggal tambah di sini kalau perlu
const BRANCH_TYPES = new Set<string>(["bootcamp"]);

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24">
      <DriftingOrbs />
      <SectionWatermark text="WORK" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-sm text-accent">{"// 04 experience"}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
            Perjalanan sejauh ini
          </h2>
        </ScrollReveal>

        <ExperienceLayout />
      </div>
    </section>
  );
}

/* ── Layout: jalur utama lurus terus + cabang loop kecil buat tipe di BRANCH_TYPES ── */
function ExperienceLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.35"],
  });

  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });

  useMotionValueEvent(lineProgress, "change", (v) => {
    const idx = Math.min(experiences.length - 1, Math.max(0, Math.floor(v * experiences.length)));
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
      {/* Timeline */}
      <div className="relative pl-8">
        {/* garis utama — satu garis lurus tunggal, gak pernah terputus */}
        <div className="absolute left-[7px] top-1 h-full w-px bg-line" />
        <motion.div
          style={{ scaleY: lineProgress }}
          className="absolute left-[7px] top-1 h-full w-px origin-top bg-accent"
        />

        <div className="flex flex-col">
          {experiences.map((exp, i) =>
            BRANCH_TYPES.has(exp.type) ? (
              <BranchEntry key={exp.role} exp={exp} />
            ) : (
              <MainEntry
                key={exp.role}
                exp={exp}
                index={i}
                total={experiences.length}
                progress={lineProgress}
              />
            )
          )}
        </div>
      </div>

      {/* Sticky photo panel — desktop only */}
      <div className="relative hidden lg:block">
        <div className="sticky top-32">
          <StickyPhoto exp={experiences[activeIndex]} />
        </div>
      </div>
    </div>
  );
}

/* ── Foto yang crossfade sesuai entry aktif, dibungkus kayak polaroid ── */
function StickyPhoto({ exp }: { exp: Experience }) {
  if (!exp.image) return null;

  return (
    <div className="relative">
      <div
        className="absolute -inset-4 -z-10 rounded-[28px] opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, rotate: -3, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ rotate: 0, scale: 1.015 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rotate-2 overflow-hidden rounded-2xl border border-line/60 bg-elevated shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
      >
        <div className="relative h-[360px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={exp.image}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={exp.image} alt={exp.role} fill sizes="340px" className="object-cover" />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />

          <span className="absolute right-3 top-3 rounded-full border border-line/60 bg-bg/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-warm backdrop-blur-md">
            {typeLabels[exp.type] ?? exp.type}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent">{exp.period}</p>
            <p className="mt-1.5 font-display text-base font-semibold leading-snug text-primary">
              {exp.role}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">{exp.organization}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Entry di jalur utama: dot nempel langsung di garis ── */
function MainEntry({
  exp,
  index,
  total,
  progress,
}: {
  exp: Experience;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const threshold = (index + 0.5) / total;
  const dotScale = useTransform(progress, [threshold - 0.06, threshold], [0.4, 1]);
  const dotOpacity = useTransform(progress, [threshold - 0.06, threshold], [0.35, 1]);
  const rowOpacity = useTransform(progress, [threshold - 0.1, threshold], [0.4, 1]);

  return (
    <motion.div
      style={{ opacity: rowOpacity }}
      initial={{ x: -12 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative pb-14 last:pb-0"
    >
      <motion.span
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent"
      />

      <EntryContent exp={exp} />
    </motion.div>
  );
}

/* ── Cabang: loop kecil keluar dari garis utama (persis gaya About.tsx), card-nya digeser ke kanan ── */
function BranchEntry({ exp }: { exp: Experience }) {
  return (
    <div className="relative pb-14 last:pb-0">
      <svg
        viewBox="0 0 60 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-8 top-1 h-10 w-14 overflow-visible"
      >
        <path
          d="M 7 0 C 30 0, 30 20, 50 20 C 30 20, 30 40, 7 40"
          stroke="var(--color-warm)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          fill="none"
          opacity="0.65"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="ml-3 rounded-xl border border-dashed border-warm/50 bg-elevated/40 p-4"
      >
        <EntryContent exp={exp} accentClass="text-warm border-warm" />
      </motion.div>
    </div>
  );
}

/* ── Isi konten entry, dipakai bareng oleh MainEntry & BranchEntry ── */
function EntryContent({ exp, accentClass }: { exp: Experience; accentClass?: string }) {
  return (
    <div className="flex gap-4">
      {exp.image && (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line lg:hidden">
          <Image src={exp.image} alt={exp.role} fill sizes="56px" className="object-cover" />
        </div>
      )}

      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{exp.period}</p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-semibold text-primary">{exp.role}</h3>
          <span
            className={`rounded-full border border-dashed px-3 py-0.5 font-mono text-[11px] ${
              accentClass ?? "border-line text-warm"
            }`}
          >
            ⎇ {typeLabels[exp.type] ?? exp.type}
          </span>
        </div>

        <p className="mt-1 font-mono text-sm text-muted">{exp.organization}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{exp.description}</p>
      </div>
    </div>
  );
}

/* ── Decor, sama kayak di About.tsx ── */
function SectionWatermark({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
      <span className="select-none whitespace-nowrap pr-4 font-display text-[18vw] font-bold uppercase leading-none text-primary/[0.03] md:text-[10vw]">
        {text}
      </span>
    </div>
  );
}

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