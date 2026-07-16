"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements; // tag pembungkus, default "span"
  splitBy?: "chars" | "words";
  delay?: number; // jeda antar huruf/kata (detik)
  duration?: number;
  once?: boolean; // animasi cuma jalan sekali pas pertama masuk viewport
};

/**
 * SplitText — mecah teks jadi per huruf (atau per kata) lalu animasiin
 * muncul satu-satu. Cocok dipakai di Hero buat nama/headline biar
 * kesan pertama halaman langsung "hidup".
 *
 * Contoh pakai:
 * <SplitText text="Halo, aku Budi" as="h1" className="font-display text-6xl" />
 */
export default function SplitText({
  text,
  className,
  as = "span",
  splitBy = "chars",
  delay = 0.03,
  duration = 0.5,
  once = true,
}: SplitTextProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const pieces = splitBy === "chars" ? text.split("") : text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          controls.start("visible");
          hasAnimated.current = true;
        } else if (!entry.isIntersecting && !once) {
          controls.start("hidden");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls, once]);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        animate={controls}
        variants={container}
        style={{ display: "inline-block" }}
        aria-hidden="true"
      >
        {pieces.map((piece, i) => (
          <motion.span
            key={i}
            variants={item}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {piece === " " ? "\u00A0" : piece}
            {splitBy === "words" && i < pieces.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}