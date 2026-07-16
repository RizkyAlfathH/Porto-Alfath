import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { skills } from "@/app/lib/data";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & Workflow",
};

export default function Skills() {
  // Kelompokin skill berdasarkan kategori biar ga numpuk jadi satu list panjang
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="px-6 py-24 md:px-16 lg:px-24">
      <ScrollReveal>
        <p className="font-mono text-sm text-accent">{"// 03 skills"}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
          Tools yang aku pakai
        </h2>
      </ScrollReveal>

      <div className="mt-12 space-y-10">
        {Object.entries(grouped).map(([category, items], groupIndex) => (
          <ScrollReveal key={category} delay={0.1 * groupIndex}>
            <h3 className="mb-4 font-mono text-sm uppercase tracking-wide text-muted">
              {categoryLabels[category] ?? category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <span
                  key={skill.name}
                  className="group relative rounded-full border border-line bg-elevated px-4 py-2 text-sm text-primary transition-colors hover:border-accent/50"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}