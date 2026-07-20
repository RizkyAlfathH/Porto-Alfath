"use client";
import { motion } from "framer-motion";
import { Mail, FileDown } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa6";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { profile } from "@/app/lib/data";

const floatingBubbles = [
  { text: "📬 Open for work", pos: "left-[4%] top-[14%]", delay: 0, duration: 5.5 },
  { text: "💬 Let's talk", pos: "right-[4%] top-[18%]", delay: 0.5, duration: 6 },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24"
    >
      <DriftingOrbs />
      <SectionWatermark text="Contact" />

      {floatingBubbles.map((b) => (
        <FloatingBubble key={b.text} {...b} />
      ))}

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="font-mono text-sm text-accent">{"// 06 contact"}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
            Mari terhubung
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-4 text-muted">
            Lagi cari kesempatan magang atau kerja pertama di bidang frontend.
            Kalau ada peluang atau cuma mau ngobrol soal project, jangan ragu
            buat kontak aku lewat email atau media sosial di bawah.
          </p>
        </ScrollReveal>

        {/* CTA utama — icon + shine sweep */}
        <ScrollReveal delay={0.2}>
          <ContactButton href={`mailto:${profile.email}`}>
            <Mail size={18} strokeWidth={2} />
            {profile.email}
          </ContactButton>
        </ScrollReveal>

        {/* Link sosial — icon only, dibungkus card bulat */}
        <ScrollReveal delay={0.28}>
          <SocialCard>
            <IconLink href={profile.github} label="GitHub" external>
              <SiGithub size={20} strokeWidth={1.8} />
            </IconLink>
            <IconLink href={profile.linkedin} label="LinkedIn" external>
              <FaLinkedinIn size={20} strokeWidth={1.8} />
            </IconLink>
            <IconLink href={profile.instagram} label="Instagram" external>
              <FaInstagram size={20} strokeWidth={1.8} />
            </IconLink>
            <IconLink href={profile.tiktok} label="TikTok" external>
              <FaTiktok size={18} strokeWidth={1.8} />
            </IconLink>
            <IconLink href={profile.resume} label="Resume" download>
              <FileDown size={20} strokeWidth={1.8} />
            </IconLink>
          </SocialCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Tombol CTA email, icon + label + shine sweep ── */
function ContactButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent px-8 py-4 font-mono text-base font-medium text-bg"
    >
      <motion.span
        aria-hidden
        initial={{ x: "-120%" }}
        whileHover={{ x: "220%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.a>
  );
}

/* ── Tombol icon bulat untuk tiap link sosial ── */
function IconLink({
  href,
  label,
  children,
  external,
  download,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
}) {
  if (!href) return null;

  return (
    <motion.a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.15 }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-elevated/60 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </motion.a>
  );
}

/* ── Card pembungkus link sosial, radius & border samain sama BadgeStage ── */
function SocialCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-3 rounded-full border border-line bg-elevated/40 px-4 py-2.5 shadow-lg backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

/* ── Watermark nama raksasa, sama seperti Hero ── */
function SectionWatermark({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-start overflow-hidden">
      <span className="select-none whitespace-nowrap pl-4 font-display text-[18vw] font-bold uppercase leading-none text-primary/[0.03] md:text-[10vw]">
        {text}
      </span>
    </div>
  );
}

/* ── Bubble melayang, disalin dari Hero ── */
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
      transition={{ duration: 0.5, delay: 0.4 + delay }}
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

/* ── Orb drifting, sama seperti Hero ── */
function DriftingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 50, -20, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 -bottom-24 h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: "rgba(79,168,255,0.12)" }}
      />
      <motion.div
        animate={{ x: [0, -30, 25, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 -top-32 h-[340px] w-[340px] rounded-full blur-[110px]"
        style={{ background: "rgba(255,182,72,0.07)" }}
      />
    </div>
  );
}