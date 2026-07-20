"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Briefcase,
    FolderGit2,
    Home,
    Mail,
    Menu,
    Moon,
    Sparkles,
    Sun,
    User,
    X,
} from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
    { label: "Hero", href: "#hero", icon: Home },
    { label: "About", href: "#about", icon: User },
    { label: "Experience", href: "#experience", icon: Briefcase },
    { label: "Skills", href: "#skills", icon: Sparkles },
    { label: "Projects", href: "#projects", icon: FolderGit2 },
    { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("hero");
    const [progress, setProgress] = useState(0);

    // ── Progress scroll vertikal (dipakai buat garis indikator di sidebar) ──
    useEffect(() => {
        function onScroll() {
            const h = document.documentElement;
            const scrolled = h.scrollTop;
            const max = h.scrollHeight - h.clientHeight;
            setProgress(max > 0 ? scrolled / max : 0);
        }
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ── Highlight section aktif ──
    useEffect(() => {
        const sections = navLinks
            .map((l) => document.getElementById(l.href.slice(1)))
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    // ── Lock scroll pas mobile menu kebuka ──
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    function handleNavClick(href: string) {
        setOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            {/* ── Sidebar vertikal, desktop only ── */}
            <motion.aside
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 rounded-2xl border border-line bg-elevated/70 px-3 py-6 backdrop-blur-md md:flex"
            >
                {/* Monogram */}
                <a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("#hero");
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-xs font-semibold text-accent"
                >
                    RA
                </a>

                <div className="h-px w-6 bg-line/60" />

                {/* Nav items: lingkaran fixed, label muncul sebagai tooltip pas hover */}
                <ul className="flex flex-col items-center gap-2">
                    {navLinks.map((link, i) => {
                        const isActive = active === link.href.slice(1);
                        const Icon = link.icon;
                        return (
                            <li key={link.href} className="group relative">
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(link.href);
                                    }}
                                    aria-label={link.label}
                                    className="block"
                                >
                                    <motion.span
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.94 }}
                                        transition={{ duration: 0.18 }}
                                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${isActive
                                                ? "border-accent bg-accent text-bg"
                                                : "border-transparent text-muted group-hover:border-line group-hover:bg-bg/60 group-hover:text-primary"
                                            }`}
                                    >
                                        <Icon size={15} strokeWidth={2} />
                                    </motion.span>

                                    {/* Tooltip: nomor urut + label, slide dari sidebar */}
                                    <span className="pointer-events-none absolute left-12 top-1/2 z-10 flex -translate-y-1/2 translate-x-1 items-center gap-2 whitespace-nowrap rounded-lg border border-line bg-elevated/95 px-3 py-1.5 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                                        <span className="font-mono text-[10px] text-muted">
                                            {String(i).padStart(2, "0")}
                                        </span>
                                        <span className="font-mono text-xs text-primary">{link.label}</span>
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <div className="relative h-16 w-px overflow-hidden rounded-full bg-line/40">
                    <motion.div
                        style={{ scaleY: progress }}
                        className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-accent"
                    />
                </div>

                {/* CTA kontak */}
                <a
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("#contact");
                    }}
                    aria-label="Hubungi"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-primary transition-colors hover:border-accent hover:text-accent"
                >
                    <ArrowRight size={15} />
                </a>

                <div className="h-px w-6 bg-line/60" />

                {/* Toggle mode gelap/terang */}
                <ThemeToggle />
            </motion.aside>

            {/* ── Tombol hamburger + toggle tema, mobile only ── */}
            <div className="fixed right-5 top-5 z-50 flex items-center gap-2 md:hidden">
                <ThemeToggle />
                <motion.button
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    aria-label="Toggle menu"
                    onClick={() => setOpen((v) => !v)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-elevated/80 text-primary backdrop-blur-md"
                >
                    {open ? <X size={18} /> : <Menu size={18} />}
                </motion.button>
            </div>

            {/* ── Overlay menu mobile ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-1 bg-bg/95 px-10 backdrop-blur-lg md:hidden"
                    >
                        {navLinks.map((link, i) => {
                            const isActive = active === link.href.slice(1);
                            const Icon = link.icon;
                            return (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(link.href);
                                    }}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                                    className="flex items-center gap-4 py-2.5"
                                >
                                    <span
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border ${isActive ? "border-accent/40 bg-accent/10 text-accent" : "border-line text-muted"
                                            }`}
                                    >
                                        <Icon size={15} strokeWidth={2} />
                                    </span>
                                    <span
                                        className={`font-display text-2xl font-semibold ${isActive ? "text-accent" : "text-primary"
                                            }`}
                                    >
                                        {link.label}
                                    </span>
                                </motion.a>
                            );
                        })}

                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#contact");
                            }}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * navLinks.length, duration: 0.35 }}
                            className="mt-6 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-bg"
                        >
                            Hubungi Saya
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ── Tombol ganti tema, ikonnya swap animasi pas diklik ── */
function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Ganti mode tampilan"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line text-primary transition-colors hover:border-accent hover:text-accent"
        >
            <AnimatePresence mode="wait" initial={false}>
                {mounted && (
                    <motion.span
                        key={isDark ? "moon" : "sun"}
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center justify-center"
                    >
                        {isDark ? <Moon size={15} /> : <Sun size={15} />}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}