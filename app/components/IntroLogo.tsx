"use client";
import { useEffect, useState } from "react";

export default function IntroLogo({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 700);
    const t2 = setTimeout(() => setPhase("out"), 1900);
    const t3 = setTimeout(() => onDone(), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0D] transition-opacity duration-400 ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <span
          className={`font-[family-name:var(--font-display)] text-6xl font-bold text-[#FAFAF9] transition-all duration-500 ease-out ${
            phase === "in" ? "translate-y-2 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
          }`}
        >
          Rizky Alfath
        </span>
        <span
          className={`mt-3 h-px bg-[#5B5FEF] transition-all duration-500 delay-150 ease-out ${
            phase === "in" ? "w-0" : "w-10"
          }`}
        />
      </div>
    </div>
  );
}