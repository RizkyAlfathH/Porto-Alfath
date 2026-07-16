import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { experiences } from "@/app/lib/data";

const typeLabels: Record<string, string> = {
  pkl: "PKL",
  organisasi: "Organisasi",
  lomba: "Lomba",
  lainnya: "Lainnya",
};

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 md:px-16 lg:px-24">
      <ScrollReveal>
        <p className="font-mono text-sm text-accent">{"// 04 experience"}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
          Perjalanan sejauh ini
        </h2>
      </ScrollReveal>

      {/* Timeline: garis vertikal + titik penanda tiap entry.
          Ini beneran urut waktu, jadi garis timeline di sini masuk akal
          (beda sama numbered marker 01/02/03 yang cuma dekorasi). */}
      <div className="relative mt-14 ml-3 border-l border-line pl-10">
        {experiences.map((exp, i) => (
          <ScrollReveal key={i} delay={0.1 * i} direction="left">
            <div className="relative pb-14 last:pb-0">
              {/* Titik penanda di garis timeline */}
              <span className="absolute -left-[45px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-bg" />

              <p className="font-mono text-xs text-muted">{exp.period}</p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-semibold text-primary">
                  {exp.role}
                </h3>
                <span className="rounded-full border border-line px-3 py-0.5 font-mono text-xs text-accent">
                  {typeLabels[exp.type] ?? exp.type}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted">{exp.organization}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {exp.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}