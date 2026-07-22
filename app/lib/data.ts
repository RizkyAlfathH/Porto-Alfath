// Semua data portfolio kamu taruh di sini.
// Jadi kalau mau update project/skill baru, cukup edit file ini,
// gak perlu bongkar komponen.

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];       // dipakai sebagai "Technologies Used"
  features?: string[];  // dipakai buat panel "Key Features"
  image: string;         // path di /public/images/projects/ — kalau belum ada, biarin aja kosong dulu
  link?: string;         // live demo
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "Portofolio",
    title: "Portofolio Rizky Alfath",
    description:
      "Website portofolio pribadi yang dibangun menggunakan Next.js dan TypeScript untuk menampilkan proyek, pengalaman, keterampilan, dan informasi kontak dengan desain modern, responsif, serta interaktif.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Website full animasi",
      "Desain modern dan elegan",
      "Fully responsive di semua device",
    ],
    image: "/assets/images/project/porto-alfath.webp",
    link: undefined,
    github: undefined,
  },
  {
    slug: "Koperasi-Sekolah",
    title: "Sistem Koperasi Sekolah",
    description:
      "Sistem koperasi simpan pinjam berbasis web dan mobile yang terdiri dari dashboard admin menggunakan Django, REST API, dan aplikasi Flutter untuk anggota koperasi. Mendukung pengelolaan anggota, transaksi simpan pinjam, riwayat transaksi, serta sinkronisasi data antara aplikasi web dan mobile.",
    tags: ["Flutter", "Django", "REST API", "MySQL", "Bootstrap"],
    features: [
      "Dashboard admin berbasis Django",
      "Aplikasi mobile untuk anggota (Flutter)",
      "Sinkronisasi data real-time via REST API",
      "Riwayat transaksi simpan pinjam lengkap",
    ],
    image: "/assets/images/project/koperasi.webp",
    github: undefined,
  },
  // {
  //   slug: "perpustakaan-sekolah",
  //   title: "Aplikasi Perpustakaan Sekolah",
  //   description: "Proyek ini adalah aplikasi perpustakaan sekolah yang memungkinkan siswa untuk menjelajahi koleksi buku, meminjam buku, dan mengelola data peminjaman.",
  //   tags: ["Laravel", "Bootstrap", "MySQL"],
  //   features: ["Katalog buku digital", "Manajemen peminjaman", "Notifikasi jatuh tempo"],
  //   image: "/images/project-3.png",
  //   link: undefined,
  //   github: undefined,
  // },
  // {
  //   slug: "Pengaduan-Masyarakat",
  //   title: "Aplikasi Pengaduan Masyarakat",
  //   description:
  //     "Proyek ini adalah aplikasi untuk mengelola pengaduan masyarakat, memungkinkan warga untuk melaporkan masalah dan admin untuk meresponsnya.",
  //   tags: ["Laravel", "Bootstrap", "MySQL"],
  //   features: [
  //     "Form pengaduan untuk warga",
  //     "Dashboard admin untuk respons pengaduan",
  //     "Status tracking pengaduan",
  //   ],
  //   image: "/images/project-4.png",
  //   link: undefined,
  //   github: undefined,
  // },
];

export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  date: string; // contoh: "Agustus 2025"
  description: string;
  // image: string; // path di /public/images/certificates/ — belum dipasang, preview-nya dikosongin dulu
  credentialUrl?: string; // link ke sertifikat asli/verifikasi, kalau ada
};

