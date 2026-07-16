"use client";

import { useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string; // default pakai warna accent biru
};

/**
 * SpotlightCard — card dengan efek cahaya lembut yang ngikutin
 * posisi kursor mouse. Cocok buat card project atau skill,
 * bikin interaksi hover kerasa lebih "hidup" tanpa berlebihan.
 *
 * Contoh pakai:
 * <SpotlightCard>
 *   <h3>Judul Project</h3>
 *   <p>Deskripsi...</p>
 * </SpotlightCard>
 */
export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(79, 168, 255, 0.15)", // accent biru, transparan
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-elevated p-6 transition-colors duration-300 hover:border-accent/40",
        className
      )}
    >
      {/* Layer spotlight, posisinya ngikutin cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {/* Konten card, ditaruh di atas layer spotlight */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}