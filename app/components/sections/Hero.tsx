import SplitText from "@/app/components/reactbits/SplitText";
import LogoLoop from "@/app/components/reactbits/LogoLoop";
import Lanyard from "@/app/components/Lanyard/Lanyard";
import { profile, projects } from "@/app/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-grid relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(79, 168, 255, 0.08), transparent)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Kolom kiri — teks utama */}
        <div>
          {/* Badge status, kesan aktif & profesional */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="font-mono text-xs text-muted">Available for work</span>
          </div>

          <p className="mb-4 font-mono text-sm text-accent">
            {"// halo, perkenalkan"}
          </p>

          <SplitText
            text={profile.name}
            as="h1"
            className="font-display text-5xl font-semibold leading-tight text-primary md:text-7xl"
          />

          <p className="mt-4 font-mono text-lg text-warm md:text-xl">
            {"\"" + profile.role + "\""}
          </p>

          <p className="mt-6 max-w-lg text-base text-muted md:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 font-medium text-bg transition-transform hover:scale-105"
            >
              Lihat Project
            </a>
            <a
              href={profile.resume}
              download
              className="rounded-full border border-line px-6 py-3 font-medium text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          </div>

          {/* Stat row — ngisi ruang kosong dengan info riil, bukan angka gimmick */}
          <div className="mt-12 flex gap-10 border-t border-line pt-8">
            <Stat value={`${projects.length}+`} label="Project" />
            <Stat value="2026" label="Fresh Graduate" />
            <Stat value="Frontend" label="Fokus" />
          </div>
        </div>

        {/* Kolom kanan — Lanyard 3D */}
        <div className="relative h-[420px] w-full md:h-[560px]">
          {/* Ghost panel di belakang Lanyard, buat depth */}
          <div
            className="absolute left-1/2 top-1/2 h-64 w-48 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl border border-line bg-elevated/40 blur-[2px]"
            aria-hidden="true"
          />
          <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} transparent />
        </div>
      </div>

      {/* Marquee tech stack — motion halus di dasar Hero */}
      <div className="relative z-10 mt-16">
        <LogoLoop
          items={["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]}
          speed={30}
        />
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-xs text-muted">
        scroll ↓
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-primary">{value}</p>
      <p className="font-mono text-xs text-muted">{label}</p>
    </div>
  );
}