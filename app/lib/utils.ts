import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Gabungin className dengan aman.
 * clsx = biar bisa nulis className kondisional (misal: isActive && "text-accent")
 * twMerge = biar kalau ada class Tailwind yang bentrok (misal "p-2 p-4"),
 *           yang dipakai cuma yang terakhir, ga dobel dua-duanya
 *
 * Dipakai hampir di semua komponen UI (Button, Card, Badge, dll)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format tanggal ke format Indonesia, misal buat tanggal di blog/case study
 * Contoh: formatDate("2025-07-16") -> "16 Juli 2025"
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Scroll halus ke section tertentu pas klik menu navigasi
 * Contoh: onClick={() => scrollToSection("projects")}
 */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}