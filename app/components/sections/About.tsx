"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { profile } from "@/app/lib/data";

const mainSteps = [
  { year: "Awal", title: "C#", desc: "Bahasa pertama yang aku pelajari, dari sini aku ngerti dasar logika pemrograman & OOP sebelum masuk ke web." },
  { year: "Lanjut", title: "HTML & CSS statis", desc: "Mulai masuk dunia web, belajar struktur halaman dan styling dari nol tanpa framework apa pun." },
  { year: "Lanjut", title: "PHP Native", desc: "Belajar server-side programming, ngerti alur request-response secara manual sebelum kenal framework." },
  { year: "Lanjut", title: "Laravel", desc: "Pindah ke framework, mulai paham struktur project yang lebih rapi: routing, MVC, dan migration." },
  { year: "Lanjut", title: "Python & Django", desc: "Eksplorasi ekosistem lain di luar PHP, belajar pendekatan backend yang beda gaya." },
  { year: "2026", title: "Next.js & TypeScript", desc: "Fokus sekarang: membangun web modern yang cepat, rapi, dan type-safe pakai React ecosystem." },
] as const;

const branchStep = {
  year: "Eksplorasi",
  title: "IoT & Arduino",
  desc: "Di tengah jalan aku sempat coba ranah hardware — ngoprek sensor & mikrokontroler. Bukan jalur utama, tapi bukti aku suka eksplorasi di luar comfort zone.",
  afterIndex: 3, // muncul sebagai cabang setelah "Laravel" (index 3), sebelum "Python & Django"
};

const facts = [
  { label: "Status", value: "Open to work", accent: true },
  { label: "Fokus", value: "Frontend Web Dev" },
  { label: "Pendidikan", value: "SMK — RPL" },
  { label: "Lokasi", value: "Indonesia" },
];

const floatingBubbles = [
  { text: "🎯 Detail-oriented", pos: "left-[1%] top-[4%]", delay: 0, duration: 5.5 },
  { text: "🌱 Selalu belajar", pos: "right-[2%] top-[46%]", delay: 0.7, duration: 6.2 },
];

type StepData = { year: string; title: string; desc: string };

export default function About() {
  const [selected, setSelected] = useState<StepData | null>(null);

  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24">
      <DriftingOrbs />
      <SectionWatermark text="ABOUT" />

      {floatingBubbles.map((b) => (
        <FloatingBubble key={b.text} {...b} />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-sm text-accent">{"// 01 about"}</p>
        </ScrollReveal>

        <div className="mt-6 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          {/* ── Kolom kiri: narasi + facts ── */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold leading-tight text-primary md:text-4xl">
                Kenalan lebih dekat
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                Aku {profile.name}, baru lulus dari jurusan Rekayasa Perangkat
                Lunak (RPL) dan fokus membangun antarmuka web yang rapi, cepat,
                dan enak dipakai. Sekarang aku lagi cari kesempatan buat terus
                belajar sambil kerja di tim frontend/web development.
              </p>
            </ScrollReveal>

            <div className="mt-10 flex flex-col gap-2.5">
              {facts.map((f, i) => (
                <ScrollReveal key={f.label} delay={0.3 + i * 0.08}>
                  <FactRow {...f} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ── Kolom kanan: timeline compact + branch ── */}
          <div className="relative">
            <ScrollReveal delay={0.15}>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Perjalanan singkat
              </p>
              <p className="mb-8 text-xs text-muted/70">Klik tiap poin buat baca detailnya</p>
            </ScrollReveal>

            <ScrollTimeline onSelect={setSelected} />
          </div>
        </div>
      </div>

      <DetailModal step={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ── Timeline: garis progress ke-isi sesuai scroll, node compact + cabang IoT ── */
function ScrollTimeline({ onSelect }: { onSelect: (step: StepData) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.35"],
  });

  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative pl-8">
      <div className="absolute left-[7px] top-1 h-full w-px bg-line" />
      <motion.div
        style={{ scaleY: lineProgress }}
        className="absolute left-[7px] top-1 h-full w-px origin-top bg-accent"
      />

      <div className="flex flex-col">
        {mainSteps.map((step, i) => (
          <div key={step.title}>
            <CompactNode
              step={step}
              index={i}
              total={mainSteps.length}
              progress={lineProgress}
              onSelect={onSelect}
            />
            {i === branchStep.afterIndex && (
              <BranchLoop step={branchStep} onSelect={onSelect} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Node compact di jalur utama: satu baris, klik buka modal ── */
function CompactNode({
  step,
  index,
  total,
  progress,
  onSelect,
}: {
  step: StepData;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
  onSelect: (step: StepData) => void;
}) {
  const threshold = (index + 0.5) / total;
  const dotScale = useTransform(progress, [threshold - 0.06, threshold], [0.4, 1]);
  const dotOpacity = useTransform(progress, [threshold - 0.06, threshold], [0.35, 1]);
  const rowOpacity = useTransform(progress, [threshold - 0.1, threshold], [0.4, 1]);

  return (
    <motion.button
      onClick={() => onSelect(step)}
      style={{ opacity: rowOpacity }}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex w-full items-center gap-3 py-3 text-left"
    >
      <motion.span
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute -left-[33px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent"
      />
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{step.year}</span>
      <span className="font-display text-sm font-medium text-primary sm:text-base">{step.title}</span>
      <span className="ml-auto text-muted opacity-0 transition-opacity group-hover:opacity-100">→</span>
    </motion.button>
  );
}

/* ── Cabang IoT: melengkung keluar dari jalur utama, nyambung balik ── */
function BranchLoop({ step, onSelect }: { step: StepData; onSelect: (step: StepData) => void }) {
  return (
    <div className="relative my-1 h-16">
      <svg
        viewBox="0 0 200 64"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-[26px] top-0 h-full w-[180px] overflow-visible sm:w-[220px]"
      >
        <path
          d="M 7 0 C 70 0, 70 32, 140 32 C 70 32, 70 64, 7 64"
          stroke="var(--color-warm)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          fill="none"
          opacity="0.55"
        />
      </svg>

      <motion.button
        onClick={() => onSelect(step)}
        whileHover={{ scale: 1.04, borderColor: "var(--color-warm)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="absolute left-[100px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-dashed border-line bg-elevated/50 px-3.5 py-1.5 font-mono text-[11px] text-warm sm:left-[130px]"
      >
        ⎇ {step.title}
      </motion.button>
    </div>
  );
}

/* ── Modal popup: muncul saat node diklik ── */
function DetailModal({ step, onClose }: { step: StepData | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {step && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 px-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-line bg-elevated p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{step.year}</p>
                <p className="mt-1 font-display text-xl font-semibold text-primary">{step.title}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted hover:border-accent hover:text-accent"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{step.desc}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Fact row ── */
function FactRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2 }}
      className="flex items-baseline gap-2 border-b border-dotted border-line py-2 font-mono text-sm"
    >
      <span className="shrink-0 text-muted">{label}</span>
      <span className="flex-1 border-b border-dotted border-line/40" />
      <span className={accent ? "text-warm" : "text-primary"}>{value}</span>
    </motion.div>
  );
}

/* ── Watermark judul section ── */
function SectionWatermark({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
      <span className="select-none whitespace-nowrap pr-4 font-display text-[18vw] font-bold uppercase leading-none text-primary/[0.03] md:text-[10vw]">
        {text}
      </span>
    </div>
  );
}

/* ── Bubble kecil melayang ── */
function FloatingBubble({ text, pos, delay, duration }: { text: string; pos: string; delay: number; duration: number }) {
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

/* ── Orb gradient drifting ── */
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