import type { Guest } from "@/lib/types";

export default function ResultCard({
  guest,
  onReset,
}: {
  guest: Guest;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-[11px] tracking-[0.3em] text-gold-deep uppercase">
        Your seat
      </p>
      <p className="font-display text-2xl text-royal">{guest.full_name}</p>
      <span aria-hidden className="h-px w-12 bg-gold/40" />
      {guest.assigned_table != null ? (
        <p className="font-display text-6xl text-royal sm:text-7xl">
          Table {guest.assigned_table}
        </p>
      ) : (
        <p className="max-w-xs text-ink/70">
          Your table is being finalized — please check with the host.
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-sm text-gold-deep underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        Look up another name
      </button>
    </div>
  );
}
