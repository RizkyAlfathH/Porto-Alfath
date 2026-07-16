"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // detik, buat efek berurutan (stagger) antar elemen
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number; // px, seberapa jauh elemen "geser" sebelum posisi akhir
  once?: boolean; // animasi cuma sekali pas pertama masuk viewport
};

/**
 * ScrollReveal — bungkus section/elemen apapun biar muncul dengan
 * fade + geser halus pas kena scroll ke viewport.
 *
 * Contoh pakai:
 * <ScrollReveal><h2>Judul Section</h2></ScrollReveal>
 * <ScrollReveal delay={0.15}><p>Muncul agak telat dari atas</p></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          setIsVisible(true);
          hasAnimated.current = true;
        } else if (!entry.isIntersecting && !once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return "none";
    }
  };

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-[cubic-bezier(0.22,1,0.36,1)]", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
        transitionDuration: "700ms",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}