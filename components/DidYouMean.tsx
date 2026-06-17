import type { Guest } from "@/lib/types";

export default function DidYouMean({
  guests,
  onSelect,
  onReset,
}: {
  guests: Guest[];
  onSelect: (guest: Guest) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 text-center">
      <p className="text-sm text-ink/70">
        We found a few close matches — did you mean:
      </p>
      <ul className="flex flex-col gap-2">
        {guests.map((guest) => (
          <li key={guest.full_name}>
            <button
              type="button"
              onClick={() => onSelect(guest)}
              className="w-full rounded-xl border border-gold/30 bg-white px-4 py-3.5 text-left font-display text-lg text-ink transition hover:border-gold hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            >
              {guest.full_name}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onReset}
        className="text-sm text-gold-deep underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        None of these — search again
      </button>
    </div>
  );
}
