// app/components/reactbits/SectionDecor.tsx
"use client";

import { motion } from "framer-motion";

export function SectionWatermark({ text }: { text: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
      <span className="select-none whitespace-nowrap pr-4 font-display text-[18vw] font-bold uppercase leading-none text-primary/[0.03] md:text-[10vw]">
        {text}
      </span>
    </div>
  );
}

export function DriftingOrbs() {
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