import ScrollReveal from "@/app/components/reactbits/ScrollReveal";
import { profile } from "@/app/lib/data";

export default function About() {
    return (
        <section id="about" className="px-6 py-24 md:px-16 lg:px-24">
            <ScrollReveal>
                <p className="font-mono text-sm text-accent">{"// 01 about"}</p>
            </ScrollReveal>

            <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Kolom kiri — narasi tentang kamu */}
                <div>
                    <ScrollReveal delay={0.1}>
                        <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">
                            Kenalan lebih dekat
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                            {/* Ganti paragraf ini dengan cerita kamu sendiri:
                  gimana awal mula belajar coding, apa yang bikin kamu
                  suka frontend, dan apa yang kamu cari sekarang. */}
                            Aku {profile.name}, baru lulus dari jurusan Rekayasa Perangkat
                            Lunak (RPL) dan fokus membangun antarmuka web yang rapi,
                            cepat, dan enak dipakai. Selama sekolah aku belajar dari
                            nol — HTML statis sampai akhirnya bisa bikin aplikasy
                            dengan React dan Next.js. Sekarang aku lagi cari kesempatan
                            buat terus belajar sambil kerja di tim frontend/web development.
                        </p>
                    </ScrollReveal>

                    {/* Highlight singkat ala key:value, konsisten sama tema mono/terminal */}
                    <ScrollReveal delay={0.3}>
                        <div className="mt-8 grid grid-cols-2 gap-4 font-mono text-sm">
                            <HighlightItem label="status" value="open to work" accent />
                            <HighlightItem label="fokus" value="frontend web dev" />
                            <HighlightItem label="pendidikan" value="SMK — RPL" />
                            <HighlightItem label="lokasi" value="Indonesia" />
                        </div>
                    </ScrollReveal>
                </div>

                {/* Kolom kanan — mock "editor window" nampilin profile sebagai JSON,
            reinforce tema dev workspace tanpa perlu foto profil */}
                <ScrollReveal delay={0.15} direction="right">
                    <div className="overflow-hidden rounded-2xl border border-line bg-elevated shadow-2xl">
                        {/* Title bar ala code editor */}
                        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
                            <span className="ml-3 font-mono text-xs text-muted">
                                profile.json
                            </span>
                        </div>

                        {/* Isi "kode" */}
                        <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
                            <code>
                                <span className="text-muted">{"{"}</span>
                                {"\n  "}
                                <span className="text-accent">{"\"name\""}</span>
                                <span className="text-muted">: </span>
                                <span className="text-warm">{"\"" + profile.name + "\""}</span>
                                <span className="text-muted">,</span>
                                {"\n  "}
                                <span className="text-accent">{"\"role\""}</span>
                                <span className="text-muted">: </span>
                                <span className="text-warm">{"\"" + profile.role + "\""}</span>
                                <span className="text-muted">,</span>
                                {"\n  "}
                                <span className="text-accent">{"\"education\""}</span>
                                <span className="text-muted">: </span>
                                <span className="text-warm">{"\"SMK - RPL\""}</span>
                                <span className="text-muted">,</span>
                                {"\n  "}
                                <span className="text-accent">{"\"stack\""}</span>
                                <span className="text-muted">: [</span>
                                {"\n    "}
                                <span className="text-warm">{"\"React\""}</span>
                                <span className="text-muted">,</span>
                                {"\n    "}
                                <span className="text-warm">{"\"Next.js\""}</span>
                                <span className="text-muted">,</span>
                                {"\n    "}
                                <span className="text-warm">{"\"Tailwind CSS\""}</span>
                                {"\n  "}
                                <span className="text-muted">],</span>
                                {"\n  "}
                                <span className="text-accent">{"\"openToWork\""}</span>
                                <span className="text-muted">: </span>
                                <span className="text-warm">true</span>
                                {"\n"}
                                <span className="text-muted">{"}"}</span>
                            </code>
                        </pre>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

function HighlightItem({
    label,
    value,
    accent = false,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="rounded-lg border border-line bg-elevated px-4 py-3">
            <span className="text-muted">{label}:</span>{" "}
            <span className={accent ? "text-warm" : "text-primary"}>{value}</span>
        </div>
    );
}