import { profile } from "@/app/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-8 md:px-16 lg:px-24">
      <div className="flex flex-col items-center justify-between gap-4 font-mono text-xs text-muted md:flex-row">
        <p>
          © {year} {profile.name}. Dibangun pakai Next.js & Tailwind CSS.
        </p>
        <p>
          <a href="#hero" className="transition-colors hover:text-accent">
            ↑ kembali ke atas
          </a>
        </p>
      </div>
    </footer>
  );
}