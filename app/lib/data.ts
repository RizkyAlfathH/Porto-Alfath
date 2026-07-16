// Semua data portfolio kamu taruh di sini.
// Jadi kalau mau update project/skill baru, cukup edit file ini,
// gak perlu bongkar komponen.

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[]; // tech stack yang dipakai
//   image: string; // path di /public/images/
  link?: string; // live demo
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "contoh-project-1",
    title: "Nama Project Kamu",
    description:
      "Deskripsi singkat 1-2 kalimat tentang project ini, masalah apa yang diselesaikan, dan hasilnya apa.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    // image: "/images/project-1.png",
    link: "https://project-demo.vercel.app",
    github: "https://github.com/username/repo",
    featured: true,
  },
  {
    slug: "contoh-project-2",
    title: "Project Kedua",
    description: "Ganti dengan project kamu yang lain, misal tugas sekolah/PKL yang paling bagus.",
    tags: ["React", "Firebase"],
    // image: "/images/project-2.png",
    github: "https://github.com/username/repo-2",
  },
];

export type Skill = {
  name: string;
  level: number; // 0-100, buat progress bar (opsional)
  category: "frontend" | "backend" | "tools";
};

export const skills: Skill[] = [
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "JavaScript", level: 80, category: "frontend" },
  { name: "React", level: 75, category: "frontend" },
  { name: "Next.js", level: 70, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "frontend" },
  { name: "Node.js", level: 60, category: "backend" },
  { name: "Git & GitHub", level: 80, category: "tools" },
  { name: "Figma", level: 65, category: "tools" },
];

export type Experience = {
  role: string;
  organization: string;
  period: string; // contoh: "Jul 2025 — Sep 2025"
  description: string;
  type: "pkl" | "organisasi" | "lomba" | "lainnya";
};

export const experiences: Experience[] = [
  {
    role: "Praktik Kerja Lapangan (PKL) — Web Developer",
    organization: "Nama Perusahaan/Instansi",
    period: "Jul 2025 — Des 2025",
    description:
      "Ceritain apa yang kamu kerjain, misal: membantu membangun landing page company profile menggunakan React & Tailwind CSS.",
    type: "pkl",
  },
  {
    role: "Siswa Jurusan Rekayasa Perangkat Lunak (RPL)",
    organization: "Nama SMK Kamu",
    period: "2023 — 2026",
    description:
      "Fokus belajar pemrograman web, basis data, dan pengembangan perangkat lunak.",
    type: "lainnya",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Nama Guru/Pembimbing PKL",
    role: "Pembimbing PKL, Nama Perusahaan",
    quote:
      "Tulis testimoni singkat dari guru, pembimbing PKL, atau teman kerja tim tentang etos kerja kamu.",
    avatar: "/images/avatar-1.png",
  },
];

// Info kontak & sosial media, dipakai di Hero & Contact section
export const profile = {
  name: "Rizky Alfath",
  role: "Frontend Developer",
  tagline: "Fresh graduate SMK RPL yang suka bikin interface yang rapi dan interaktif.",
  email: "emailkamu@gmail.com",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  resume: "/resume.pdf",
};