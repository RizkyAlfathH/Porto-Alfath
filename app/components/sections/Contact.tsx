import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { profile } from "@/app/lib/data";

export default function Contact() {
    return (
        <section id="contact" className="px-6 py-24 md:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center">
                <ScrollReveal>
                    <p className="font-mono text-sm text-accent">{"// 06 contact"}</p>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <h2 className="mt-6 font-display text-3xl font-semibold text-primary md:text-4xl">
                        Mari terhubung
                    </h2>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                    <p className="mt-4 text-muted">
                        Lagi cari kesempatan magang atau kerja pertama di bidang frontend.
                        Kalau ada peluang atau cuma mau ngobrol soal project, jangan ragu
                        buat kontak aku lewat email atau media sosial di bawah.
                    </p>
                </ScrollReveal>

                {/* CTA utama — email, paling gampang dihubungi recruiter */}
                <ScrollReveal delay={0.2}>
                    <a
                        href={`mailto:${profile.email}`}
                        className="mt-8 inline-block rounded-full bg-accent px-8 py-4 font-mono text-base font-medium text-bg transition-transform hover:scale-105"
                    >
                        {profile.email}
                    </a>
                </ScrollReveal>

                {/* Link sosial sekunder */}
                <ScrollReveal delay={0.25}>
                    <div className="mt-8 flex justify-center gap-6 font-mono text-sm">
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted transition-colors hover:text-accent"
                        >
                            GitHub ↗
                        </a>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted transition-colors hover:text-accent"
                        >
                            LinkedIn ↗
                        </a>
                        <a
                            href={profile.resume}
                            download
                            className="text-muted transition-colors hover:text-accent"
                        >
                            Resume ↗
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}