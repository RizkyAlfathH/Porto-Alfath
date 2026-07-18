"use client";

/**
 * BrowserMockup — ilustrasi jendela browser animasi buat pengganti
 * thumbnail project yang belum ada screenshot-nya. Didesain sebagai
 * satu window tunggal yang ngisi penuh h-full w-full parent-nya
 * (bukan box kecil fixed-width yang di-center di tengah container
 * gede), jadi proporsinya tetep pas di card lebar (span-8) maupun
 * sempit (span-3/4).
 */
export default function BrowserMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-line bg-bg p-3 md:p-4">
      {/* Chrome bar ala browser beneran */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-line pb-2.5">
        <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
        <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
        <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
        <span className="ml-2 h-2 w-24 rounded-full bg-line" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 pt-3 md:gap-4 md:pt-4">
        {/* Tab bar warna-warni, berdenyut bergantian */}
        <div className="flex shrink-0 gap-2">
          <span
            className="h-6 flex-1 animate-pulse rounded-md bg-accent"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="h-6 flex-1 animate-pulse rounded-md bg-warm"
            style={{ animationDelay: "0.4s" }}
          />
          <span
            className="h-6 flex-1 animate-pulse rounded-md bg-[#5FD9A4]"
            style={{ animationDelay: "0.8s" }}
          />
        </div>

        <div className="flex min-h-0 flex-1 gap-4">
          {/* Sidebar dekoratif — disembunyiin di card sempit biar gak sesak */}
          <div className="hidden shrink-0 flex-col gap-2 sm:flex">
            <span className="h-8 w-8 rounded-md bg-line" />
            <span className="h-2.5 w-8 rounded-full bg-line" />
            <span className="h-2.5 w-8 rounded-full bg-line" />
            <span className="h-2.5 w-8 rounded-full bg-line" />
          </div>

          {/* Mini bar chart — flex-1 biar ngisi sisa ruang, mau card lebar atau sempit */}
          <div className="flex flex-1 items-end gap-1.5">
            {[45, 75, 50, 95, 65, 80, 60].map((h, i) => (
              <span
                key={i}
                className="animate-chart-grow origin-bottom flex-1 rounded-t-sm bg-gradient-to-t from-accent to-warm"
                style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cursor melayang pelan */}
      <div className="relative mt-2 h-4 shrink-0">
        <svg
          className="animate-cursor-float absolute"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M2 2L8 14L9.5 9.5L14 8L2 2Z" fill="var(--color-primary)" />
        </svg>
      </div>
    </div>
  );
}