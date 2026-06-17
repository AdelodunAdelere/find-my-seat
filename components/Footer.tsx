import { EVENT } from "@/lib/event";

export default function Footer() {
  return (
    <footer className="bg-royal px-6 py-16 text-center text-ivory">
      <div className="mx-auto flex max-w-md flex-col items-center gap-5">
        <span className="font-display text-2xl italic text-gold">
          F &amp; B
        </span>
        <div aria-hidden className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/30" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
          <span className="h-px w-10 bg-gold/30" />
        </div>
        <p className="text-sm text-ivory/75">
          {EVENT.date} · {EVENT.venue}
        </p>
        <p className="text-sm text-ivory/55">{EVENT.contactLine}</p>
        <p className="mt-4 text-xs tracking-[0.2em] text-ivory/35 uppercase">
          With love, the family
        </p>
      </div>
    </footer>
  );
}
