import Image from "next/image";
import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import SpotlightCard from "@/app/components/reactbits/SpotlightCard";
import { testimonials } from "@/app/lib/data";

export default function Testimonials() {
  // Kalau belum ada testimoni sama sekali, section ini disembunyiin
  // dulu daripada nampilin kosong yang keliatan ga niat
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="px-6 py-24 md:px-16 lg:px-24">
      <ScrollReveal>
        <p className="font-mono text-sm text-accent">{"// 05 testimonials"}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
          Kata mereka
        </h2>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, i) => (
          <ScrollReveal key={testimonial.name} delay={0.1 * i}>
            <SpotlightCard spotlightColor="rgba(255, 182, 72, 0.12)">
              {/* Tanda kutip besar sebagai aksen visual, warna amber
                  biar beda dari card project yang glow biru */}
              <span className="font-display text-5xl leading-none text-warm/40">
                &ldquo;
              </span>

              <p className="mt-2 text-base leading-relaxed text-primary">
                {testimonial.quote}
              </p>

              <div className="mt-6 flex items-center gap-3">
                {testimonial.avatar ? (
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-line object-cover"
                  />
                ) : (
                  // Fallback: inisial nama, biar ga perlu foto asli
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg font-mono text-sm text-accent">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-primary">
                    {testimonial.name}
                  </p>
                  <p className="font-mono text-xs text-muted">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}