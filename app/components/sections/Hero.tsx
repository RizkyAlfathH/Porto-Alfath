"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import Lanyard from "@/app/components/Lanyard/Lanyard";
import { profile, projects } from "@/app/lib/data";

const floatingBubbles = [
  { text: "⚡ Frontend Developer", pos: "left-[3%] top-[10%]", delay: 0, duration: 5.5 },
  { text: "🎓 Fresh graduate", pos: "left-[2%] bottom-[12%]", delay: 0.6, duration: 6.5 },
  { text: "🚀 Full-Stack Developer", pos: "right-[3%] top-[12%]", delay: 1.1, duration: 6 },
  { text: "✨ Open to work", pos: "right-[4%] bottom-[10%]", delay: 0.3, duration: 5 },
];

const stats = [
  { icon: "📁", label: "Proyek Selesai", get: () => projects.length, suffix: "+" },
  { icon: "🕒", label: "Tahun Pengalaman", get: () => 3, suffix: "+" },
  { icon: "☕", label: "Cangkir Kopi", get: () => 999, suffix: "+" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 md:px-16 lg:px-24"
    >
      <DriftingOrbs />
      <SectionWatermark text={profile.name} />

      {floatingBubbles.map((b) => (
        <FloatingBubble key={b.text} {...b} />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* ── Kolom kiri: identitas ── */}
        <div>
          <ScrollReveal>
            <p className="font-mono text-sm text-accent">{"// 00 hero"}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-primary md:text-6xl">
              Halo, saya <span className="text-accent">{profile.name}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p className="mt-3 font-mono text-base text-warm md:text-lg">
              {profile.role}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.26}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              {profile.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.34}>
            <div className="mt-8 flex flex-wrap gap-3">
              <HeroButton href="#projects" variant="solid">
                Lihat Karya
              </HeroButton>
              <HeroButton href={profile.resume} variant="outline" download>
                Unduh CV
              </HeroButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.42}>
              <div className="mt-10 flex max-w-sm flex-col gap-4">
                {stats.map((s, i) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-xs text-muted">{s.icon} {s.label}</span>
                      <span className="font-display text-lg font-semibold text-primary">
                        <Counter to={s.get()} suffix={s.suffix} delay={i * 0.1} />
                      </span>
                    </div>
                    <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-line/50">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                        className="h-full origin-left rounded-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
          </ScrollReveal>
        </div>

        {/* ── Kolom kanan: Lanyard, dibingkai selaras dengan card di About ── */}
        <div className="flex justify-center lg:justify-end">
          <BadgeStage>
            <div className="relative h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] md:h-[440px] md:w-[400px]">
              <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} transparent />
            </div>
          </BadgeStage>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

/* ── Kartu stat: icon + angka besar + label, ganti dotted-row lama ── */
function StatCard({
  icon,
  label,
  to,
  suffix,
  delay = 0,
}: {
  icon: string;
  label: string;
  to: number;
  suffix: string;
  delay?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-line bg-elevated/40 px-3 py-3.5 text-center"
    >
      <span className="text-lg" aria-hidden>
        {icon}
      </span>
      <p className="mt-1.5 font-display text-xl font-semibold text-primary sm:text-2xl">
        <Counter to={to} suffix={suffix} delay={delay} />
      </p>
      <p className="mt-0.5 font-mono text-[9px] uppercase leading-tight tracking-wide text-muted sm:text-[10px]">
        {label}
      </p>
    </motion.div>
  );
}

function Counter({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame: number | undefined;
    const duration = 700;
    const startTime = performance.now() + 400 + delay * 1000;

    function tick(now: number) {
      if (now < startTime) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(progress * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, delay]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

/* ── Tombol CTA: pill rounded selaras gaya About, dengan shine sweep tipis ── */
function HeroButton({
  href,
  children,
  variant,
  download,
}: {
  href: string;
  children: React.ReactNode;
  variant: "solid" | "outline";
  download?: boolean;
}) {
  const styles =
    variant === "solid"
      ? "bg-accent text-bg"
      : "border border-line text-primary hover:border-accent hover:text-accent";

  return (
    <motion.a
      href={href}
      download={download}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className={`relative overflow-hidden rounded-full px-6 py-3 text-center font-medium transition-colors ${styles}`}
    >
      <motion.span
        aria-hidden
        initial={{ x: "-120%" }}
        whileHover={{ x: "220%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

/* ── Panggung Lanyard: card rounded-2xl border-line, radius sama dengan card modal di About ── */
function BadgeStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-line bg-elevated/40 shadow-2xl"
      >
        {children}
      </motion.div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        ID Badge
      </p>
    </div>
  );
}

/* ── Watermark nama raksasa, gaya identik SectionWatermark di About ── */
function SectionWatermark({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
      <span className="select-none whitespace-nowrap pr-4 font-display text-[18vw] font-bold uppercase leading-none text-primary/[0.03] md:text-[10vw]">
        {text}
      </span>
    </div>
  );
}

/* ── Bubble melayang, disalin dari About supaya bahasa visualnya sama ── */
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
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 + delay }}
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

/* ── Orb drifting, sama seperti di About ── */
function DriftingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 60, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-[110px]"
        style={{ background: "rgba(79,168,255,0.14)" }}
      />
      <motion.div
        animate={{ x: [0, -40, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-16 h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: "rgba(255,182,72,0.08)" }}
      />
    </div>
  );
}

/* ── Indikator scroll ── */
function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-muted to-transparent" />
      </motion.div>
    </motion.div>
  );
}