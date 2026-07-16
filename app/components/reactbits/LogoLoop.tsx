"use client";

type LogoLoopProps = {
  items: string[];
  speed?: number; // detik buat 1 putaran penuh, makin kecil makin cepat
  className?: string;
};

/**
 * LogoLoop — marquee infinite yang scroll sendiri ke kiri, isinya
 * bisa tech stack, tools, atau tag apapun. Item digandain 2x biar
 * transisi loop-nya mulus tanpa jeda/lompatan.
 *
 * Contoh pakai:
 * <LogoLoop items={["React", "Next.js", "Tailwind CSS"]} speed={30} />
 */
export default function LogoLoop({ items, speed = 25, className }: LogoLoopProps) {
  const loopItems = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className="animate-loop-scroll flex w-max gap-3"
        style={{ animationDuration: `${speed}s` }}
      >
        {loopItems.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-elevated px-4 py-2 font-mono text-xs text-muted"
          >
            {`<${item}/>`}
          </span>
        ))}
      </div>

      {/* Fade halus di kiri-kanan biar potongan marquee ga keliatan mentah */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}