export const certificates: Certificate[] = [
  {
    slug: "bnsp-junior-coder",
    title: "Junior Coder",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "April 2026",
    description:
      "National competency certification in Software Development under the Junior Coder occupational certification scheme, validating competencies based on the Indonesian National Work Competency Standards (SKKNI).",
    // image: "/images/certificates/bnsp-junior-coder.webp",
    credentialUrl: undefined,
  },

  {
    slug: "software-development-competency-test",
    title: "Software Development Competency Test",
    issuer: "PT ForIT Asta Solusindo",
    date: "April 2026",
    description:
      "Successfully passed the Software Development competency examination as part of the vocational competency assessment program.",
    // image: "/images/certificates/software-development-competency-test.webp",
    credentialUrl: undefined,
  },

  {
    slug: "telkom-iot-engineer",
    title: "Internet of Things (IoT) Engineer",
    issuer: "PT Telkom Indonesia & PT Telkom Prima Cipta Certifia",
    date: "November 2024",
    description:
      "Completed intensive training in Internet of Things (IoT), covering IoT fundamentals, connected devices, sensors, and real-world IoT implementation.",
    // image: "/images/certificates/telkom-iot.webp",
    credentialUrl: undefined,
  },

  {
    slug: "virtual-reality-starter",
    title: "Virtual Reality Starter",
    issuer: "Educourse.id",
    date: "December 2024",
    description:
      "Completed introductory training on Virtual Reality (VR), including basic concepts, immersive technologies, and VR development fundamentals.",
    // image: "/images/certificates/virtual-reality.webp",
    credentialUrl: undefined,
  },

  {
    slug: "certificate-of-appreciation",
    title: "Certificate of Appreciation",
    issuer: "PT Khatulistiwa Nusantara Indonesia",
    date: "February 2026",
    description:
      "Awarded in recognition of contributions during the internship program at PT Khatulistiwa Nusantara Indonesia.",
    // image: "/images/certificates/certificate-of-appreciation.webp",
    credentialUrl: undefined,
  },
];

export type Skill = {
  name: string;
  category: "frontend" | "backend" | "mobile" | "tools";
};

export const skills: Skill[] = [
  // Frontend
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },

  // Backend
  { name: "Django", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "PHP", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "REST API", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Firebase", category: "backend" },

  // Mobile
  { name: "Flutter", category: "mobile" },
  { name: "Dart", category: "mobile" },

  // Tools
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Postman", category: "tools" },
];

export type Experience = {
  role: string;
  organization: string;
  period: string;
  description: string;
  type: "pkl" | "organisasi" | "lomba" | "sekolah" | "bootcamp" | "lainnya";
  image?: string; // contoh: "/experience/pkl-1.jpg"
};

export const experiences: Experience[] = [
  {
    role: "Praktik Kerja Lapangan (PKL) — Web Developer",
    organization: "PT Khatulistiwa Nusantara Indonesia",
    period: "Okt 2025 — Jan 2026",
    description:
      "Berkontribusi dalam pengembangan sistem ERP pada modul Human Resource menggunakan Django, PostgreSQL, dan Bootstrap. Mengembangkan fitur Payroll mulai dari perancangan antarmuka pengguna, implementasi logika backend untuk perhitungan gaji, pembuatan function dan stored procedure di PostgreSQL, hingga fitur generate slip gaji karyawan dalam format PDF secara otomatis.",
    type: "pkl",
    image: "/assets/images/experience/PKL.webp",
  },
  {
    role: "IoT Engineer Bootcamp",
    organization: "PT Telkom Indonesia & PT Telkom Prima Cipta Certifia",
    period: "Nov 2024",
    description:
      "Mengikuti pelatihan intensif Internet of Things (IoT), mulai dari konsep dasar sensor dan mikrokontroler hingga implementasi nyata. Berhasil membangun sistem monitoring suhu ruangan server sekolah secara real-time menggunakan sensor suhu yang terhubung ke dashboard.",
    type: "bootcamp",
    image: "/assets/images/experience/Iot.webp",
  },
  {
    role: "Siswa Jurusan Rekayasa Perangkat Lunak (RPL)",
    organization: "SMK Negeri 11 Bandung",
    period: "2023 — 2026",
    description:
      "Fokus belajar pemrograman web, basis data, dan pengembangan perangkat lunak.",
    type: "sekolah",
    image: "/assets/images/experience/Sekolah.webp",
  },
];

// Info kontak & sosial media, dipakai di Hero & Contact section
export const profile = {
  name: "Rizky Alfath",
  role: "Frontend Developer",
  tagline: "Fresh graduate SMK RPL yang suka bikin interface yang rapi dan interaktif.",
  email: "rizkyalfath80@gmail.com",
  github: "https://github.com/RizkyAlfathH",
  linkedin: "https://www.linkedin.com/in/rizky-alfath-humaedi-6b6944331?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://instagram.com/USERNAME_KAMU", // ganti sesuai akun asli
  tiktok: "https://tiktok.com/@USERNAME_KAMU", // ganti sesuai akun asli
  resume: "/test.pdf", // kalau ada resume PDF, taruh linknya di sini
};