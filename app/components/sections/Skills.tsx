"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import SkillTile from "@/app/components/skills/SkillTile";
import { skills } from "@/app/lib/data";
import { Layout, Server, Smartphone, Wrench, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiDjango,
  SiLaravel,
  SiPhp,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiFlutter,
  SiDart,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  tools: "Tools & Workflow",
};

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Layout,
  backend: Server,
  mobile: Smartphone,
  tools: Wrench,
};

// Icon & warna brand asli tiap skill biar langsung kekenalan
const skillMeta: Record<string, { icon: IconType; color: string }> = {
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss, color: "#663399" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "Next.js": { icon: SiNextdotjs, color: "#E5E5E5" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  Django: { icon: SiDjango, color: "#4B8B3B" },
  Laravel: { icon: SiLaravel, color: "#FF2D20" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  Python: { icon: SiPython, color: "#3776AB" },
  "REST API": { icon: Server as unknown as IconType, color: "#9CA3AF" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  Flutter: { icon: SiFlutter, color: "#02569B" },
  Dart: { icon: SiDart, color: "#0175C2" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#E5E5E5" },
  "VS Code": { icon: VscVscode, color: "#007ACC" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
};

const floatingBubbles = [
  { text: "🛠 Selalu upgrade skill", pos: "left-[2%] top-[8%]", delay: 0.2, duration: 5.8 },
  { text: "🧩 Problem solver", pos: "right-[3%] bottom-[8%]", delay: 0.8, duration: 6.4 },
];

export default function Skills() {
  // Kelompokin skill berdasarkan kategori biar ga numpuk jadi satu list panjang
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24">
      <DriftingOrbs />
      <SectionWatermark text="SKILLS" />

      {floatingBubbles.map((b) => (
        <FloatingBubble key={b.text} {...b} />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-sm text-accent">{"// 03 skills"}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
            Tools yang aku pakai
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(grouped).map(([category, items], groupIndex) => {
            const CategoryIcon = categoryIcons[category] ?? Layout;

            return (
              <ScrollReveal key={category} delay={0.1 * groupIndex}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "var(--color-accent)" }}
                  transition={{ duration: 0.2 }}
                  className="h-full rounded-2xl border border-line bg-elevated/60 p-6 backdrop-blur-sm"
                >
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <CategoryIcon className="h-4 w-4" />
                    </span>
                    <h3 className="font-mono text-sm uppercase tracking-wide text-muted">
                      {categoryLabels[category] ?? category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {items.map((skill) => {
                      const meta = skillMeta[skill.name];
                      if (!meta) return null;

                      return (
                        <SkillTile
                          key={skill.name}
                          name={skill.name}
                          icon={meta.icon}
                          color={meta.color}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Watermark judul section, disalin dari Hero/About ── */
function SectionWatermark({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
      <span className="select-none whitespace-nowrap pr-4 font-display text-[18vw] font-bold uppercase leading-none text-primary/[0.03] md:text-[10vw]">
        {text}
      </span>
    </div>
  );
}

/* ── Bubble melayang, disalin dari Hero/About ── */
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

/* ── Orb gradient drifting, disalin dari Hero/About ── */
function DriftingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 50, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-1/4 h-[360px] w-[360px] rounded-full blur-[110px]"
        style={{ background: "rgba(79,168,255,0.10)" }}
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-16 h-[340px] w-[340px] rounded-full blur-[110px]"
        style={{ background: "rgba(255,182,72,0.06)" }}
      />
    </div>
  );
}